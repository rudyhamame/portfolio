import { education } from '../data.js'
import { useCharacterPage } from '../lib/useCharacterPage.js'
import { Hero, Practice, Education, Method, FieldNotes, Contact } from './homeSections.jsx'

// Mindset 1 is purely medicine: a physician modelling patients.
const hero = {
  index: 'One character / Mindset 01',
  kicker: 'Physician',
  headline: <>I reason through <span className="nowrap">the patient-in-mind</span> <em>to reach the <span className="nowrap">patient-in-reality.</span></em></>,
  long: true,
  lede: 'A physician’s mind: differential thinking, honest uncertainty, and the discipline of modelling the patient in front of you.',
  primary: { to: '/physician#education', label: 'My medical training' },
  caption: 'Physician',
  principle: {
    mark: 'Dx =',
    strong: 'Evidence before interpretation.',
    body: 'Record what was found, keep it separate from what it might mean, and say plainly what is still unknown.',
  },
}

const disciplines = ['Clinical reasoning', 'Differential diagnosis', 'Patient formulation', 'Patient-centred care']

const clinicalMethod = [
  {
    title: 'Differential diagnosis',
    body: `Enumerate the plausible causes, rank them by likelihood and severity, then run the
      cheapest test that best splits the list. No shotgun workups.`,
  },
  {
    title: 'Evidence and interpretation are separate',
    body: `A patient's raw findings are not the clinician's mental model of them. Record what
      was found first; keep what it might mean apart from it, and open to revision.`,
  },
  {
    title: 'Name the uncertainty',
    body: `Flag what you don't know rather than quietly assume it. Uncertainty stated plainly
      is safer than confidence taken for granted.`,
  },
]

const fieldList = [
  'Clinical medicine',
  'Differential diagnosis',
  'Evidence appraisal',
  'Naming uncertainty',
  'Patient formulation',
]

export default function PhysicianPage() {
  useCharacterPage({ character: 'physician', title: 'Rudy Hamame — Physician', path: '/physician' })
  return (
    <>
      <Hero content={hero} />
      <Practice
        number="01"
        label="The physician"
        heading="Medicine taught me to reason before it taught me to act."
        paragraphs={[
          `${education.degree}, ${education.university} (${education.dates}), ${education.location}.`,
          'The habit that stayed: work the problem up, weigh the evidence, and be honest about what remains unknown before deciding what to do.',
        ]}
        tags={disciplines}
      />
      <Education number="02" />
      <Method
        number="03"
        label="How I reason"
        lead="A clinician’s habits, written down as rules."
        flow="Observe → distinguish → weigh → decide"
        items={clinicalMethod}
      />
      <FieldNotes
        number="04"
        label="Working field"
        quote="“I don’t need to know everything. I need to know what to ask.”"
        list={fieldList}
      />
      <Contact kicker="Have a clinical question?" heading={<>Bring me the case.<br /><em>We’ll reason it through.</em></>} />
    </>
  )
}
