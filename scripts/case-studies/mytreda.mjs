import {
  SITE,
  p,
  h3,
  bullets,
  stackItem,
  decision,
  outcome,
} from '../lib/portable-text.mjs'

export default {
  docId: 'project-mytreda',
  title: 'MyTreda',
  role: 'Solo — product, design, frontend, API, infrastructure, and support',
  status: 'Live, in active use by paying customers',

  overview: [
    p(
      'MyTreda is inventory and sales software for Nigerian traders — small business owners who track stock, record sales, and chase debts, mostly from a phone, often on a connection that comes and goes.',
    ),
    p(
      'I build and run all of it: the Next.js frontend, the NestJS REST API, the MongoDB schema, the authentication system, the WhatsApp notification pipeline, and the infrastructure underneath. Design, product decisions, deploys, and the support inbox are all mine too.',
    ),
    p(
      'It is not a portfolio piece I shipped once and walked away from. It has paying customers and an on-call rotation of one, and most of what I have learned from it arrived after launch — from bugs that only existed in production.',
    ),
  ],

  problem: [
    p(
      'A trader running a shop with a few hundred SKUs keeps stock counts in a notebook, records sales when there is time, and remembers debt rather than tracking it. The failure mode is not dramatic. It is a slow leak: stock that ran out three days before anyone noticed, a customer who genuinely does not remember owing you, a month that felt busy but did not make money.',
    ),
    p('Software for this exists. Most of it assumes conditions that do not hold here:'),
    ...bullets([
      'A desktop. In practice the phone is the only computer in the building.',
      'A stable connection. Data is metered and coverage is uneven, so anything that only works online works sometimes.',
      'That the user will open the app. Traders are busy. If the software needs you to remember to check it, it tells you nothing.',
      'A pricing model built for a currency that is not the naira.',
    ]),
    p(
      'So the constraints were set before the first line of code: phone-first, useful when the connection is not, and able to reach the user where they already are rather than waiting to be opened. That last constraint is why daily reports and low-stock alerts go out over WhatsApp, and why the app is a PWA with a real offline path rather than a website that happens to be responsive.',
    ),
  ],

  stack: [
    stackItem(
      'frontend',
      'Next.js (App Router)',
      'One deployment serves four hosts — a marketing site, the tenant portal, and an admin panel — and nearly every route is static or ISR. Almost nothing renders on demand, which keeps both latency and the hosting bill low.',
    ),
    stackItem(
      'frontend',
      'TypeScript',
      'Shared types across the frontend and the API are the main reason a solo developer can change a data shape without breaking three screens silently.',
    ),
    stackItem(
      'frontend',
      'React Hook Form',
      'Uncontrolled inputs, no re-render per keystroke — the right default on low-end Android hardware. The tradeoff is real: it tracks values through native input events, so a browser autofill that writes straight into the DOM desyncs it, which cost me a mobile login bug.',
    ),
    stackItem(
      'frontend',
      'PWA / service worker',
      'Installs to the home screen and keeps working through a dropped connection. For the actual users, an app that only works online is an app that works sometimes.',
    ),
    stackItem(
      'backend',
      'NestJS',
      'Opinionated module and dependency-injection structure. When the whole team is one person, a framework that decides where things go removes a category of decision I would otherwise relitigate every few weeks.',
    ),
    stackItem(
      'backend',
      'REST (versioned, /api/v1)',
      'A handful of clients I control and no nested-graph fetching problem to solve. GraphQL would have been complexity bought against a problem I do not have.',
    ),
    stackItem(
      'backend',
      'WhatsApp Business API',
      'Scheduled jobs push daily sales summaries and low-stock alerts. Email would be ignored and push notifications get disabled; WhatsApp is where these users already are.',
    ),
    stackItem(
      'data',
      'MongoDB',
      'The product schema moved constantly in the first months — traders sell things that refuse to sit in a fixed column set — and schemaless was the right call for that phase. A sale with its line items is still a genuine document aggregate, and stock mutations run inside a transaction with the inventory ledger. What I would want from Postgres today is tenant scoping enforced once at the row level rather than in every query.',
    ),
    stackItem(
      'infra',
      'Vercel',
      'Hosts the frontend. Static-by-default output means the CDN answers most requests without invoking anything — which also made it obvious, once I looked, that my own middleware was the only thing spending CPU.',
    ),
    stackItem(
      'infra',
      'Railway',
      'Hosts the NestJS API. Cheap and quick to deploy, with the caveat that its service settings live outside the repo — a port defined in two places is a port that will eventually disagree with itself.',
    ),
    stackItem(
      'infra',
      'Cloudflare',
      'DNS, and the CNAME that puts the API on api.mytreda.com. Moving the API under the same registrable domain as the app is what made cross-site cookie blocking stop being my problem.',
    ),
  ],

  decisions: [
    decision('Access token in memory, refresh token in an httpOnly cookie', [
      p(
        'The access token never touches localStorage; it lives in memory only. The refresh token sits in an httpOnly cookie that JavaScript cannot read. On boot there is never an access token in memory — memory does not survive a reload — so the client silently calls `POST /auth/refresh` and the browser attaches the cookie itself.',
      ),
      p(
        'The property I wanted: an XSS payload that can read localStorage gets nothing worth having. The cost I accepted: every page load depends on a network round trip succeeding before the app can decide whether you are logged in.',
      ),
      p(
        'That cost turned out to be larger than I priced it, because it moves the entire session model onto whether a cookie survives — and cookie survival is a browser policy question, not a code question. It is the reason the next decision exists.',
      ),
    ]),
    decision('Move the API to a subdomain rather than patch the cookie', [
      p(
        'The frontend was on `mytreda.com` and the API on a Railway-issued domain. Those are two different registrable domains, so as far as the browser is concerned the refresh cookie was a third-party cookie. Desktop Chrome mostly allowed it. Mobile Safari — and therefore every browser on iOS — blocks it by default under Intelligent Tracking Prevention.',
      ),
      p(
        '`SameSite=None; Secure` was already set correctly, which is the advice everyone gives, and it does not help: ITP is blocking the cookie because the request is cross-site at all, not because of the attribute.',
      ),
      p('That left three options:'),
      ...bullets([
        'Keep patching cookie attributes — does not work, the attribute is not what is being enforced.',
        'Move the token to localStorage — works everywhere, and gives up the exact XSS property the auth model was built around.',
        'Stop being cross-site.',
      ]),
      p(
        'I took the third. A Cloudflare CNAME to Railway, a custom domain on the Railway service, and one environment variable on Vercel put the API at `api.mytreda.com`. Every request between app and API became same-site, and ITP stopped applying. Not one line of cookie code changed.',
      ),
      p(
        'The lesson I keep: when a platform policy is the thing blocking you, the fix is usually to stop meeting its trigger condition, not to argue with it in configuration.',
      ),
    ]),
    decision('Delete the middleware and express host routing as config', [
      p(
        'The subdomain split — marketing, tenant portal, admin — was implemented as Next.js middleware doing host-based routing. Its matcher excluded a few static paths and matched essentially everything else: every page view, every RSC payload, every prefetch, every bot crawl.',
      ),
      p(
        'Because it ran in the Node runtime, that meant booting a function on every single request in order to serve a file already sitting on the CDN, at roughly 68ms of CPU each time — most of it cold-start module initialisation rather than the hostname check it actually existed to do. It was close to the entire CPU bill for the project.',
      ),
      p(
        'Everything that middleware did was static host-to-path mapping, and static mapping is exactly what `next.config.ts` rewrites express. Rewrites compile into the routes manifest and are handled by the platform routing layer at no per-request cost. 148 lines deleted, and with them almost all of the CPU.',
      ),
      p(
        'Rewrites are not a free swap, though, and three assumptions cost me real bugs: rules are not first-match, so overlapping rules must be made mutually exclusive rather than reordered; destinations get matched again, so whatever a host rewrites into has to be unprefixable on that host; and a `:path*` wildcard matches zero segments, which silently turns a specific route into a redirect to an empty location. Never let a wildcard match zero segments — write the bare path and `:path+` as separate rules.',
      ),
    ]),
  ],

  challenges: [
    p(
      'Three production bugs taught me more than the build did. All three shared a shape: the symptom pointed confidently at the wrong layer.',
    ),

    h3('A CORS error that had nothing to do with CORS'),
    p(
      'Users could not log in. The console reported a textbook CORS failure — no `Access-Control-Allow-Origin` header on the preflight. The CORS config was correct and had been for months.',
    ),
    p(
      'The browser only reports what the browser saw. Edge logs showed the request never reached application code at all: `502`, connection refused, three times. A process that is not reachable returns no headers, and a missing header is the only category Chrome has for that.',
    ),
    p(
      'I then spent real time on two theories that fit beautifully and were both wrong. A newly required environment variable looked like a classic boot crash — except the deploy logs showed the app starting cleanly with every route mapped. An out-of-memory kill fit the timeline almost too well, with a container restarting twice around a burst of scheduled jobs and memory spiking to ~280MB — except the configured limit was 8GB, so nothing was close to being killed.',
    ),
    p(
      'The actual cause: Railway was forwarding traffic to port 3000 and the app was listening on 3001. A commit labelled "security improvements" had bumped two port defaults with no explanation and no matching infrastructure change. Nothing was listening where traffic was arriving, so every request was refused — and the failing healthcheck is what produced the restart pattern that looked like an OOM story.',
    ),
    p(
      `Full write-up: [The CORS Error That Wasn't a CORS Error](${SITE}/blog/railway-port-mismatch-cors-red-herring).`,
    ),

    h3('One support ticket, two unrelated mobile bugs'),
    p(
      'A trader wrote in: refreshing logs her out, and when she logs back in the form says email and password are required even though she can see them filled in.',
    ),
    p(
      "That reads like one flaky mobile problem. It was two independent bugs that happened to both depend on being on a phone. The first was the cross-site cookie block described above. The second was subtler: mobile autofill writes directly into the DOM `value` property without dispatching a trusted `input` event, so React Hook Form — which tracks values through those events — still believed the fields were empty. Validation ran against React's model rather than the pixels on screen. The user's own description, \"delete and add one letter and it works,\" was the entire bug in a sentence: one real keystroke fires one real event and the state resynchronises.",
    ),
    p(
      'The fix is small and slightly gross, and it is the standard one: give `input:-webkit-autofill` a no-op CSS animation, listen for `animationstart`, read the real DOM value and push it into the form state. No rewrite to controlled inputs, no extra library — just a hook into a browser behaviour that exposes no other JavaScript-visible signal.',
    ),
    p(
      `Full write-up: [The Bug Report Said "Refresh Logs Me Out." It Was Actually Two Bugs](${SITE}/blog/refresh-logs-me-out-two-mobile-auth-bugs).`,
    ),

    h3('A download that had been broken for six days'),
    p(
      'While auditing which paths the middleware matcher excluded, I probed production directly and found that the CSV template for bulk product import returned 404 on the app subdomain and 200 on the marketing one. It had shipped six days earlier. Not one user had been able to download it.',
    ),
    p(
      'The reason nobody caught it, me included, is the part worth keeping. Local development runs on `localhost` with no subdomain, so the host rewrite never applies, so the download works perfectly every time you test it. My local environment was structurally incapable of reproducing an entire class of bug, and I had been treating "works locally" as evidence. The same gap had also been quietly 404ing the PWA offline fallback and `robots.txt`.',
    ),
    p(
      'So I stopped fixing and wrote the checklist first: a script that drives a running server with explicit `Host` headers across all four hosts and asserts status codes and `Location` headers. It failed six cases on its first run, three of them in code I would have sworn was correct. Then I found that a production build and the deployed routing layer disagree too — a zero-segment wildcard interpolates a trailing slash on one and not the other — so the last checks run against a real subdomain pointed at the branch.',
    ),
    p(
      `Full write-up: [How a Vercel CPU warning uncovered four routing bugs](${SITE}/blog/vercel-cpu-warning-uncovered-four-routing-bugs-nextjs).`,
    ),
  ],

  outcomes: [
    outcome('80+', 'Registered businesses'),
    outcome('1,400+', 'Products tracked'),
    outcome('460+', 'Sales recorded'),
    outcome('3,000+', 'Activity log entries'),
  ],

  results: [
    p(
      'MyTreda is live and in daily use, with real businesses depending on it to know what is in stock and who owes them money.',
    ),
    ...bullets([
      '**Authentication is reliable on iOS.** Moving the API same-site fixed silent refresh on every WebKit browser without touching the auth code, and closed a sibling bug where invited team members were being logged out on first refresh on any device.',
      '**The routing layer stopped costing anything.** 148 lines of middleware deleted, and with them a function invocation on every request for pages already sitting on the CDN.',
      '**Routing is now tested where it actually runs.** 26 unit checks on the exclusion patterns, 44 against a production build across all four hosts, and 31 against a real deployment on the two subdomains that serve users.',
      '**Three silent production bugs found and closed** — a six-day-old broken import template, a 404ing offline fallback, and missing crawl rules — none of which had generated a single support ticket.',
    ]),
    p(
      'The pattern in all of it: the bugs that reach users are rarely the loud ones. A 404 gets reported. An extra redirect hop that still lands the customer on the right page never does.',
    ),
  ],

  retrospective: [
    ...bullets([
      '**Postgres — for tenancy, not for transactions.** Schemaless earned its place while the product shape was moving daily. It has stopped moving, and the thing that matters most now is keeping 80 businesses apart: a scoping filter I apply through a helper in some services and hand-write in the rest, where a relational database enforces it once at the row level. Stock safety I already have — sales and the inventory ledger commit in one transaction, and the quantity floor is a schema validator every write path goes through. The activity log stays a document store either way.',
      '**Same-site from day one.** Putting the API on `api.mytreda.com` at the start would have prevented the entire class of cookie bug, and cost one DNS record. I reached for it as a fix when it should have been the default.',
      '**Write the checklist before the fix.** Mine caught six bugs on its first run. Had it existed before the routing work, it would have caught the broken import template on the day it shipped instead of six days later.',
      '**Treat "works locally" as a claim about the environment, not the code.** If local cannot reproduce the condition — no subdomain, no TLS, no cold start — it cannot clear it either. A real preview host per branch belongs in the setup, not in the postmortem.',
      '**Keep unrelated changes out of cleanup commits.** The port bump that took login down rode along inside a commit labelled "security improvements," which is exactly why it got no scrutiny in review.',
    ]),
    p(
      'And one that is about me rather than the code: I spent a full day on the routing work because a usage warning frightened me, and only afterwards worked out that the threshold was a rolling window I was already sitting comfortably under. The cleanup was worth doing — it deleted 148 lines and four real bugs. The panic was not. Those are separate things, and it took me most of the day to tell them apart.',
    ),
  ],

  seo: {
    metaTitle: 'MyTreda — Case Study',
    metaDescription:
      'Building and running inventory software for Nigerian traders: the auth model, the cross-site cookie bug that only existed on iOS, and deleting 148 lines of middleware.',
  },
}
