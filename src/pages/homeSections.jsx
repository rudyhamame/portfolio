import { Link } from 'react-router-dom'
import { profile, education } from '../data.js'
import { projectCaseStudies } from '../projectCaseStudies.js'

export function Arrow() {
  return <span aria-hidden="true">↗</span>
}

// Hero shared by both character pages; `content` carries the character's voice.
export function Hero({ content }) {
  return (
    <section id="top" className={`home-hero${content.long ? ' home-hero--long' : ''}`}>
      <div className="home-hero__index" aria-hidden="true">
        <span>{content.index}</span>
        <span>Toronto / CA</span>
      </div>

      <div className="home-hero__statement">
        <p className="kicker">{content.kicker}</p>
        <h1>{content.headline}</h1>
        <p className="home-hero__lede">{content.lede}</p>
        <div className="home-hero__actions">
          <Link className="action-link action-link--solid" to={content.primary.to}>
            {content.primary.label} <Arrow />
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
          <span>{content.caption}</span>
        </figcaption>
      </figure>

      <div className="home-hero__principle">
        <span className="home-hero__principle-mark">{content.principle.mark}</span>
        <p><strong>{content.principle.strong}</strong> {content.principle.body}</p>
      </div>
    </section>
  )
}

export function Practice({ number, label, heading, paragraphs, tags }) {
  return (
    <section id="about" className="home-section practice">
      <header className="home-section__head"><span>{number}</span><p>{label}</p></header>
      <div className="practice__body">
        <h2>{heading}</h2>
        <div className="practice__copy">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
      <div className="practice__disciplines" aria-label="Disciplines">
        {tags.map((tag, index) => (
          <div key={tag}><span>0{index + 1}</span><strong>{tag}</strong></div>
        ))}
      </div>
    </section>
  )
}

export function WorkIndex({ number, label, heading, intro }) {
  return (
    <section id="projects" className="home-section work-index">
      <header className="home-section__head"><span>{number}</span><p>{label}</p></header>
      <div className="work-index__intro">
        <h2>{heading}</h2>
        <p>{intro}</p>
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

export function Education({ number }) {
  return (
    <section id="education" className="home-section education">
      <header className="home-section__head"><span>{number}</span><p>Medical certificate</p></header>
      <article className="education__credential">
        <div className="education__mark">
          <img src={education.logo} alt="Latakia University emblem" />
        </div>
        <div className="education__identity">
          <span>Degree / MD</span>
          <h2>{education.degree}</h2>
          <p>{education.faculty}</p>
        </div>
        <dl className="education__details">
          <div><dt>Institution</dt><dd>{education.university}<small>({education.formerName})</small></dd></div>
          <div><dt>Place</dt><dd>{education.location}</dd></div>
          <div><dt>Period</dt><dd>{education.dates}</dd></div>
        </dl>
      </article>
    </section>
  )
}

export function Method({ number, label, lead, flow, items }) {
  return (
    <section id="method" className="home-section reasoning">
      <header className="home-section__head"><span>{number}</span><p>{label}</p></header>
      <div className="reasoning__lead"><p>{lead}</p><span>{flow}</span></div>
      <div className="reasoning__grid">
        {items.map((item, index) => (
          <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.body}</p></article>
        ))}
      </div>
    </section>
  )
}

export function FieldNotes({ number, label, quote, list }) {
  return (
    <section className="home-section field-notes">
      <header className="home-section__head"><span>{number}</span><p>{label}</p></header>
      <div className="field-notes__layout">
        <blockquote>{quote}</blockquote>
        <ul>{list.map((entry) => <li key={entry}>{entry}</li>)}</ul>
      </div>
    </section>
  )
}

export function Contact({ kicker, heading }) {
  return (
    <section id="contact" className="home-contact">
      <p className="kicker">{kicker}</p>
      <h2>{heading}</h2>
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
