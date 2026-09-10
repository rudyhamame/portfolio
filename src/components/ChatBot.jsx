import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { api } from '../lib/api.js'

// Scoped chat. Pass requestId to talk about one project; omit for the general
// "scope my idea / ask about services" bot.
export default function ChatBot({
  requestId,
  title = 'Ask the assistant',
  publicMode = false,
  responseDirection = 'evidence',
}) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    if (publicMode) {
      setMessages([])
      return
    }
    const q = requestId ? `?requestId=${requestId}` : ''
    api(`/api/chat${q}`)
      .then(setMessages)
      .catch(() => {})
  }, [requestId, publicMode])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy])

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || busy) return
    setInput('')
    setError('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setBusy(true)
    try {
      const { reply } = await api(publicMode ? '/api/assistant' : '/api/chat', {
        method: 'POST',
        body: publicMode
          ? { message: text, history: messages.slice(-12), responseDirection }
          : { message: text, requestId },
      })
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="chat">
      <h3 className="chat__title">{title}</h3>
      <div className="chat__log">
        {messages.length === 0 && (
          <p className="chat__hint">
            {publicMode
              ? 'Ask about Rudy’s background, projects, technical decisions, services, or whether his experience fits your idea.'
              : requestId
              ? 'Ask about this project’s status or next steps.'
              : 'Describe your idea, or ask what Rudy builds and how the process works.'}
          </p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat__msg chat__msg--${m.role}`}>
            {m.role === 'assistant' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  a: ({ children, ...props }) => (
                    <a {...props} target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {m.content}
              </ReactMarkdown>
            ) : (
              m.content
            )}
          </div>
        ))}
        {busy && <div className="chat__msg chat__msg--assistant chat__msg--typing">…</div>}
        <div ref={endRef} />
      </div>
      {error && <p className="chat__error">{error}</p>}
      <form className="chat__form" onSubmit={send}>
        <input
          className="chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={publicMode ? 'Ask about Rudy’s work…' : 'Type a message'}
          maxLength={5000}
          disabled={busy}
        />
        <button className="btn btn--primary" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}
