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
    attributes: ['Clinical reasoning', 'Differential diagnosis', 'Names the uncertainty', 'Patient formulation'],
    signature: 'Differential diagnosis',
    glyph: (
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M4 34h14l6-16 10 30 8-22 4 8h14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M32 4v8M28 8h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
    ),
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
    glyph: (
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M24 44c0-6-8-9-8-19a16 16 0 0 1 32 0c0 10-8 13-8 19zM25 52h14M28 58h8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M32 4v4M9 12l3 3M55 12l-3 3M2 26h4M58 26h4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
    ),
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
        <p className="character-select__sub">Modelling patients. Modelling ideas.</p>
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
