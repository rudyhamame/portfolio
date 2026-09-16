import { useEffect, useRef, useState } from 'react'
import ChatBot from './ChatBot.jsx'
import { assistantDirections, publicAssistantStandard } from '../assistantPolicy.js'
import { api } from '../lib/api.js'

export default function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const [responseDirection, setResponseDirection] = useState('evidence')
  const [projectGoal, setProjectGoal] = useState('')
  const [goalDraft, setGoalDraft] = useState('')
  const [goalBusy, setGoalBusy] = useState(false)
  const [goalError, setGoalError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contactBusy, setContactBusy] = useState(false)
  const [contactError, setContactError] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [codeBusy, setCodeBusy] = useState(false)
  const [codeError, setCodeError] = useState('')
  const [verificationToken, setVerificationToken] = useState('')

  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

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

  const sendCode = async (event) => {
    event.preventDefault()
    if (!name.trim() || !isValidEmail || contactBusy) return
    setContactBusy(true)
    setContactError('')
    try {
      await api('/api/assistant/verify/send', {
        method: 'POST',
        body: { name: name.trim(), email: email.trim() },
      })
      setCodeSent(true)
    } catch (error) {
      setContactError(error.message)
    } finally {
      setContactBusy(false)
    }
  }

  const confirmCode = async (event) => {
    event.preventDefault()
    if (code.trim().length !== 6 || codeBusy) return
    setCodeBusy(true)
    setCodeError('')
    try {
      const result = await api('/api/assistant/verify/confirm', {
        method: 'POST',
        body: { email: email.trim(), code: code.trim() },
      })
      setVerificationToken(result.verificationToken)
    } catch (error) {
      setCodeError(error.message)
    } finally {
      setCodeBusy(false)
    }
  }

  const startChat = async (event) => {
    event.preventDefault()
    const goal = goalDraft.trim()
    if (goal.length < 20 || goalBusy) return
    setGoalBusy(true)
    setGoalError('')
    try {
      const result = await api('/api/assistant/goal', {
        method: 'POST',
        body: { projectGoal: goal, verificationToken },
      })
      setProjectGoal(result.projectGoal)
    } catch (error) {
      setGoalError(error.message)
    } finally {
      setGoalBusy(false)
    }
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
        {!verificationToken ? (
          <div className="floating-assistant__screen floating-assistant__screen--prechat">
            <div className="floating-assistant__head">
              <div>
                <span className="floating-assistant__eyebrow">Portfolio AI</span>
                <h2>{codeSent ? 'Enter your verification code' : 'Introduce yourself'}</h2>
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
            {!codeSent ? (
              <form className="floating-assistant__goal-form" onSubmit={sendCode}>
                <label htmlFor="portfolio-contact-name">Name</label>
                <input
                  id="portfolio-contact-name"
                  className="floating-assistant__goal-input"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setContactError('')
                  }}
                  placeholder="Your name"
                  maxLength={200}
                  required
                />
                <label htmlFor="portfolio-contact-email">Email address</label>
                <input
                  id="portfolio-contact-email"
                  type="email"
                  className="floating-assistant__goal-input"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setContactError('')
                  }}
                  placeholder="you@example.com"
                  required
                />
                {contactError && <p className="floating-assistant__goal-error" role="alert">{contactError}</p>}
                <div className="floating-assistant__goal-actions">
                  <span>A code will be emailed to verify you.</span>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={!name.trim() || !isValidEmail || contactBusy}
                  >
                    {contactBusy ? 'Sending…' : 'Send code'}
                  </button>
                </div>
              </form>
            ) : (
              <form className="floating-assistant__goal-form" onSubmit={confirmCode}>
                <label htmlFor="portfolio-contact-code">6-digit code</label>
                <p>Sent to {email}.</p>
                <input
                  id="portfolio-contact-code"
                  className="floating-assistant__goal-input"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                    setCodeError('')
                  }}
                  placeholder="123456"
                  inputMode="numeric"
                  maxLength={6}
                  required
                />
                {codeError && <p className="floating-assistant__goal-error" role="alert">{codeError}</p>}
                <div className="floating-assistant__goal-actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      setCodeSent(false)
                      setCode('')
                      setCodeError('')
                    }}
                  >
                    Use a different email
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={code.trim().length !== 6 || codeBusy}
                  >
                    {codeBusy ? 'Verifying…' : 'Verify'}
                  </button>
                </div>
              </form>
            )}
            <p className="floating-assistant__notice">
              Portfolio information only—not medical advice or a binding estimate.
            </p>
          </div>
        ) : !projectGoal ? (
          <div className="floating-assistant__screen floating-assistant__screen--prechat">
            <div className="floating-assistant__head">
              <div>
                <span className="floating-assistant__eyebrow">Portfolio AI</span>
                <h2>Define your project goal</h2>
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
            <form className="floating-assistant__goal-form" onSubmit={startChat}>
              <label htmlFor="portfolio-project-goal">Project goal (required)</label>
              <p>
                Like a chief complaint, this goal becomes the umbrella for the entire chat.
              </p>
              <textarea
                id="portfolio-project-goal"
                className="floating-assistant__goal-input"
                value={goalDraft}
                onChange={(event) => {
                  setGoalDraft(event.target.value)
                  setGoalError('')
                }}
                placeholder="Example: I need a secure clinical web app that structures patient evidence without overwriting the source record."
                minLength={20}
                maxLength={1200}
                rows={4}
                required
              />
              {goalError && <p className="floating-assistant__goal-error" role="alert">{goalError}</p>}
              <div className="floating-assistant__goal-actions">
                <span>{goalDraft.trim().length}/1200</span>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={goalDraft.trim().length < 20 || goalBusy}
                >
                  {goalBusy ? 'Checking goal…' : 'Continue to chat'}
                </button>
              </div>
            </form>
            <p className="floating-assistant__notice">
              Portfolio information only—not medical advice or a binding estimate.
            </p>
          </div>
        ) : (
          <div className="floating-assistant__screen floating-assistant__screen--chat">
            <div className="floating-assistant__head">
              <div>
                <span className="floating-assistant__eyebrow">Portfolio AI</span>
                <h2>Goal-directed conversation</h2>
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
            <div className="floating-assistant__policy-status">
              <span>✓ Strict, non-biased standard active</span>
              <a
                href="https://github.com/rudyhamame/portfolio/blob/main/src/assistantPolicy.js"
                target="_blank"
                rel="noreferrer"
              >
                Verify ↗
              </a>
            </div>
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
            <p className="floating-assistant__notice">
              Portfolio information only—not medical advice or a binding estimate.
            </p>
          </div>
        )}
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
