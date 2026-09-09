import { p, h3, bullets, stackItem, decision, outcome } from '../lib/portable-text.mjs'

export default {
  docId: 'project-claimmate',
  title: 'ClaimMate',
  role: 'Solo — product, frontend, backend, prompt design, and export pipeline',
  status: 'Early access — development paused',

  /**
   * Card-level corrections. The original card claimed "OpenAI API" (it is
   * OpenRouter calling Mistral 7B) and "role-based authentication" (there is
   * no role concept — it is Supabase Auth plus row-level security scoping
   * each row to its owner).
   */
  card: {
    description:
      'Built the full product — Next.js frontend, Supabase backend, and an OpenRouter drafting pipeline that checks a claim for missing information and returns questions before it will write anything. Claim data is isolated per user by Postgres row-level security, and finished letters export to PDF, Word or plain text. Optimized with Next.js SSG for sub-2s load times and a 95+ Lighthouse score.',
    technologies: ['Next.js', 'TypeScript', 'OpenRouter', 'Supabase', 'TailwindCSS'],
    metrics: [
      'Row-Level Security Isolation',
      'Gap Check Before Every Draft',
      'PDF/Word Export Pipeline',
      '95+ Lighthouse · <2s Load',
    ],
  },

  overview: [
    p(
      'ClaimMate drafts insurance claim letters for independent agents in the US market. An agent fills a structured intake form — incident, parties, damages, costs, whether a police report exists — and gets back a formal claim letter they can edit, revise, and export as PDF, Word or plain text.',
    ),
    p(
      'One constraint shaped every decision in it: a claim letter is a factual submission to an insurance carrier. A hallucinated detail is not a clumsy sentence. It is a false statement on a document with legal weight, signed by the agent rather than by me.',
    ),
    p(
      'So the interesting engineering here is not "call a model and render the response." It is the set of guardrails that stop a language model doing the thing language models are best at — producing confident, fluent prose regardless of whether the input supported it.',
    ),
    p(
      'ClaimMate is in early access and I am not actively developing it right now. I would rather say that plainly than imply otherwise: the last section of this case study is not a list of regrets, it is the list I will work from when I pick it back up.',
    ),
  ],

  problem: [
    p(
      'Independent agents write these letters by hand, from notes, one at a time. The structure barely varies between claims: letterhead, subject line, what happened, where and when, who was involved, the extent of the loss, what evidence exists, what is being asked for. It is repetitive work where the format is fixed and only the facts change — which is close to the definition of a task worth automating.',
    ),
    p('It is also close to the definition of a task where naive automation is dangerous:'),
    ...bullets([
      '**Missing information does not announce itself.** If an agent forgets the incident location, a model will happily write a fluent letter around the hole, or quietly invent something plausible.',
      '**Fluency reads as accuracy.** A well-formed letter looks correct. A reviewer skimming it is far more likely to catch an awkward sentence than a confidently stated wrong date.',
      '**The agent carries the liability, not the tool.** Whatever the software produces goes out under their name to a carrier who may act on it.',
    ]),
    p(
      'That reframes the product. The job is not to generate the best possible letter. It is to make sure that whatever the agent submits contains only facts the agent actually provided.',
    ),
  ],

  stack: [
    stackItem(
      'frontend',
      'Next.js (App Router) + Server Actions',
      'Every model call and database write is a server action, so the OpenRouter key and the service-role client never exist in the browser. For a form-driven app with no public API surface, that removes a whole category of route to secure.',
    ),
    stackItem(
      'frontend',
      'React Hook Form + Zod',
      'The intake form is long and largely optional-by-field. Validating the payload against a Zod schema before anything else runs means malformed input fails locally instead of becoming a wasted model call.',
    ),
    stackItem(
      'frontend',
      'Tiptap',
      'The generated draft has to be editable in place. The agent is the author of record, so the product would be dishonest if the output were read-only.',
    ),
    stackItem(
      'frontend',
      'shadcn/ui + Radix',
      'Accessible dialogs, selects and tabs without adopting a design system I would then fight. The intake flow is mostly form primitives, which is exactly what this gives you.',
    ),
    stackItem(
      'backend',
      'OpenRouter',
      'A single HTTP contract in front of many models, so swapping the model is a constant change rather than a rewrite. It also let me validate the product on a free tier before committing to per-token cost.',
    ),
    stackItem(
      'backend',
      'Mistral 7B Instruct',
      'The current model behind the drafting calls. For this task the prompt does most of the work — the structure is fixed and the facts are supplied — so instruction-following matters more than raw capability. It is the choice I would revisit first with real usage data.',
    ),
    stackItem(
      'data',
      'Supabase (Postgres) with RLS',
      'Claim records hold incident descriptions, injuries and third-party names — other people\'s data, not just the user\'s. Row-level security scopes every claim to its owner in the database, so a missed filter in application code cannot leak one agent\'s claims to another.',
    ),
    stackItem(
      'data',
      'Supabase Auth + Storage',
      'Auth issues the identity that RLS policies key on, and a storage bucket holds exported documents. One service, one identity, no second system to keep in sync.',
    ),
    stackItem(
      'tooling',
      'docx',
      'Generates real Word documents with a real paragraph structure. Carriers expect Word, and an agent frequently needs to edit the letter after export.',
    ),
    stackItem(
      'tooling',
      'jsPDF + html2canvas',
      'The PDF path. It renders the on-screen draft to a canvas and places it in a PDF, which preserves exact visual formatting at the cost of producing an image rather than selectable text — a tradeoff I would make differently now.',
    ),
  ],

  decisions: [
    decision('The model may not invent facts — so it has to be allowed to refuse', [
      p(
        'Before any letter is drafted, the claim data goes through a separate model call with a single job: find what is missing. The prompt is explicit about what it must not do — do not write a letter, do not guess, do not make up data — and asks for every unclear item phrased as a specific question to put to the user.',
      ),
      p(
        'If that call returns anything, generation does not run. The server action returns `needsClarification` with the list of questions, and the user answers them before the letter exists at all. Only a response of "All data is sufficient" lets drafting proceed.',
      ),
      p(
        'This is the whole product thesis in one control-flow decision. The default behaviour of a language model is to produce output. Given an incomplete claim it will write a complete-looking letter, because that is what it was trained to do. Making "I cannot write this yet" a first-class outcome — with a structured path back to the user — is the only way I found to get gap-surfacing rather than gap-filling.',
      ),
      p(
        'The same principle runs through the rest of the flow. The draft lands in an editor rather than a preview. Corrections are applied by asking the model to revise a specific thing while preserving structure, not by regenerating from scratch. Nothing is ever submitted anywhere by the product. The agent reviews, edits, exports, and files it under their own name.',
      ),
    ]),
    decision('Temperature is a per-task policy, not an app-wide setting', [
      p(
        'The same API call is used for four different jobs, and they do not want the same amount of variation:',
      ),
      ...bullets([
        '**0.2 — gap detection.** This is a classification task pretending to be a chat completion. Creativity is purely downside; I want the same answer for the same input.',
        '**0.2 — letter generation.** The comment I left in the code is "lower temperature for more consistent, factual output." Prose quality matters less than not drifting away from the supplied facts.',
        '**0.3 — applying a correction.** Slightly more room, because a revision has to re-word around an edit, but the surrounding structure must survive intact.',
        '**0.7 — template-driven narrative.** The one path where the output is a narrative from a user-chosen template and some variation is genuinely wanted.',
      ]),
      p(
        'Treating temperature as a knob you set once per application is a mistake I made early and backed out of. It is a statement about how much you trust variation for a *specific* task, and this app has four tasks with four different answers.',
      ),
    ]),
    decision('Row-level security in the first migration, not a later hardening pass', [
      p(
        'The third migration in the repo turns on row-level security for the claims table and adds four policies — select, insert, update, delete — each scoped to the authenticated user. The same pattern covers plans and subscriptions.',
      ),
      p(
        'The reason to do this on day one rather than later is that RLS is cheap to adopt at zero rows and expensive to retrofit onto an application whose queries already assume they can see everything. Every query written before the policy exists is a query you then have to re-audit.',
      ),
      p(
        'It also moves the guarantee to the right layer. Application-level tenant filtering is correct only as long as every future query remembers to include it, which is a promise about all code that will ever be written. A policy is enforced once, by the database, for queries that do not exist yet.',
      ),
    ]),
  ],

  challenges: [
    h3('Parsing an answer that has no schema'),
    p(
      'The gap-detection call returns free text. Turning that into a list of questions the UI can render is currently done by splitting on newlines and keeping lines longer than five characters — a filter whose only job is to drop stray fragments.',
    ),
    p(
      'It works, and it is the most brittle thing in the codebase. It assumes the model answers as one item per line. A model that replies in a paragraph, or numbers its list differently, degrades the feature silently — the user gets a malformed question or a missing one, and nothing errors.',
    ),
    p(
      'The correct fix is to stop parsing prose: constrain the response to JSON and validate it with the same Zod schema discipline used on the intake form. That would also make the "all data is sufficient" case a boolean field rather than a substring match on English text, which is the other fragile assumption in that function.',
    ),

    h3('Two export formats, two completely different problems'),
    p(
      'PDF and Word look like one feature and share almost no implementation. Word is generated as a real document — paragraphs and text runs assembled programmatically — so the output has structure and the agent can keep editing it after export, which is what they actually do.',
    ),
    p(
      'The PDF path renders the on-screen draft to a canvas and places the image into a document. That guarantees the PDF looks exactly like the preview, which is a real property when the thing being exported is a formal letter whose layout matters. The cost is that the result is a picture of a letter: the text is not selectable, not searchable, and not accessible to a screen reader.',
    ),
    p(
      'I took visual fidelity at the time because layout drift on a formal document is immediately visible and text selection is not. Having lived with it, I think that was the wrong trade — a carrier or an assistive technology reading the file cannot get at the words, and the layout could have been rebuilt with the same document primitives the Word path already uses.',
    ),

    h3('Validating before spending anything'),
    p(
      'Model calls cost money and take seconds, and the intake form is long enough that a malformed submission is not unusual. The ordering that ended up mattering: parse with Zod first, confirm the authenticated user second, run gap detection third, and only then generate.',
    ),
    p(
      'Each of those fails faster and cheaper than the one after it. It is an obvious ordering in hindsight; it was not the order I wrote it in first, and the version where generation ran before the gap check was both slower and more expensive for exactly the inputs most likely to be wrong.',
    ),
  ],

  outcomes: [
    outcome('2-pass', 'Every draft: gap check, then write'),
    outcome('4', 'Task-tuned model temperatures'),
    outcome('3', 'Export formats (PDF, Word, text)'),
    outcome('RLS', 'Enforced from the first migration'),
  ],

  results: [
    p(
      'ClaimMate turns a structured intake form into a formal, editable claim letter without the model being permitted to fill in what the agent did not supply.',
    ),
    ...bullets([
      '**Incomplete claims produce questions, not letters.** The gap-detection gate returns specific questions to the user and blocks generation until they are answered.',
      '**The agent stays the author.** Draft lands in a rich-text editor, corrections are applied as targeted revisions rather than regenerations, and the product never submits anything on the user\'s behalf.',
      '**Tenant isolation is enforced by the database.** Claims, plans and subscriptions all carry row-level policies scoped to the authenticated user.',
      '**Three export paths** covering what carriers accept and what agents need to keep editing.',
    ]),
  ],

  retrospective: [
    ...bullets([
      '**There is no eval set, so every prompt change is unfalsifiable.** A fixed set of claim inputs with known-good outputs would make "did that prompt edit help" a question I can answer instead of a vibe. For a product whose core value is model behaviour, that is the most important thing missing.',
      '**The versioning schema is built and unused.** `draft_versions` and `draft_corrections` exist with indexes and a trigger, and nothing in the application writes to them — generation updates the claim row in place, so there is no history. Either wire it up or drop the tables; a schema that describes behaviour the app does not have is worse than no schema.',
      '**Two generation paths drifted apart.** One writes the draft to `content`, the other to `generated_content`, for the same concept. Two columns meaning one thing is how a "why is the draft empty" bug gets written.',
      '**Constrain the model output to JSON.** The gap-detection parser splits prose on newlines. Structured output would make that function robust instead of lucky, and turn the sufficiency check into a boolean rather than a substring match.',
      '**Benchmark the model against the task.** The current model was chosen because it was free while I validated the product, and it has never been compared against a stronger one on real claims. That is a reasonable starting position and an unreasonable resting one.',
      '**Export the PDF as text, not as a picture.** Rasterising the preview bought exact layout fidelity and gave up selectable, searchable, screen-reader-accessible text on a formal document. Wrong side of that trade.',
    ]),
  ],

  seo: {
    metaTitle: 'ClaimMate — Case Study',
    metaDescription:
      'An AI insurance claim drafting tool built around one constraint: the model is never allowed to invent a fact. Gap detection, per-task temperatures, and row-level security from the first migration.',
  },
}
