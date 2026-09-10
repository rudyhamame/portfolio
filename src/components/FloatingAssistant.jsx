import { useEffect, useRef, useState } from 'react'
import ChatBot from './ChatBot.jsx'
import { assistantDirections, publicAssistantStandard } from '../assistantPolicy.js'

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [responseDirection, setResponseDirection] = useState('evidence')
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    panelRef.current?.querySelector('.chat__input')?.focus()

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div className="floating-assistant">
      <section
        id="portfolio-assistant-panel"
        ref={panelRef}
        className="floating-assistant__panel"
        role="dialog"
        aria-label="Rudy’s portfolio assistant"
        aria-hidden={!open}
        hidden={!open}
      >
        <div className="floating-assistant__head">
          <div>
            <span className="floating-assistant__eyebrow">Portfolio AI</span>
            <h2>Ask about my work</h2>
          </div>
          <button
            type="button"
            className="floating-assistant__close"
            aria-label="Close assistant"
            onClick={close}
          >
            ×
          </button>
        </div>
        <details className="floating-assistant__standard" open>
          <summary>Visible AI answering standard</summary>
          <p>{publicAssistantStandard}</p>
          <a
            href="https://github.com/rudyhamame/portfolio/blob/main/src/assistantPolicy.js"
            target="_blank"
            rel="noreferrer"
          >
            Verify the enforced policy on GitHub ↗
          </a>
        </details>
        <label className="floating-assistant__direction">
          <span>Direct the next reply</span>
          <select
            value={responseDirection}
            onChange={(event) => setResponseDirection(event.target.value)}
          >
            {Object.entries(assistantDirections).map(([value, direction]) => (
              <option key={value} value={value}>{direction.label}</option>
            ))}
          </select>
        </label>
        <ChatBot publicMode title="" responseDirection={responseDirection} />
        <p className="floating-assistant__notice">
          Portfolio information only—not medical advice or a binding estimate.
        </p>
      </section>

      <button
        ref={triggerRef}
        type="button"
        className="floating-assistant__trigger"
        aria-controls="portfolio-assistant-panel"
        aria-expanded={open}
        aria-label={open ? 'Close portfolio assistant' : 'Ask Rudy’s AI assistant'}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="floating-assistant__spark" aria-hidden="true">✦</span>
        <span>{open ? 'Close' : 'Ask AI'}</span>
      </button>
    </div>
  )
}
