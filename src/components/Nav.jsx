import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data.js'

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')

// The links follow the mindset page being viewed.
const pages = {
  physician: {
    label: 'Physician',
    links: [
      { id: 'about', label: 'Practice' },
      { id: 'education', label: 'Certificate' },
      { id: 'method', label: 'Reasoning' },
      { id: 'contact', label: 'Contact' },
    ],
  },
  softwareEngineer: {
    label: 'AI-assisted software engineer',
    links: [
      { id: 'projects', label: 'Work' },
      { id: 'about', label: 'Practice' },
      { id: 'method', label: 'Thinking' },
      { id: 'contact', label: 'Contact' },
    ],
  },
}

export default function Nav() {
  const { pathname, hash } = useLocation()
  const key = pathname.startsWith('/physician') ? 'physician' : pathname.startsWith('/software-engineer') ? 'softwareEngineer' : ''
  const page = pages[key]
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // Close the menu whenever the route or hash changes.
  useEffect(() => { setOpen(false) }, [pathname, hash])

  // Highlight the section currently in view.
  useEffect(() => {
    setActive('')
    if (!page) return undefined
    const targets = page.links.map((link) => document.getElementById(link.id)).filter(Boolean)
    if (!targets.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [page, pathname])

  return (
    <header className="snav" data-open={open}>
      <div className="snav__bar">
        <Link to="/" className="snav__brand" aria-label={`${profile.name} — home`}>
          <span className="snav__mark" aria-hidden="true">{initials}</span>
          <span className="snav__id">
            <strong>{profile.name}</strong>
            <small>{page ? page.label : 'Portfolio'}</small>
          </span>
        </Link>

        <button
          type="button"
          className="snav__toggle"
          aria-expanded={open}
          aria-controls="snav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" />
        </button>

        <nav className="snav__links" id="snav-menu" aria-label="Main navigation">
          {page ? (
            page.links.map((link) => (
              <a
                key={link.id}
                href={`/${key}#${link.id}`}
                className={`snav__link${active === link.id ? ' is-active' : ''}`}
                aria-current={active === link.id ? 'location' : undefined}
              >
                {link.label}
              </a>
            ))
          ) : (
            <>
              <Link className="snav__link" to="/physician">Physician</Link>
              <Link className="snav__link" to="/software-engineer">AI-assisted software engineer</Link>
            </>
          )}
          <Link className="snav__cta" to="/portal">Client portal</Link>
        </nav>
      </div>
    </header>
  )
}
