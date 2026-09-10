import { Navigate, NavLink, useParams } from 'react-router-dom'
import { projectCaseStudies } from '../projectCaseStudies.js'
import AndroidEmulator from '../components/AndroidEmulator.jsx'

const { tabs } = projectCaseStudies

function AuditHeader({ tab }) {
  return (
    <header className={`project-audit__hero${tab.featured ? ' project-audit__hero--featured' : ''}`}>
      <div className="project-audit__hero-copy">
        <p className="project-audit__category">{tab.category}</p>
        <h2 className="project-audit__heading">{tab.heading}</h2>
        <p className="project-audit__tagline">{tab.tagline}</p>
        <p className="project-audit__summary">{tab.summary}</p>
      </div>

      <aside className="project-audit__thesis" aria-label="Project thesis">
        <span>Product thesis</span>
        <p>{tab.thesis}</p>
      </aside>
    </header>
  )
}

function Fact({ label, children }) {
  return (
    <div className="project-audit__fact">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

function ProjectAudit({ tab }) {
  return (
    <article className="project-audit" aria-labelledby={`${tab.id}-heading`}>
      <AuditHeader tab={tab} />

      <dl className="project-audit__facts" aria-label="Project overview">
        <Fact label="My role">{tab.role}</Fact>
        <Fact label="Built for">{tab.audience}</Fact>
        <Fact label="Product surfaces">{tab.surfaces}</Fact>
      </dl>

      <section className="project-audit__section" aria-labelledby={`${tab.id}-heading`}>
        <div className="project-audit__section-head">
          <span>01</span>
          <div>
            <p>Product audit</p>
            <h3 id={`${tab.id}-heading`}>What the system does</h3>
          </div>
        </div>
        <div className="project-audit__capabilities">
          {tab.capabilities.map(([title, body], index) => (
            <article className="project-audit__capability" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-audit__section">
        <div className="project-audit__section-head">
          <span>02</span>
          <div>
            <p>Technical audit</p>
            <h3>How it is built</h3>
          </div>
        </div>
        <ol className="project-audit__architecture">
          {tab.architecture.map(([layer, detail]) => (
            <li key={layer}>
              <strong>{layer}</strong>
              <p>{detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="project-audit__closing">
        <div>
          <p className="project-audit__closing-label">Why it matters</p>
          <h3>The value beyond the feature list.</h3>
        </div>
        <ul>
          {tab.value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <div className="project-audit__tags" aria-label="Technology used">
        {tab.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      {tab.android && (
        <section className="project-audit__demo" aria-labelledby="android-demo-title">
          <div className="project-audit__section-head">
            <span>03</span>
            <div>
              <p>Live artifact</p>
              <h3 id="android-demo-title">Open the Android client</h3>
            </div>
          </div>
          <AndroidEmulator android={tab.android} />
        </section>
      )}
    </article>
  )
}

export default function ProjectsPage() {
  const { tab: tabId } = useParams()
  const active = tabs.find((tab) => tab.id === tabId)

  if (!active) return <Navigate to={`/projects/${tabs[0].id}`} replace />

  return (
    <section className="section projects-page">
      <header className="projects-page__intro">
        <p>{projectCaseStudies.eyebrow}</p>
        <h1>{projectCaseStudies.title}</h1>
        <div>
          <span>01 — 05</span>
          <p>{projectCaseStudies.intro}</p>
        </div>
      </header>

      <nav className="project-tabs" aria-label="Project case studies">
        <div className="project-tabs__track">
          {tabs.map((tab) => (
            <NavLink
              key={tab.id}
              to={`/projects/${tab.id}`}
              className={({ isActive }) =>
                `project-tabs__tab${isActive ? ' project-tabs__tab--active' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{tab.index}</span>
                  <strong>{tab.label}</strong>
                  <i aria-hidden="true">{isActive ? '↓' : '→'}</i>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <ProjectAudit tab={active} />
    </section>
  )
}
