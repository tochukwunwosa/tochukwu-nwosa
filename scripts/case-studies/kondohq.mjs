import { p, bullets, stackItem, decision, outcome } from '../lib/portable-text.mjs'

/**
 * Client work. Deliberately scoped to my own contribution and approach —
 * no description of the client's internal architecture, code organisation,
 * or anything that reads as a judgement on their codebase.
 */
export default {
  docId: 'project-kondohq',
  title: 'KondoHQ',
  role: 'Frontend engineer — partner dashboard, end to end',
  status: 'Live — client project',

  overview: [
    p(
      'KondoHQ is a property investment platform. Partners put money into development projects and follow them through to payout, which makes it closer to an investment product than a listings site — the numbers on screen are numbers people have actually committed.',
    ),
    p(
      'I joined as a frontend engineer and owned the partner-facing dashboard end to end: the dashboard landing, the flow from viewing a project to applying to it, market insights, and the partner settings screens, plus the admin settings screen. Designs came from Figma. The backend was still being built.',
    ),
    p(
      'This is client work, so the interesting part is not a product decision I got to make. It is how you deliver a complete surface when half of what you depend on does not exist yet.',
    ),
  ],

  problem: [
    p(
      'The designs were ready before the API was. That is the normal state of things on a team where design runs ahead of backend, and it hands a frontend engineer three options, two of which are bad:',
    ),
    ...bullets([
      '**Wait for the endpoints.** Correct data, zero delivery, and all the integration risk compressed into one window at the end of the project.',
      '**Build against whatever the backend eventually returns.** Fast to start, then rework every screen when the shape turns out different from what the UI assumed.',
      '**Build against a shape you define, and reconcile as the real thing lands.**',
    ]),
    p(
      'Only the third lets design, frontend and backend run in parallel without one of them absorbing the cost of the others being late. It also requires being explicit about your assumptions up front rather than discovering them at integration time — which is the part that actually pays off.',
    ),
  ],

  stack: [
    stackItem(
      'frontend',
      'Next.js (App Router)',
      'Route groups keep the marketing site, the partner app and the admin panel in one codebase without their layouts or auth flows bleeding into each other.',
    ),
    stackItem(
      'frontend',
      'TypeScript',
      'The reason mock-first integration works at all. A typed data shape is a claim the compiler enforces, so swapping a mock for a real response surfaces every mismatch immediately instead of at runtime on someone else\'s screen.',
    ),
    stackItem(
      'frontend',
      'TanStack Query',
      'Server state as a cache with real loading and error semantics rather than data smeared across component state. It is also what made incremental integration cheap — moving one data source from mock to endpoint touches one place, not every screen that reads it.',
    ),
    stackItem(
      'frontend',
      'Zustand',
      'For the client state that genuinely is global — layout, theme, session, multi-step form progress. Kept deliberately separate from server state so the two never get confused for each other.',
    ),
    stackItem(
      'frontend',
      'Formik + Yup',
      'The application flow is form-heavy and this was the stack already in use. Joining an existing codebase is not the moment to relitigate a library choice that works.',
    ),
    stackItem(
      'frontend',
      'Tailwind + Radix',
      'Implementing a design precisely is far less painful with utilities than with a component library whose opinions you spend the day overriding, and Radix covers the primitives where accessible behaviour matters more than appearance.',
    ),
    stackItem(
      'tooling',
      'xlsx + file-saver',
      'Spreadsheet export. For anything financial, people want the numbers in the tool they already reconcile in — a table they cannot export is a table they will retype.',
    ),
  ],

  decisions: [
    decision('Build against a mock, and treat the mock as a contract proposal', [
      p(
        'I started with hardcoded values in the components, moved them into typed mock modules once the shape settled, and swapped those for real endpoints one data source at a time as the backend delivered them.',
      ),
      p(
        'The part that mattered more than I expected: writing the mock forces you to state exactly what a screen needs, in a typed file, before anyone has committed to anything. When fields turned out to be missing from early API responses, the conversation was not "the data seems incomplete" — it was a specific shape I could point at, that the UI already demonstrably worked against.',
      ),
      p(
        'That is the difference between a mock as a placeholder and a mock as a proposal. The first gets thrown away at integration. The second is the thing integration converges on.',
      ),
      p(
        'It held up: no screen had to be rewritten when the real data arrived. The mocks were replaced underneath the UI rather than around it.',
      ),
    ]),
    decision('Build the shell once, before the second screen needs it', [
      p(
        'Several screens in my scope were the same shape — a set of sections with a persistent navigation and one content pane. The obvious route is to build the first one, then copy it for the second.',
      ),
      p(
        'I built it as a single shared component instead, typed generically so each screen supplies its own set of sections and the compiler still catches a section that does not exist on that screen. Generic in the type, specific in the data.',
      ),
      p(
        'The timing is the whole decision. Extracting a shared component while there is one consumer is a refactor of one file. Extracting it after three screens have each drifted slightly is an argument about which of the three is correct. Reuse is cheapest before you need it, which means acting on a pattern the first time you see it repeat rather than the third.',
      ),
    ]),
  ],

  outcomes: [
    outcome('5', 'Screens owned, design to integration'),
    outcome('Mock-first', 'Shipped ahead of the API'),
    outcome('0', 'Screens rewritten at integration'),
    outcome('2 locales', 'Market insights in English and Yoruba'),
  ],

  results: [
    p(
      'The partner dashboard shipped as a complete surface — landing, project view, application flow, market insights and settings — without frontend delivery being gated on backend readiness.',
    ),
    ...bullets([
      '**Integration happened incrementally and invisibly.** Data sources moved from mock to endpoint one at a time, with no screen rewritten to accommodate the real API.',
      '**Missing fields surfaced as a shape mismatch, not a bug report.** The typed mock made the gap specific and the correction quick.',
      '**Market insights shipped in English and Yoruba,** which is a cheap decision at the start and an expensive one to retrofit.',
      '**Implemented to the designs precisely,** with deviations confined to responsive behaviour the static files did not specify.',
    ]),
  ],

  retrospective: [
    ...bullets([
      '**Get responsive behaviour specified rather than inferred.** The designs defined desktop layouts precisely and left small-screen behaviour to be worked out in implementation. Every deviation I made was a judgement call made alone and justified afterwards. Asking for breakpoint intent up front is far cheaper than reverse-engineering it and defending it in review.',
      '**Clear away your own scaffolding.** Mock modules that have been replaced by real endpoints should be deleted, not left sitting in the tree. Dead fixtures are an invitation — the next person who needs sample data imports one and ships a screen backed by fabricated numbers, on a platform where the numbers are money.',
      '**A generic component should not know its consumers.** Mine ended up with a couple of special cases for particular sections baked into it. Those are decisions belonging to the screens using the component, and they should have been props from the start rather than conditions inside something that otherwise knows nothing about who renders it.',
      '**Say what a mock is for, in the mock.** The typed shapes worked as a contract proposal, but that was an intent I held in my head rather than anything written down. A short note in each mock module — this is the shape I need, here is what is still assumed — would have made the handover to the backend explicit instead of implicit.',
    ]),
  ],

  seo: {
    metaTitle: 'KondoHQ — Case Study',
    metaDescription:
      'Building the partner dashboard for a property investment platform against an API that did not exist yet: mock-first integration, and treating a typed mock as a contract proposal.',
  },
}
