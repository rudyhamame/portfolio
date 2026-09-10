import { Link } from 'react-router-dom'
import { profile } from '../data.js'

const initials = profile.name
  .split(' ')
  .map((w) => w[0])
  .join('')

export default function Nav() {
  return (
    <header className="nav">
      <Link to="/" className="nav__brand" aria-label={profile.name}>
        <span className="nav__mark" aria-hidden="true">
          {initials}
        </span>
        <span className="nav__name">{profile.name}</span>
      </Link>
      <nav className="nav__links" aria-label="Main navigation">
        <a href="/#about">About</a>
        <a href="/#services">Build</a>
        <a href="/#method">Method</a>
        <Link to="/projects">Projects</Link>
        <a href="/#contact">Contact</a>
        <Link to="/portal">Client portal</Link>
      </nav>
    </header>
  )
}
