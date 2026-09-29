import { Link } from 'react-router-dom'
import { profile, education } from '../data.js'
import { projectCaseStudies } from '../projectCaseStudies.js'

export function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function CpuArtwork() {
  return (
    <div className="cpu-art" role="img" aria-label="A three dimensional processor with glowing circuit traces">
      <svg viewBox="0 0 520 560" aria-hidden="true">
        <defs>
          <linearGradient id="cpu-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff0b3"/><stop offset=".42" stopColor="#d9a83b"/><stop offset="1" stopColor="#805019"/></linearGradient>
          <linearGradient id="cpu-side" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b57b20"/><stop offset="1" stopColor="#382716"/></linearGradient>
          <linearGradient id="cpu-chip" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#344b42"/><stop offset="1" stopColor="#101916"/></linearGradient>
          <filter id="cpu-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="cpu-traces" fill="none" stroke="#d6a945" strokeOpacity=".44" strokeWidth="1.4">
          <path d="M260 112V55H150V34M260 112V72H366V44M194 150H102V107H62M326 150h98v-40h34M164 228H92v57H48M356 228h68v65h42M164 318H98v62H56M356 318h72v-60h40M206 384v48H122v49M314 384v52h98v42"/>
          <path d="M188 126V85h-52V60m196 66V88h58V65M142 258h-38v42H76m302-42h40v44h28M180 364v40h-36v38m192-78v41h45v34"/>
        </g>
        <g fill="#f3ca68" filter="url(#cpu-glow)"><circle cx="150" cy="34" r="3"/><circle cx="366" cy="44" r="3"/><circle cx="62" cy="107" r="3"/><circle cx="458" cy="110" r="3"/><circle cx="48" cy="285" r="3"/><circle cx="466" cy="293" r="3"/><circle cx="56" cy="380" r="3"/><circle cx="468" cy="258" r="3"/><circle cx="122" cy="481" r="3"/><circle cx="412" cy="478" r="3"/></g>
        <g className="cpu-core" strokeLinejoin="round">
          <path d="m164 170 96-55 96 55v171l-96 55-96-55z" fill="#120f0b" stroke="#f3ca68" strokeOpacity=".4" strokeWidth="2"/>
          <path d="m164 170 96 55v171l-96-55z" fill="url(#cpu-side)" stroke="#f4cf78" strokeOpacity=".6"/>
          <path d="m260 225 96-55v171l-96 55z" fill="#70501f" stroke="#ffe39a" strokeOpacity=".65"/>
          <path d="m164 170 96-55 96 55-96 55z" fill="url(#cpu-top)" stroke="#fff0b3" strokeWidth="2"/>
          <path d="m190 174 70-40 70 40-70 41z" fill="#63491f" stroke="#fff0b3" strokeOpacity=".78"/>
          <path d="m199 174 61-35 61 35-61 35z" fill="url(#cpu-chip)" stroke="#dbb655" strokeWidth="2"/>
          <path d="m213 174 47-27 47 27-47 27z" fill="#202d27" stroke="#87ba8d" strokeOpacity=".8"/>
          <path d="m260 153 32 19-32 19-32-19z" fill="#bdd992" fillOpacity=".88"/>
          <text x="260" y="253" fill="#fff0b3" stroke="none" textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace" letterSpacing="3" transform="rotate(-30 260 253)">THINK / BUILD</text>
          <path d="m180 341 12 7v18l-12-7zm31 18 12 7v18l-12-7zm31 18 12 7v18l-12-7zm73-36 12-7v18l-12 7zm-31 18 12-7v18l-12 7zm-31 18 12-7v18l-12 7z" fill="#f2c75d" stroke="#fff0b3" strokeOpacity=".65"/>
          <path d="m164 195-21-12m21 46-21-12m21 46-21-12m21 46-21-12m21 46-21-12m234-82 21-12m-21 46 21-12m-21 46 21-12m-21 46 21-12m-21 46 21-12" stroke="#f3ca68" strokeWidth="5"/>
        </g>
        <circle className="cpu-orbit" cx="260" cy="270" r="190" fill="none" stroke="#f3ca68" strokeOpacity=".14" strokeDasharray="2 11"/>
      </svg>
    </div>
  )
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

      <figure className={`home-portrait${content.visual === 'cpu' ? ' home-portrait--cpu' : ''}`}>
        {content.visual === 'cpu' ? <CpuArtwork /> : <div className="home-portrait__crop"><img src={profile.photo} alt={`Portrait of ${profile.name}`} /></div>}
        <figcaption><span>{content.visual === 'cpu' ? 'Core / 01' : 'Rudy Hamame'}</span><span>{content.caption}</span></figcaption>
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
