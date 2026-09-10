import { Link } from 'react-router-dom'
import { profile, about, services, method, skills } from '../data.js'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <p className="hero__eyebrow">{profile.title}</p>
        <h1 className="hero__title">Where reasoning becomes software.</h1>
        <p className="hero__description">{profile.tagline}</p>
        <blockquote className="hero__note">
          <p>
            I don't need to know everything. I need to know what to ask—and how
            to turn the answer into something real.
          </p>
          <p>
            I may not know every answer, but I know a very capable friend who
            helps me find them: AI.
          </p>
        </blockquote>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/projects">
            View work
          </Link>
          <a className="btn" href={`mailto:${profile.email}`}>
            Get in touch
          </a>
        </div>
      </div>
      <div className="hero__photo-frame">
        <img
          className="hero__photo"
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
        />
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <h2 className="section__title">About</h2>
      <div className="about">
        <div className="about__text">
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <ul className="skills">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <h2 className="section__title">What I build</h2>
      <ol className="services">
        {services.map((s, i) => (
          <li key={s.title} className="services__item">
            <span className="services__num">{i + 1}</span>
            <div>
              <h3 className="services__title">{s.title}</h3>
              <p className="services__body">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Method() {
  return (
    <section id="method" className="section">
      <h2 className="section__title">Medicine in the code</h2>
      <p className="method__lead">
        I'm a physician as well as a vibe coder, and the clinical way of
        reasoning is the main thing I bring to building software.
      </p>
      <div className="method__grid">
        {method.map((m) => (
          <article key={m.title} className="method__item">
            <h3 className="method__title">{m.title}</h3>
            <p className="method__body">{m.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectsTeaser() {
  return (
    <section id="projects" className="section">
      <h2 className="section__title">Projects</h2>
      <p className="method__lead">
        Websites, web apps, and Android apps — with a live in-browser demo you
        can actually tap through.
      </p>
      <Link className="btn btn--primary" to="/projects">
        Open the projects page →
      </Link>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section__title">Contact</h2>
      <p className="contact__lead">
        Open to interesting work. The fastest way to reach me is email.
      </p>
      <div className="contact__links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={profile.resume} target="_blank" rel="noreferrer">
          Résumé (PDF)
        </a>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Method />
      <ProjectsTeaser />
      <Contact />
    </>
  )
}
