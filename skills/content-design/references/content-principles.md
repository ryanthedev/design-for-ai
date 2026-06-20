# Content principles — the why-engine

**Sources:** Podmajersky *Strategic Writing for UX* (2019, O'Reilly); Richards *Content Design* (2017/2022, Rachel Elnaugh); Redish *Letting Go of the Words* (2007/2012, Elsevier); Metts & Welfle *Writing Is Designing* (2019, A Book Apart); Halvorson & Rach *Content Strategy for the Web* (2012). Layer A of the two-layer catalog: the principles that *adjudicate* content decisions. Cite them to ground a recommendation, then recommend.

---

## Table of Contents

1. [Key definitions](#key-definitions)
2. [Core principles](#core-principles)
3. [Voice and tone systems](#voice-and-tone-systems)
4. [Plain language and scannability](#plain-language-and-scannability)
5. [Content-first process](#content-first-process)
6. [Design review criteria](#design-review-criteria)
7. [Common mistakes](#common-mistakes)

---

## KEY DEFINITIONS

> **Voice**: The personality a product expresses through language — stable across all contexts. Reflects the brand's character and values (Podmajersky, 2019).

> **Tone**: How the voice adapts to an emotional or functional context — same personality, different register. An error message and a celebration message share a voice; their tone differs (Podmajersky, 2019).

> **Microcopy**: The small-but-consequential words that guide action: button labels, error messages, empty states, placeholder text, tooltips, helper text. Not "small" in importance — often the highest-stakes text on a screen (Yifrah, 2017).

> **Content design**: Making decisions about content based on evidence and user need. Starts with the problem to solve, not the thing to write (Richards, 2017). Content is the design material, not a deliverable handed off after wireframing.

> **Plain language**: Writing structured for the reader's goal and cognitive load, not the writer's expertise. Not "dumbing down" — accessible to the person with least context, faster for everyone else (Redish, 2007).

> **Content-first**: Designing with words and content as the primary material; wireframes and layouts follow from what a screen must communicate, not the reverse (Metts & Welfle, 2019).

---

## CORE PRINCIPLES

### Words are design decisions (Metts & Welfle)

*Writing Is Designing* (2019): Writing and design are not sequential handoffs — they are simultaneous design acts. A button label is a design decision with task-completion, accessibility, and localization consequences. Content that arrives late in the process is retrofitted into a container built without it; it will not fit well.

**Implication:** Content designers belong in the room when wireframes are drawn. The label "Submit" vs "Save progress" vs "Send application" is not a copy tweak — it changes what the user believes they're committing to.

### Start with user need, not system output (Richards)

*Content Design* (Richards, 2017): The wrong starting question is "what do we want to tell people?" The right question is "what does the user need to know or do at this moment?" Content designed around system outputs (confirmation codes, database terms, internal process names) creates friction. Content designed around user goals creates clarity.

**The GDS (UK Government Digital Service) discipline**: Every piece of content must answer: what is the user trying to do? what do they need to know to do it? in what format will they most easily understand it?

### The reader is in a hurry (Redish)

*Letting Go of the Words* (Redish, 2007/2012, Elsevier): Research on web reading behavior (Nielsen, Morkes; Landauer; DeLong) consistently finds:
- Users scan before reading; many scan-only.
- Average word exposure on a web page: ~28% (Nielsen, 1997 — still directionally accurate for task-oriented interfaces).
- Users read for *their* goal, not yours.
- Long blocks of prose are skipped; bulleted, chunked, front-loaded content is consumed.

**Implication**: Every sentence competes with "I'll skip this." Write as if the first clause is all the user will read. Front-load the action, decision, or key fact.

### Writing that reduces support tickets (Redish)

Redish documents repeated cases where plain-language rewrites reduced inbound support volume 15–80%. The mechanism: users could complete tasks without calling for help. Plain language is not a courtesy — it is a cost reduction and task-completion metric.

### Voice as a language system (Podmajersky)

*Strategic Writing for UX* (Podmajersky, 2019, O'Reilly): Voice is not a mood or a style guideline — it is a **language system**:

- **Voice chart**: a matrix of brand character traits (adjectives) × product moment types → concrete linguistic choices (vocabulary, sentence structure, register, punctuation norms). Not "be friendly" — "use contractions; active voice; second person; no exclamation marks except at genuine user successes."
- **Terminology agreement**: every product term (button labels, nav labels, error codes, entity names) is agreed-upon across content, design, engineering, and legal. Inconsistent terms are a usability failure (Nielsen #4: consistency and standards).
- **Content model**: the taxonomy of content types in a product and their structural rules — before writing any specific instance.

---

## VOICE AND TONE SYSTEMS

### The voice/tone distinction (Podmajersky)

| Dimension | What it is | Example |
|-----------|-----------|---------|
| **Voice** | The product's personality — stable | "Direct, warm, plain-spoken, never snarky" |
| **Tone** | How voice adapts to context — varies | Error: more careful, less playful; Success: warmer, more celebratory |
| **Register** | Formality level — varies by audience and context | B2B enterprise: higher register; consumer app: lower register |

**How to build a voice chart (Podmajersky):**
1. Name 3–5 character traits as concrete adjectives (not synonyms — pick the precise word).
2. For each, write the *in-range* expression (this sounds like us) and the *out-of-range* expression (this does not).
3. Add specific linguistic rules: vocabulary level, sentence length, use of contractions, punctuation norms, use of humor.
4. Apply the chart to each product moment type — map tone shifts explicitly.

**Anti-pattern**: "Our voice is friendly, helpful, and clear." These are not character traits; they are aspirations any brand claims. Voice must differentiate AND constrain.

### Tone mapping by moment type

| Product moment | Tone direction | What shifts |
|----------------|---------------|-------------|
| Empty state (first use) | Welcoming, guiding, low-pressure | More warmth; forward-looking language |
| Error / failure | Calm, clear, solution-oriented | Less personality; more precision; no levity |
| Success / completion | Warm, celebratory (within brand register) | More warmth; acknowledgment of user effort |
| Warning / caution | Clear, direct, not alarming | Neutral; specific; avoid "critical" inflation |
| Destructive action confirm | Serious, specific, no humor | State the consequence; no ambiguity |
| Onboarding | Encouraging, brief, milestone-focused | Lean into voice; minimal prose; guide next step |
| Legal / terms | Formal, plain-language version of formal | Maximum clarity; minimize legalese |

---

## PLAIN LANGUAGE AND SCANNABILITY

### Scannability principles (Redish)

Redish (2007) and Nielsen/Morkes research on web reading identifies the content patterns users scan for before committing to read:

- **Meaningful headings** — specific information, not category labels. "Submit your application by June 30" beats "Instructions."
- **Front-loaded sentences** — the action or key fact first; context and caveats after.
- **Short paragraphs** — 1–3 sentences on the web; never more than 5.
- **Bullets for parallel items** — but only genuinely parallel items; not prose broken arbitrarily into bullets.
- **Concrete language** — what this does, not what category it belongs to. "Removes the file permanently" beats "Destructive action."

### Plain language rules

| Rule | Source | Application |
|------|--------|-------------|
| Active voice, not passive | Redish; US Plain Writing Act 2010 | "You can cancel anytime" not "Cancellation may be completed at any time" |
| Second person ("you") | Redish | Creates a direct relationship; speaks to the user's action |
| Shortest accurate word | Redish; Strunk & White | "use" not "utilize"; "help" not "facilitate" |
| One idea per sentence | Redish | Compound sentences hide the main instruction |
| Positive framing | Yifrah; Norman | What the user CAN do, not what they can't |
| No jargon without definition | Richards | If a domain term is necessary, define it once, near its first use |
| Numbers: digits beat words | Redish | "3 items" not "three items" (scanning; pattern recognition) |
| Reading level ≈ 8th grade for general audiences | Federal Plain Language Guidelines | Aim for Flesch-Kincaid 60–70 for consumer products; higher for technical products where the audience has domain expertise |

### Scanning patterns (NN/g + Redish)

**Layer-cake scan** (the desirable one): users jump heading to heading; consume meaningful headings; skip prose under irrelevant headings. Design for this: every heading must communicate something specific.

**F-pattern**: a symptom of unscannable prose, not a goal. Headings that don't differentiate → user falls back to scanning the first word of each line. Fix: make headings meaningful and front-load each paragraph.

**Spotted pattern**: users hunt for a specific word, link, or data point. Implications: use the user's vocabulary, not internal terminology; make link text descriptive (not "click here").

---

## CONTENT-FIRST PROCESS

### What it is (Richards; Metts & Welfle)

Content-first means designing WITH content as the primary material rather than retrofitting words into completed wireframes. It is a process discipline, not a content type.

**The GDS model (Richards, 2017):**
1. **Understand the user need** — not the business requirement, the user's actual goal at this moment.
2. **Understand the format** — web, app, paper, voice? Length and format decisions are content decisions.
3. **Write the content** — draft what the screen must say BEFORE drawing boxes.
4. **Let the content shape the layout** — wireframe around what the content requires, not around a template.
5. **Test with users** — does the content help them complete their task? Do they understand the words?

**Why it matters (Metts & Welfle):** A wireframe built without content creates containers that don't fit real content — "Lorem ipsum" layouts that break when the actual 42-character error message replaces the 10-character placeholder.

### Content inventory and audit

Before designing new content, audit what exists:
- What content does the product currently contain?
- Does each piece serve a user need (Richards: "if it doesn't serve the user, it doesn't belong")?
- Are terms consistent? (Podmajersky: terminology agreement)
- Are there gaps — moments where the product goes silent and the user doesn't know what happened?

---

## DESIGN REVIEW CRITERIA

Use these when auditing content in an existing product:

| Criterion | What to check | Source |
|-----------|--------------|--------|
| **User-need fit** | Does each piece of content serve a user goal or need? | Richards |
| **Plain language** | Active voice, short sentences, no jargon, concrete nouns, positive framing | Redish |
| **Scannability** | Meaningful headings, front-loaded text, short paragraphs, parallel bullets | Redish |
| **Voice consistency** | Does the copy feel like the same product/personality throughout? | Podmajersky |
| **Tone appropriateness** | Is the tone calibrated to the emotional context (error ≠ celebration)? | Podmajersky |
| **Error message formula** | Cause + fix + forward path; no blame; no dead-ends | Yifrah |
| **CTA specificity** | Does the button label state the action and outcome? "Save draft" beats "OK" | Yifrah; Nielsen #2 (match system and real world) |
| **Terminology consistency** | Same concept = same word, every time, everywhere | Podmajersky; Nielsen #4 |
| **No silent failures** | Every system state (loading, empty, error, success, warning) has content | Nielsen #1 (visibility of status) |
| **Localization readiness** | No idioms, wordplay, or culturally specific references that won't translate | Richards |

---

## COMMON MISTAKES

| Mistake | Why it happens | Correct approach |
|---------|----------------|------------------|
| "Submit" as a default CTA | Generic placeholder never replaced | Label the action and outcome: "Create account", "Send message", "Save changes" |
| Error messages that blame users | Developer defaults ("Invalid input", "Error 403") | State what happened and how to fix it: "That email is already in use. Sign in or use a different email." |
| Placeholder text as label | Space-efficient — but inaccessible | Top-aligned persistent label + placeholder as example, never the only label (WCAG 1.3.5) |
| "Click here" as link text | Writer-centric (pointing at an action) | Descriptive link text: "View your invoice for March" (screen-reader context; scanning) |
| Voice document that lists adjectives only | Easier to write | Voice chart with in-range/out-of-range examples + specific linguistic rules; adjectives alone don't constrain |
| Writing after wireframing | Process: design hands off to content | Content shapes the wireframe; words are design material, not filler (Metts & Welfle) |
| Jargon preserved for "authority" | Internal vocabulary feels official | Authority comes from clarity; jargon signals insider-only content and creates exclusion (Richards) |
| Onboarding as a prose tour | "Let me explain all the features" | Onboarding is the minimum a user needs to reach their first success moment; everything else is progressive disclosure |
