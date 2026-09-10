import { useEffect, useRef, useState } from 'react'
import ChatBot from './ChatBot.jsx'
import { assistantDirections, publicAssistantStandard } from '../assistantPolicy.js'

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [responseDirection, setResponseDirection] = useState('evidence')
  const [projectGoal, setProjectGoal] = useState('')
  const [goalDraft, setGoalDraft] = useState('')
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const frame = window.requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector('.floating-assistant__goal-input, .chat__input')
        ?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [open, projectGoal])

  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const startChat = (event) => {
    event.preventDefault()
    const goal = goalDraft.trim()
    if (goal.length < 20) return
    setProjectGoal(goal)
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
        <section className="floating-assistant__standard" aria-labelledby="ai-standard-title">
          <div className="floating-assistant__standard-title" id="ai-standard-title">
            <span aria-hidden="true">✓</span>
            Strict, non-biased AI
          </div>
          <p className="floating-assistant__standard-intro">
            Every reply is governed by this visible instruction:
          </p>
          <p>{publicAssistantStandard}</p>
          <a
            href="https://github.com/rudyhamame/portfolio/blob/main/src/assistantPolicy.js"
            target="_blank"
            rel="noreferrer"
          >
            Verify the enforced policy on GitHub ↗
          </a>
        </section>
        {!projectGoal ? (
          <form className="floating-assistant__goal-form" onSubmit={startChat}>
            <label htmlFor="portfolio-project-goal">Project goal (required)</label>
            <p>
              Like a chief complaint, this goal becomes the umbrella for the entire chat.
            </p>
            <textarea
              id="portfolio-project-goal"
              className="floating-assistant__goal-input"
              value={goalDraft}
              onChange={(event) => setGoalDraft(event.target.value)}
              placeholder="Example: I need a secure clinical web app that structures patient evidence without overwriting the source record."
              minLength={20}
              maxLength={1200}
              rows={4}
              required
            />
            <div className="floating-assistant__goal-actions">
              <span>{goalDraft.trim().length}/1200</span>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={goalDraft.trim().length < 20}
              >
                Start goal-directed chat
              </button>
            </div>
          </form>
        ) : (
          <>
            <section className="floating-assistant__active-goal" aria-label="Active project goal">
              <div>
                <span>Project goal</span>
                <p>{projectGoal}</p>
              </div>
              <button type="button" onClick={() => setProjectGoal('')}>Change</button>
            </section>
            <label className="floating-assistant__direction">
              <span>Direct the next non-biased reply</span>
              <select
                value={responseDirection}
                onChange={(event) => setResponseDirection(event.target.value)}
              >
                {Object.entries(assistantDirections).map(([value, direction]) => (
                  <option key={value} value={value}>{direction.label}</option>
                ))}
              </select>
            </label>
            <ChatBot
              key={projectGoal}
              publicMode
              title=""
              projectGoal={projectGoal}
              responseDirection={responseDirection}
            />
          </>
        )}
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
