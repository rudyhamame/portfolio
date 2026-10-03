import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCharacterPage } from '../lib/useCharacterPage.js'

// The first page: choose which Rudy to meet. Each card leads to its own page.
const characters = [
  {
    id: 'physician',
    to: '/physician',
    number: '01',
    role: 'Physician',
    models: 'Modelling patients',
    line: 'Reasons from evidence to the person in the room.',
    quote: <>I reason through the patient-in-mind <em>to reach the patient-in-reality.</em></>,
    attributes: ['Clinical reasoning', 'Differential diagnosis', 'Names the uncertainty', 'Patient formulation'],
    signature: 'Differential diagnosis',
    glyph: <img src="/physician-brain-3d.png" alt="" draggable="false" />,
  },
  {
    id: 'software-engineer',
    to: '/software-engineer',
    number: '02',
    role: 'AI-assisted software engineer',
    models: 'Modelling ideas',
    line: 'Builds software that knows what it is.',
    attributes: ['Full-stack products', 'Streaming and HLS', 'Android and Roku', 'AI pipelines'],
    signature: 'Reality before schema',
    glyph: <img src="/cpu-package-3d.png" alt="" draggable="false" />,
  },
]

export default function HomePage() {
  useCharacterPage({ character: '', title: 'Rudy Hamame — One character, two mindsets', path: '/' })
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const pick = characters.find((character) => character.number === event.key.padStart(2, '0'))
      if (pick) navigate(pick.to)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <section className="character-select" aria-labelledby="character-select-title">
      <header className="character-select__head">
        <p className="kicker">Rudy Hamame · Hybrid Model</p>
        <h1 id="character-select-title">Rudy is a hybrid character<br />of HUMAN and AI model</h1>
        <p className="character-select__sub">modelling representations and implementing them on</p>
        <p className="character-select__destinations"><strong>Patients</strong><span>and</span><strong>Computers</strong></p>
        <p className="character-select__pick">Pick the mindset you want to meet first.</p>
      </header>
      <div className="character-select__grid">
        {characters.map((character) => (
          <Link key={character.id} to={character.to} className={`character-card character-card--${character.id}`}>
            <span className="character-card__number">Mindset {character.number}</span>
            <span className="character-card__glyph">{character.glyph}</span>
            <strong className="character-card__role">{character.role}</strong>
            <span className="character-card__model">{character.models}</span>
            <span className="character-card__line">{character.line}</span>
            {character.quote && <span className="character-card__quote">{character.quote}</span>}
            <ul className="character-card__attributes" aria-label="Attributes">
              {character.attributes.map((attribute) => <li key={attribute}>{attribute}</li>)}
            </ul>
            <span className="character-card__signature"><small>Signature</small>{character.signature}</span>
            <span className="character-card__enter">Choose <span aria-hidden="true">→</span><kbd>{Number(character.number)}</kbd></span>
          </Link>
        ))}
      </div>
      <div className="mindset-integration">
        <div className="mindset-integration__bridge" aria-hidden="true">
          <span /><span />
        </div>
        <Link to="/projects/rabbithole" className="rabbithole-card" aria-labelledby="rabbithole-card-title">
          <div className="rabbithole-card__body">
            <p className="rabbithole-card__origin"><span>Mindset 01</span><b aria-hidden="true">+</b><span>Mindset 02</span><b aria-hidden="true">→</b><strong>One integrated project</strong></p>
            <h2 id="rabbithole-card-title">RabbitHole</h2>
            <p className="rabbithole-card__thesis">Where clinical reasoning and software engineering become one system.</p>
            <p className="rabbithole-card__description">RabbitHole results from the integration of both mindsets: the physician models patient reality, evidence, and uncertainty; the software engineer turns that model into a working clinical reasoning environment.</p>
            <ul className="rabbithole-card__attributes" aria-label="RabbitHole disciplines">
              <li>Clinical reasoning</li><li>Original ontology</li><li>Full-stack engineering</li><li>AI pipelines</li>
            </ul>
            <span className="rabbithole-card__enter">Explore RabbitHole <span aria-hidden="true">↗</span></span>
          </div>
          <div className="rabbithole-card__art" aria-hidden="true">
            <img src="/rabbithole-logo.png" alt="" loading="lazy" decoding="async" />
            <span>Medicine × Engineering</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
