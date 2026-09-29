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
        <p className="kicker">Rudy Hamame · Toronto</p>
        <h1 id="character-select-title">One character.<br />Two mindsets.</h1>
        <p className="character-select__sub">Modelling representations and implementing them on</p>
        <div className="character-select__destinations" aria-label="Implementing representations on patients and computers">
          <span className="character-select__destination"><span aria-hidden="true">↓</span><strong>Patients</strong></span>
          <span className="character-select__destination"><span aria-hidden="true">↓</span><strong>Computers</strong></span>
        </div>
        <p className="character-select__pick">Pick the mindset you want to meet first.</p>
      </header>
      <div className="hybrid" role="note">
        <span className="hybrid__label">Hybrid model</span>
        <p className="hybrid__statement">
          Rudy is a hybrid model: <span className="hybrid__formula"><b>Human</b><i aria-hidden="true">+</i><b>AI</b></span>
        </p>
      </div>
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
    </section>
  )
}
