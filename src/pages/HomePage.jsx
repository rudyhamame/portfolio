import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { profile, about, method, skills } from '../data.js'
import { projectCaseStudies } from '../projectCaseStudies.js'

const disciplines = ['Medicine', 'Ontology', 'Product', 'Engineering']

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function Hero() {
  return (
    <section id="top" className="home-hero">
      <div className="home-hero__index" aria-hidden="true">
        <span>Portfolio / 2026</span>
        <span>Toronto / CA</span>
      </div>

      <div className="home-hero__statement">
        <p className="kicker">Physician · Systems builder</p>
        <h1>I build software that <em>knows what it is.</em></h1>
        <p className="home-hero__lede">
          Clinical reasoning, original ontologies, and full-stack products—built
          as one practice of making complex reality legible.
        </p>
        <div className="home-hero__actions">
          <Link className="action-link action-link--solid" to="/projects/rabbithole">
            Enter the work <Arrow />
          </Link>
          <a className="action-link" href={`mailto:${profile.email}`}>
            Start a conversation
          </a>
        </div>
      </div>

      <figure className="home-portrait">
        <div className="home-portrait__crop">
          <img src={profile.photo} alt={`Portrait of ${profile.name}`} />
        </div>
        <figcaption>
          <span>Rudy Hamame</span>
          <span>Physician / Builder</span>
        </figcaption>
      </figure>

      <div className="home-hero__principle">
        <span className="home-hero__principle-mark">R =</span>
        <p><strong>Reality before schema.</strong> Define the entity, preserve the evidence, then build the system around what is true.</p>
      </div>
    </section>
  )
}

function Practice() {
  return (
    <section id="about" className="home-section practice">
      <header className="home-section__head"><span>01</span><p>The practice</p></header>
      <div className="practice__body">
        <h2>Medicine taught me to reason. Software gave the reasoning form.</h2>
        <div className="practice__copy">
          {about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <div className="practice__disciplines" aria-label="Disciplines">
        {disciplines.map((discipline, index) => (
          <div key={discipline}><span>0{index + 1}</span><strong>{discipline}</strong></div>
        ))}
      </div>
    </section>
  )
}

function WorkIndex() {
  return (
    <section id="projects" className="home-section work-index">
      <header className="home-section__head"><span>02</span><p>Selected systems</p></header>
      <div className="work-index__intro">
        <h2>Five products.<br />One way of seeing.</h2>
        <p>Each project begins by deciding what exists, how it relates, and what must remain invariant. The interface comes after.</p>
      </div>
      <div className="work-index__list">
        {projectCaseStudies.tabs.map((project) => (
          <Link className={`work-row${project.featured ? ' work-row--featured' : ''}`} key={project.id} to={`/projects/${project.id}`} style={{ '--project-color': project.color }}>
            <span className="work-row__number">{project.index}</span>
            <span className="work-row__glyph" aria-hidden="true">{project.glyph}</span>
            <span className="work-row__identity"><strong>{project.heading}</strong><small>{project.category}</small></span>
            <span className="work-row__thesis">{project.thesis}</span>
            <Arrow />
          </Link>
        ))}
      </div>
    </section>
  )
}

function Method() {
  return (
    <section id="method" className="home-section reasoning">
      <header className="home-section__head"><span>03</span><p>How I think</p></header>
      <div className="reasoning__lead"><p>Clinical habits, translated into product architecture.</p><span>Observe → distinguish → model → test</span></div>
      <div className="reasoning__grid">
        {method.map((item, index) => (
          <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>
        ))}
      </div>
    </section>
  )
}

function FieldNotes() {
  return (
    <section className="home-section field-notes">
      <header className="home-section__head"><span>04</span><p>Working field</p></header>
      <div className="field-notes__layout">
        <blockquote>“I don’t need to know everything. I need to know what to ask—and how to turn the answer into something real.”</blockquote>
        <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="home-contact">
      <p className="kicker">Have a difficult system?</p>
      <h2>Bring me the reality.<br /><em>We’ll find its form.</em></h2>
      <a className="home-contact__email" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a>
      <div className="home-contact__links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
        {profile.linkedin && !profile.linkedin.includes('your-handle') && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
        )}
        <a href={profile.resume} target="_blank" rel="noreferrer">Résumé <Arrow /></a>
        <Link to="/portal">Client portal <Arrow /></Link>
      </div>
    </section>
  )
}

export default function HomePage() {
  useEffect(() => {
    document.title = 'Rudy Hamame — Physician & Systems Builder'
    const canonicalUrl = 'https://portfolio.mctoshs.ca/'
    const canonical = document.querySelector('link[rel="canonical"]')
    const openGraphUrl = document.querySelector('meta[property="og:url"]')
    if (canonical) canonical.href = canonicalUrl
    if (openGraphUrl) openGraphUrl.content = canonicalUrl
  }, [])

  return <><Hero /><Practice /><WorkIndex /><Method /><FieldNotes /><Contact /></>
}
