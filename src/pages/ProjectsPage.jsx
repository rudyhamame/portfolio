import { useEffect } from 'react'
import { Link, Navigate, NavLink, useParams } from 'react-router-dom'
import { projectCaseStudies } from '../projectCaseStudies.js'

const { tabs } = projectCaseStudies

function OntologyPanel({ tab }) {
  return (
    <section className="ontology" aria-labelledby={`${tab.id}-ontology-title`}>
      <div className="ontology__legend">
        <span>Ontological model / 01</span>
        <p id={`${tab.id}-ontology-title`}>What exists in this system?</p>
      </div>
      <div className="ontology__field">
        <div className="ontology__orbit" aria-hidden="true" />
        <div className="ontology__core">
          <span>ESSENCE</span>
          <strong>{tab.ontology.essence}</strong>
        </div>
        {tab.ontology.entities.map((entity, index) => (
          <div className={`ontology__entity ontology__entity--${index + 1}`} key={entity}>
            <span>E{index + 1}</span>
            <strong>{entity}</strong>
          </div>
        ))}
      </div>
      <p className="ontology__relation"><span>RELATION</span>{tab.ontology.relation}</p>
    </section>
  )
}

function CaseHero({ tab }) {
  return (
    <header className="case-hero">
      <div className="case-hero__meta">
        <span>{tab.index} / 05</span>
        <span>{tab.category}</span>
      </div>
      <div className="case-hero__title">
        <span aria-hidden="true">{tab.glyph}</span>
        <h1>{tab.heading}</h1>
      </div>
      <div className="case-hero__body">
        <p className="case-hero__tagline">{tab.tagline}</p>
        <p className="case-hero__summary">{tab.summary}</p>
      </div>
      <blockquote><span>Product thesis</span>{tab.thesis}</blockquote>
    </header>
  )
}

function Facts({ tab }) {
  return (
    <dl className="case-facts">
      {[
        ['Role', tab.role],
        ['For', tab.audience],
        ['Surfaces', tab.surfaces],
      ].map(([label, value]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  )
}

function Capabilities({ tab }) {
  return (
    <section className="case-section">
      <header><span>02</span><p>System behavior</p><h2>What it makes possible</h2></header>
      <div className="case-capabilities">
        {tab.capabilities.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Architecture({ tab }) {
  return (
    <section className="case-section case-section--architecture">
      <header><span>03</span><p>Material form</p><h2>How the idea becomes infrastructure</h2></header>
      <ol className="case-architecture">
        {tab.architecture.map(([layer, detail], index) => (
          <li key={layer}><span>{String(index + 1).padStart(2, '0')}</span><strong>{layer}</strong><p>{detail}</p></li>
        ))}
      </ol>
    </section>
  )
}

function Significance({ tab }) {
  return (
    <section className="case-significance">
      <div><span>04 / Significance</span><h2>Why this work matters.</h2></div>
      <ul>{tab.value.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  )
}

function ProjectNav() {
  return (
    <nav className="case-nav" aria-label="Project case studies">
      {tabs.map((tab) => (
        <NavLink key={tab.id} to={`/projects/${tab.id}`} style={{ '--project-color': tab.color }}>
          <span>{tab.index}</span><strong>{tab.heading}</strong><i aria-hidden="true">{tab.glyph}</i>
        </NavLink>
      ))}
    </nav>
  )
}

function NextProject({ tab }) {
  const currentIndex = tabs.findIndex((item) => item.id === tab.id)
  const next = tabs[(currentIndex + 1) % tabs.length]
  return (
    <Link className="next-project" to={`/projects/${next.id}`} style={{ '--next-color': next.color }}>
      <span>Next system / {next.index}</span><strong>{next.heading}</strong><i aria-hidden="true">{next.glyph}</i>
    </Link>
  )
}

export default function ProjectsPage() {
  const { tab: tabId } = useParams()
  const active = tabs.find((tab) => tab.id === tabId)

  useEffect(() => {
    if (!active) return
    const canonicalUrl = `https://portfolio.mctoshs.ca/projects/${active.id}`
    document.title = `${active.heading} — Rudy Hamame`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
    let openGraphUrl = document.querySelector('meta[property="og:url"]')
    if (!openGraphUrl) {
      openGraphUrl = document.createElement('meta')
      openGraphUrl.setAttribute('property', 'og:url')
      document.head.appendChild(openGraphUrl)
    }
    openGraphUrl.content = canonicalUrl
  }, [active])

  if (!active) return <Navigate to={`/projects/${tabs[0].id}`} replace />

  return (
    <section className="projects-experience" style={{ '--case-color': active.color }}>
      <div className="projects-experience__intro">
        <Link to="/" aria-label="Back home">← Index</Link>
        <p>{projectCaseStudies.eyebrow}</p>
        <span>{projectCaseStudies.intro}</span>
      </div>
      <ProjectNav />
      <article className="case-study">
        <CaseHero tab={active} />
        <Facts tab={active} />
        <OntologyPanel tab={active} />
        <Capabilities tab={active} />
        <Architecture tab={active} />
        <Significance tab={active} />
        <div className="case-tags">{tabTags(active)}</div>
        <NextProject tab={active} />
      </article>
    </section>
  )
}

function tabTags(tab) {
  return tab.tags.map((tag) => <span key={tag}>{tag}</span>)
}
