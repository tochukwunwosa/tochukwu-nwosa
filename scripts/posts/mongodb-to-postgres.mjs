import { p, h2, h3, quote, bullets, numbered, table, code } from '../lib/portable-text.mjs'

export default {
  slug: 'moving-mytreda-from-mongodb-to-postgres',
  title: 'Moving MyTreda from MongoDB to Postgres without losing a kobo',
  publishedAt: '2026-10-04T12:00:00.000Z',
  excerpt:
    'How I moved a live, offline-first sales app from MongoDB to Postgres in eight days: row-level security, kept ObjectIds, an all-or-nothing load, ~35 minutes of downtime, zero lost sales, and queries that went from ~187 ms to ~1 ms.',
  tags: ['PostgreSQL', 'MongoDB', 'Prisma', 'NestJS', 'Database Migration', 'Railway'],
  estimatedReadTime: 11,
  cover: {
    file: 'covers/mongodb-to-postgres.png',
    alt: 'MongoDB to Postgres: median query time from the production API fell from 187 ms on Atlas to 1 ms on Postgres',
  },
  seo: {
    metaTitle: 'Moving a live app from MongoDB to Postgres',
    metaDescription:
      '36 tables, 42k records, ₦255M in sales moved with every kobo matched. Row-level security, an all-or-nothing load, and 187 ms → 1 ms queries.',
  },

  body: [
    p(
      'On Saturday night, 3 October 2026, I moved MyTreda’s production database from MongoDB to Postgres. Eight days from decision to cutover. All 36 tables arrived with identical row counts, every money total matched to the kobo, and no sale was lost during about 35 minutes of downtime.',
    ),
    p(
      'MyTreda is an offline-first sales and stock app for Nigerian traders: a NestJS API on Railway, a Next.js web app, and a phone client that keeps selling when the network drops and syncs later. This is how the move was planned, what happened on the night, and what it bought.',
    ),
    quote(
      'TL;DR: 42k records and ₦255M in sales moved with zero mismatches. Queries from the production API went from ~187 ms to ~1 ms. Postgres is 2–3x faster as an engine on this data; the rest came from moving the database next to the API.',
    ),

    h2('Why move at all'),
    p(
      'The data is small, but it is money: 240 users, 214 businesses, 4,259 products, 3,903 sales worth ₦255 million, and 376 debts. I decided to move on 26 September for three reasons:',
    ),
    bullets([
      '**The data is relational.** Sales have items and payments, debts have payments, products have variants and stock movements. In MongoDB those links were kept by convention. In Postgres they are foreign keys the database enforces.',
      '**Tenant isolation belongs in the database.** Every query has to stay inside one business. Postgres row-level security makes that a rule the database checks, not a filter each developer must remember.',
      '**Now is the cheapest time.** At 42,000 documents a migration takes one evening. At ten times the size, it takes a project.',
    ]),
    p('Cost was not a reason. It is roughly a tie, since the old Atlas cluster was on the free tier.'),

    h2('The decisions that shaped everything'),
    p(
      'The whole move took eight days because the big decisions were made on day one, and every phase after that had to end with a green test suite.',
    ),
    table([
      ['Decision', 'What I chose', 'Why'],
      ['ORM', 'Prisma', 'Typed queries, migrations as plain SQL files'],
      [
        'Tenant isolation',
        'Row-level security with two roles',
        'mytreda_app sees one business per request; mytreda_system (BYPASSRLS) is only for crons and login, behind a separate, searchable SystemDb service',
      ],
      [
        'Primary keys',
        'Keep MongoDB’s 24-char ObjectIds as text keys',
        'Phones hold cached records and queued offline writes by ID',
      ],
      [
        'Money',
        'Whole kobo in double precision, with CHECK constraints',
        'numeric makes Prisma return Decimal objects; kobo integers stay exact',
      ],
      ['Code', 'Port on a long-lived postgres branch', 'main kept shipping on MongoDB until cutover night'],
      ['Cron locks', 'A job_locks table, not advisory locks', 'Advisory locks let a later container rerun a short job’s tick'],
    ]),

    h3('Row-level security: forget the filter, see nothing'),
    p(
      'The app connects as `mytreda_app`, a role that row-level security applies to. Each request sets the current business inside its transaction, and every tenant table carries a policy that compares against it. If a query forgets to scope itself, or the setting is missing, the comparison is NULL and the query returns nothing instead of everyone’s data.',
    ),
    p('A simplified version of the pattern:'),
    code(
      'sql',
      `
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON sales
  TO mytreda_app
  USING (business_id = current_setting('app.business_id', true))
  WITH CHECK (business_id = current_setting('app.business_id', true));
`,
      'rls.sql (simplified)',
    ),
    code(
      'typescript',
      `
// Every request-scoped query runs inside this. set_config(..., true) is
// transaction-local, so a pooled connection never leaks a tenant.
function forBusiness<T>(businessId: string, fn: (tx: Prisma.TransactionClient) => Promise<T>) {
  return prisma.$transaction(async (tx) => {
    await tx.$executeRaw\`SELECT set_config('app.business_id', \${businessId}, true)\`
    return fn(tx)
  })
}
`,
      'tenant-db.ts (simplified)',
    ),
    p(
      'The few jobs that genuinely need to see every business, like crons and login, use a second role, `mytreda_system`, with BYPASSRLS. It lives behind its own `SystemDb` service, so every cross-tenant query in the codebase is one search away.',
    ),

    h3('Keeping MongoDB’s IDs'),
    p(
      'This was the decision that made the move safe for phones. Offline devices hold cached records and queued sales that reference IDs. Fresh UUIDs would have broken every one of them, and forced every shop to resync. Keeping the 24-character ObjectIds as Postgres `text` primary keys meant the API changed underneath the phones and they never noticed.',
    ),

    h3('Money as whole kobo'),
    p(
      'Postgres `numeric` would be the textbook choice, but Prisma returns it as `Decimal` objects, which would have rippled through every calculation in the API. Instead, money stays as whole kobo in `double precision`, which represents integers exactly far beyond any sale total, with a CHECK constraint so a fractional kobo can never be stored.',
    ),
    code(
      'sql',
      `
ALTER TABLE sales
  ADD CONSTRAINT sales_total_whole_kobo CHECK (total_kobo = trunc(total_kobo));
`,
      'money.sql (simplified)',
    ),

    h2('Build the safety net first'),
    p('The work ran in phases, each in its own commits:'),
    numbered([
      '**P0 Backups.** Nightly encrypted (`age`) dumps to Cloudflare R2, and a restore drill from a real production backup.',
      '**P1 Schema and safety net.** The Prisma schema, the row-level security migration, and a test harness that gives each test file its own Postgres database, cloned from a template in milliseconds.',
      '**P2–P5 The port.** Grouped by transaction, not by module: identity, billing, stock and sales, then reports, exports and NDPR data requests. The suite grew to 72 suites and 981 tests, all against real Postgres.',
      '**P6 Rehearsals.** The copy script run on dev data, then on a restored production dump. Every count and money total matched.',
      '**P7 Cutover.** The runbook, on a quiet Saturday night.',
    ]),
    p(
      'The rehearsal on a restored production dump is what made the night boring: 3,903 sales, ₦255M in revenue and 376 debts, identical on both sides, days before production was touched.',
    ),

    h2('Cutover night'),
    p(
      'The API was offline for about 35 minutes, and no sale was lost. Because the app is offline-first, taking the API down was the write freeze: shops kept selling on their phones, and the queued sales replayed into Postgres once the new API came up. Times are WAT and approximate.',
    ),
    numbered([
      '**22:05 Go/no-go.** Found three blockers: a pending fix that moved cron locks off MongoDB, a copy script that by design refuses to touch production, and no Postgres on Railway yet.',
      '**22:30 Provision.** Created Railway Postgres 18, kept it off the public internet, and reached it through `railway connect --tunnel-only`. Applied the four migrations and gave the two app roles their logins.',
      '**22:55 Freeze.** Removed the API’s deployment. With no API, nothing could write to MongoDB.',
      '**23:00 Final backup.** A `mongodump` of production, restored into a throwaway local MongoDB: 41,955 documents.',
      '**23:10 Copy and verify.** The copy script ran into a fresh local Postgres, dry run first, then for real. Counts and money totals were checked against MongoDB independently.',
      '**23:25 Load.** A data-only dump went into Railway in one transaction that recounted every table and re-added every total, and would only commit if all of them matched. It committed.',
      '**23:30 Deploy.** Merged `postgres` into `main` and pushed. The first `/health` answered 200, from a `SELECT 1` on Postgres.',
      '**23:45 Smoke test on a real phone.** Sign-up, a sale, a void, a credit sale with a debt payment, a promo code from platform admin, an offline sale and its sync, and a real old account logging in.',
    ]),

    h3('The all-or-nothing load'),
    p(
      'The worst outcome of a migration is not failure. It is a half-loaded production database that looks fine. So the final load verified itself inside its own transaction and refused to commit on any mismatch. The shape of it:',
    ),
    code(
      'typescript',
      `
await db.query('BEGIN')
// Users and businesses reference each other, so no load order satisfies
// both foreign keys. Pause FK triggers for this transaction only; every
// link was already verified by the copy script and the local constraints.
await db.query("SET LOCAL session_replication_role = 'replica'")

await db.query(dataOnlyDump)

for (const check of expected) {
  const { rows } = await db.query(check.sql)
  if (rows[0].value !== check.value) {
    await db.query('ROLLBACK')
    throw new Error(\`\${check.name}: expected \${check.value}, got \${rows[0].value}\`)
  }
}

await db.query('COMMIT')
`,
      'load.ts (simplified)',
    ),

    h3('What went wrong on the night'),
    bullets([
      '**The database had no public URL.** Rather than expose it, I used Railway’s encrypted tunnel.',
      '**Docker could not reach the tunnel.** It listens on the laptop’s loopback, which containers cannot see. So the load ran from Node on the laptop instead, through a small loader with the commit-only-if-it-matches rule above.',
      '**Users and businesses point at each other** (a user belongs to a business; a business has an owner). A data-only restore cannot order them, hence the paused foreign-key triggers during the load.',
    ]),

    h2('Did every kobo arrive?'),
    p(
      'Yes. All 36 tables arrived with identical row counts, and every money total matched MongoDB to the kobo. The loader checked these inside its transaction on Railway, after an independent check on the laptop:',
    ),
    table([
      ['Check', 'MongoDB', 'Postgres'],
      ['Sales', '3,903 rows · revenue 25,534,664,694 kobo · profit 693,838,204 kobo · 59 voided', 'Identical'],
      ['Debts', '376 rows · total 7,045,631,300 kobo · paid 4,389,688,000 kobo', 'Identical'],
      ['Products', '4,259 rows · stock value 52,690,500,895 kobo', 'Identical; all 4,259 quantities matched row by row'],
      ['Expenses', '77 rows · 327,609,901 kobo', 'Identical'],
      ['Subscriptions', '20 active', 'All 20 matched on plan, status and period end'],
      ['Activity logs', '11,842 rows', 'Identical'],
    ]),

    h2('Query speed: ~187 ms to ~1 ms'),
    p(
      'Measured from inside the production API container on 4 October, the same queries now take about 1 ms instead of about 187 ms: 124 to 213 times faster. Both databases held the same production data, since Atlas was still running read-only after the cutover. Each query got 5 warm-ups, then 40 timed runs per database:',
    ),
    table([
      ['Query', 'MongoDB Atlas (median)', 'Railway Postgres (median)'],
      ['One sale by id', '186.3 ms', '1.0 ms'],
      ['50 newest sales at a location', '188.4 ms', '1.5 ms'],
      ['Revenue and profit for a business', '187.7 ms', '0.9 ms'],
      ['50 newest activity-log entries', '186.1 ms', '1.3 ms'],
    ]),
    p(
      'Those numbers need an honest reading. The MongoDB times barely move between a point read and an aggregate, which tells you where the time goes: about 185 ms is the round trip from the API to Atlas, over the internet and to another region. Postgres sits on Railway’s private network next to the API. Even the slow end stayed small: 95% of Postgres queries finished in 3 ms or less, against 192 ms on Atlas.',
    ),
    p(
      'To separate the engine from the network, I timed the same kinds of query on one laptop, with both databases loaded from the same production dump:',
    ),
    table([
      ['Query', 'Postgres vs MongoDB, same machine'],
      ['50 most recent sales for one business', '2.19x faster'],
      ['Revenue and profit total for a business', '2.61x faster'],
      ['Activity-log feed across 11,216 rows', '3.18x faster'],
    ]),
    p(
      'So Postgres is two to three times faster as an engine on this data, and moving the database next to the API removed the rest. A screen that runs five queries one after another used to spend nearly a second waiting on the database. Now it spends under 10 ms.',
    ),

    h2('What the move bought'),
    bullets([
      '**Isolation the database enforces.** A request that forgets to filter by business sees nothing, instead of seeing everyone.',
      '**Relationships the database enforces.** A sale item cannot point at a sale that does not exist.',
      '**One transaction for money.** Settling a payment and extending a subscription now commit together, under a row lock on the business.',
      '**MongoDB is out of the request path.** The API boots and runs its crons with no MongoDB connection at all, so the old cluster can be retired.',
    ]),

    h2('Bugs the move flushed out'),
    bullets([
      '**Two Prisma filter mistakes**, found only by the real-Postgres integration tests, never by the type checker: `{ field: null }` throws on a required column, and a JSON `not` filter takes the value directly.',
      '**Cron locks still on MongoDB**, found two days before cutover. A read-only MongoDB would have silently stopped every scheduled job.',
      '**A day-boundary bug in the WhatsApp daily report.** CI happened to run just after midnight Lagos time on the night after cutover and caught it. The report’s “today” was computed in the server’s timezone (UTC), so sales between midnight and 1 am never appeared in any report. It predates the migration, and it is now fixed.',
    ]),
    p('The shape of that fix: compute the day in Lagos, not on the server.'),
    code(
      'typescript',
      `
const WAT_OFFSET_MS = 60 * 60 * 1000 // Lagos is UTC+1, no daylight saving

export function lagosDayRange(now = new Date()) {
  const local = new Date(now.getTime() + WAT_OFFSET_MS)
  const start =
    Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()) - WAT_OFFSET_MS
  return { start: new Date(start), end: new Date(start + 24 * 60 * 60 * 1000) }
}
`,
      'lagos-day.ts (simplified)',
    ),

    h2('Lessons'),
    bullets([
      '**Rehearse on real data, then repeat it exactly.** The night’s copy followed the same route as the rehearsal, so the only new steps were the ones Railway forced.',
      '**Make the final load all-or-nothing.** One transaction that verifies itself and commits only on a full match removes the worst outcome: a half-loaded production database.',
      '**Offline-first pays for itself at cutover.** Taking the API down was the write freeze, and customers kept selling through it.',
      '**Integration tests against the real database catch what types cannot.** Both Prisma filter bugs passed the type checker.',
      '**Keep IDs stable across a database move** when clients cache them. Keeping ObjectIds as text keys meant no phone had to resync.',
      '**Watch what your tools print.** A tunnel command printed a full superuser connection string into my terminal. Treat anything like that as leaked, and rotate it.',
    ]),

    h2('What’s next'),
    bullets([
      'Nightly encrypted Postgres backups to R2, plus a restore drill, the same discipline as P0.',
      'Keep MongoDB read-only for two weeks, then retire it.',
      'Move off Railway to a VPS, planned for November to December 2026.',
    ]),
    p(
      'If you are planning a similar move and want to compare notes, I’m on [X](https://x.com/tochukwudev) and [LinkedIn](https://linkedin.com/in/nwosa-tochukwu).',
    ),
  ],
}
