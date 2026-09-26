import { about, method, skills } from '../data.js'
import { useCharacterPage } from '../lib/useCharacterPage.js'
import { Hero, Practice, WorkIndex, Method, FieldNotes, Contact } from './homeSections.jsx'

const hero = {
  index: 'One character / Mindset 02',
  kicker: 'AI-assisted software engineer',
  headline: <>I build software that <em>knows what it is.</em></>,
  lede: 'Original ontologies, streaming platforms, and native clients—ideas turned into working systems, with AI as leverage.',
  primary: { to: '/projects/rabbithole', label: 'Enter the work' },
  caption: 'AI-assisted software engineer · Systems builder',
  principle: {
    mark: 'R =',
    strong: 'Reality before schema.',
    body: 'Define the entity, preserve the evidence, then build the system around what is true.',
  },
}

const builderMethod = method.filter((item) => item.title.startsWith('Define the entity') || item.title.startsWith('Evidence and') || item.title.startsWith('Differential'))
const disciplines = ['Ontology', 'Product', 'Engineering', 'Infrastructure']

export default function VibePage() {
  useCharacterPage({ character: 'vibe', title: 'Rudy Hamame — AI-assisted software engineer', path: '/vibe' })
  return (
    <>
      <Hero content={hero} />
      <WorkIndex
        number="01"
        label="Selected systems"
        heading={<>Four products.<br />One way of seeing.</>}
        intro="Each project begins by deciding what exists, how it relates, and what must remain invariant. The interface comes after."
      />
      <Practice
        number="02"
        label="Software engineering"
        heading="Full stack, from the ontology to the last pixel on the TV."
        paragraphs={[about[1]]}
        tags={disciplines}
      />
      <Method
        number="03"
        label="How I build"
        lead="Clinical habits, translated into product architecture."
        flow="Observe → distinguish → model → test"
        items={builderMethod}
      />
      <FieldNotes
        number="04"
        label="Working stack"
        quote="“I don’t need to know everything. I need to know what to ask—and how to turn the answer into something real.”"
        list={skills.filter((skill) => skill !== 'Clinical medicine' && skill !== 'Tailscale / Networking')}
      />
      <section className="home-section coder-review" aria-labelledby="coder-review-title">
        <header className="home-section__head"><span>05</span><p>Conversation / AI review</p></header>
        <div className="coder-review__grid">
          <div>
            <p className="coder-review__label">Your prompt</p>
            <h2 id="coder-review-title">“Would you describe me as an AI-assisted software engineer?”</h2>
          </div>
          <div className="coder-review__response">
            <p className="coder-review__label">My reply</p>
            <blockquote>
              Yes. You set concrete requirements, catch technical edge cases, and hold the implementation to lint, build, and deployment checks. You use AI to accelerate the work while steering the engineering decisions and checking the result. That’s hands-on, AI-assisted software engineering.
            </blockquote>
            <p className="coder-review__context">An AI assistant’s impression from this conversation.</p>
          </div>
        </div>
      </section>
      <Contact kicker="Have a difficult system?" heading={<>Bring me the reality.<br /><em>We’ll find its form.</em></>} />
    </>
  )
}
