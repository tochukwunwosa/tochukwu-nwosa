import { p, h3, bullets, stackItem, decision, outcome } from '../lib/portable-text.mjs'

export default {
  docId: 'project-tech-linkup',
  title: 'Tech LinkUp',
  role: 'Solo — product, frontend, database, and the ingestion pipeline',
  status: 'Live, ingesting daily',

  overview: [
    p(
      "Tech LinkUp is an event discovery platform for Nigeria's tech ecosystem — meetups, hackathons, workshops and conferences, filterable by state, category, date and distance from wherever you are.",
    ),
    p(
      'The listing UI is the least interesting part of it. The real work is upstream: a daily pipeline that goes out to Eventbrite, Luma, Meetup, GDG and Startup Grind chapters and Co-Creation Hub, finds event pages, extracts structured data from whatever markup each one happens to publish, scores how much it trusts what it extracted, checks whether it already has that event under a different name, and queues the result for a human to approve.',
    ),
    p(
      'Nothing scraped is ever published automatically. That constraint shaped most of the design.',
    ),
  ],

  problem: [
    p(
      'Finding out that a tech event is happening in Lagos next week generally requires already following the right person on Twitter. The events exist and are well organised. Discovery is the part that is broken — the information is real, it is just scattered across six platforms and a lot of group chats.',
    ),
    p(
      'Aggregating it sounds like a scraping problem. It mostly is not. Three things make it hard:',
    ),
    ...bullets([
      '**Every source describes events differently.** Some publish clean schema.org JSON-LD. Some publish Open Graph tags and nothing else. Some bury the date and venue in prose.',
      '**The same event appears in more than one place.** A single meetup often has both a Luma page and an Eventbrite listing, with titles that differ by a hyphen or a "#".',
      '**Scraped data is wrong often enough to matter.** Publishing it unreviewed would poison the listing faster than having no listing at all — and a directory people cannot trust is worse than one that is merely incomplete.',
    ]),
    p(
      'So the design question was never "can I scrape these sites." It was "how do I get machine-extracted data in front of a human in a form that makes reviewing it fast."',
    ),
  ],

  stack: [
    stackItem(
      'frontend',
      'Next.js (App Router) + Server Actions',
      'Filtering, pagination and distance sorting run as server actions against Postgres rather than shipping a query builder to the browser. The client sends filter state; the server sends back a page of results.',
    ),
    stackItem(
      'frontend',
      'TanStack Query',
      'Filter combinations are re-visited constantly as people narrow a search and back out of it. Caching by filter key makes the second visit to a filter instant, which matters more than raw query speed here.',
    ),
    stackItem(
      'frontend',
      'TanStack Table',
      'The admin review queue. Sorting and filtering a submission list with a confidence column is exactly the problem it exists for, and it kept the admin surface from becoming its own project.',
    ),
    stackItem(
      'frontend',
      'shadcn/ui + Radix',
      'Accessible primitives without adopting a design system I would then have to fight. Keyboard navigation and focus management on the filter and dialog surfaces come free.',
    ),
    stackItem(
      'data',
      'Supabase (Postgres)',
      'Relational is the right shape here: events, submissions, categories and locations all reference each other. A `public_events` view is what the client actually reads, so unapproved submissions are unreachable from the public side by construction rather than by remembering a `WHERE` clause.',
    ),
    stackItem(
      'data',
      'Postgres RPC',
      'Keyword search maps user terms onto category labels through a `search_events_by_categories` function. Doing it in the database keeps one implementation instead of one per caller.',
    ),
    stackItem(
      'backend',
      'cheerio',
      'Server-side HTML parsing for both halves of the pipeline — finding event links on a listing page, and pulling structured data out of an event page. All six sources render their event links as plain server-side anchors even though the surrounding page is a hydrated SPA, so no headless browser is needed.',
    ),
    stackItem(
      'backend',
      '@mozilla/readability + jsdom',
      'Last-resort description extraction when a page publishes neither JSON-LD nor a usable Open Graph description. It is the only part of the pipeline that guesses, which is why it only ever fills the description field.',
    ),
    stackItem(
      'backend',
      'fastest-levenshtein',
      'Fuzzy title matching for the second dedup stage. Cheap enough to run against every candidate in a date-and-city window, which is the only reason a fuzzy pass is affordable at all.',
    ),
    stackItem(
      'backend',
      'Resend + React Email',
      'Submission and approval notifications. Organisers who submit an event get told when it is approved or rejected, which is the difference between a directory and a form that swallows things.',
    ),
    stackItem(
      'infra',
      'Vercel Cron',
      'One scheduled job at 10:00 UTC daily runs the whole ingestion pass. Events do not change fast enough to justify anything more sophisticated, and a daily cadence keeps the review queue to a size one person can clear.',
    ),
    stackItem(
      'infra',
      'Google Places + geocoding',
      'Turns a venue string into coordinates, which is what makes "events near me" possible. It is also a confidence signal — a venue that geocodes cleanly is more likely to be a real venue.',
    ),
  ],

  decisions: [
    decision('Score the extraction instead of trusting or rejecting it', [
      p(
        'The obvious design is a quality gate: extract an event, decide whether it is good, publish or discard. I could not make that work honestly, because the interesting cases are the ambiguous ones and a boolean throws away everything the pipeline knows about why it is unsure.',
      ),
      p(
        'So every extraction gets a confidence score out of 100 and always lands in a review queue. The base is the extraction method — 70 for clean schema.org JSON-LD, 50 when it fell back to Open Graph meta. From there it earns points for the signals that correlate with a complete listing: an end date, a venue that geocoded, a registration URL distinct from the page it was found on, a description long enough to be prose, categories that matched, and a source domain on the trusted list.',
      ),
      p(
        'The score is stored alongside a breakdown object recording which signals fired. That breakdown is the part that actually pays off: an admin looking at a 55 can see *why* it is a 55 — `og-meta-only`, no geocode — and knows what to check, instead of re-deriving the pipeline\'s reasoning from scratch on every row.',
      ),
      p(
        'The effect is that review time goes where the uncertainty is. High-confidence rows get skimmed; low-confidence rows get read.',
      ),
    ]),
    decision('Two-stage dedup, and the fuzzy stage never rejects', [
      p(
        'Stage one is exact: a SHA-256 hash over the normalised title, start date and city. It catches the common case — the same listing seen again on a later crawl — in a single indexed lookup, against both published events and pending submissions.',
      ),
      p(
        'Stage one cannot catch the case that actually matters, though. "Lagos JS Meetup #12" on Luma and "LagosJS Meetup 12" on Eventbrite are the same event and hash differently. So stage two pulls candidates within a ±3 day window in the same city and compares titles by Levenshtein similarity, treating 0.85 and above as a probable match.',
      ),
      p(
        'The important part is what a fuzzy match does *not* do. It does not reject. It sets a `possibleDuplicate` flag and caps the confidence score at 65, which pushes the row down the queue for a human to look at.',
      ),
      p(
        'That asymmetry is deliberate. A duplicate that reaches the listing is embarrassing and takes one click to remove. A real event silently discarded because its title resembled another one is invisible — nobody files a bug for the event that never appeared. When a heuristic is going to be wrong, it should be wrong in the direction you can see.',
      ),
    ]),
    decision('Shared discovery, per-source rules, one generic extractor', [
      p(
        'The naive structure for a six-source aggregator is six scrapers. That is six things to maintain and six places for the same bug to live.',
      ),
      p(
        'Instead each connector is about fifteen lines: a listing URL and a regular expression describing what an event URL looks like on that platform. One shared discovery pass fetches the listing page, walks its anchors, resolves them to absolute URLs and keeps the ones matching the pattern. This works uniformly because all six platforms — including the two Bevy-hosted ones — emit their event links as server-rendered anchors despite being JavaScript-heavy applications.',
      ),
      p(
        'Extraction is then a single ladder applied to every source: parse JSON-LD if present, fall back to Open Graph only to fill fields JSON-LD left empty, and reach for Readability only if the description is still missing or too short. A weaker signal is never allowed to overwrite a stronger one — the fallback fills gaps, it does not compete.',
      ),
      p(
        'Adding a seventh source is a dozen lines and no new extraction logic.',
      ),
    ]),
  ],

  challenges: [
    h3('Readability returns an article, not a description'),
    p(
      'The last rung of the extraction ladder uses Mozilla\'s Readability to recover a description from pages that publish no structured data. The obvious call is `article.textContent`, and it produces garbage: Readability flattens the entire extracted article into one unbroken string, so the venue, the address and a "Report this event" link all run together into the description with no separators.',
    ),
    p(
      'What worked was loading Readability\'s cleaned HTML back into cheerio and taking only genuine `<p>` elements, dropping any shorter than 30 characters to skip labels and fragments, then joining them with blank lines and capping the result. The insight is that Readability had already done the hard part — deciding which part of the page is content — and the mistake was asking it for text when what I wanted was structure.',
    ),

    h3('Deciding what "required" means when sources disagree'),
    p(
      'An event with no title is not an event. Neither is one with no start date. But a lot of legitimate listings have no venue — online events, or ones where the location is announced later — so requiring a venue would have silently dropped a whole category.',
    ),
    p(
      'The required set ended up as title, start date, and *either* a venue or a city. That is checked twice: once after JSON-LD parsing to decide whether the Open Graph fallback is even worth running, and again after every fallback has had its turn, to decide whether the extraction failed. Failures record a specific reason — `missing-start-date`, `unparseable-start-date`, `fetch-failed` — rather than being dropped silently, which is what makes it possible to tell a source that changed its markup from one that simply had nothing that day.',
    ),

    h3('Geocoding is a data-quality signal, not just a feature'),
    p(
      'Geocoding started as a way to support "events near me" — venue string in, coordinates out, sort by haversine distance. It turned out to double as a validity check. A venue string that geocodes to a real place is more likely to be a real venue than one that does not, so a successful geocode contributes to the confidence score. One integration, paying for itself twice.',
    ),
  ],

  outcomes: [
    outcome('169', 'Published events'),
    outcome('6', 'Source platforms ingested'),
    outcome('2-stage', 'Duplicate detection'),
    outcome('Daily', 'Automated ingestion pass'),
  ],

  results: [
    p(
      'Tech LinkUp lists 169 published events across in-person, virtual and hybrid formats, and picks up new ones without anyone going looking for them.',
    ),
    ...bullets([
      '**Discovery is automated; publication is not.** The daily pass proposes, a human disposes. That split is what lets the listing be both current and trustworthy.',
      '**Adding a source is a fifteen-line file.** Shared discovery and a single extraction ladder mean a new platform needs a URL and a regex, not a new scraper.',
      '**Duplicates are surfaced rather than guessed at.** Exact hashing handles the cheap case; fuzzy matching flags the hard one and defers to a person instead of quietly dropping it.',
      '**Review effort is proportional to uncertainty.** The confidence breakdown tells an admin which fields to distrust on a given row, so a clean import is a glance and a messy one gets the attention.',
    ]),
  ],

  retrospective: [
    ...bullets([
      '**Store the raw HTML for every extraction.** When a source changes its markup, all I currently keep is the parsed result and a failure reason. Keeping the source snapshot would turn "this connector stopped working, when and why" from an investigation into a diff.',
      '**Calibrate the confidence weights against outcomes.** The point values are reasoned but hand-tuned. Every reviewed submission is a labelled example of whether the score was right, and I am not yet feeding that back — the queue is quietly generating training data I am ignoring.',
      '**The 0.85 similarity threshold is a guess that has never been measured.** It has not obviously misfired, but "has not obviously misfired" is not evidence. The reviewed queue could tell me its real false-positive rate and I have not asked it.',
      '**Per-source health, not just per-event failures.** Failures are recorded individually. What I actually want to be paged about is a connector that returned zero events three days running — a source going quiet looks exactly like a quiet week until you compare it against itself.',
    ]),
  ],

  seo: {
    metaTitle: 'Tech LinkUp — Case Study',
    metaDescription:
      "Aggregating Nigeria's tech events from six platforms: a confidence-scored extraction pipeline, two-stage duplicate detection, and why nothing scraped is ever auto-published.",
  },
}
