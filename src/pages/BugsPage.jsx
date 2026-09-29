import { bugsLog } from '../bugsLog.js'
import { useCharacterPage } from '../lib/useCharacterPage.js'

export default function BugsPage() {
  useCharacterPage({ character: 'software-engineer', title: 'Rudy Hamame — Bugs fixed', path: '/software-engineer/bugs' })
  return (
    <section className="home-section bugs-log" aria-labelledby="bugs-log-title">
      <header className="home-section__head">
        <span>Mindset 02</span>
        <p id="bugs-log-title">Bugs fixed, across every program</p>
      </header>
      <div className="bugs-log__table-wrap">
        <table className="bugs-log__table">
          <thead>
            <tr>
              <th scope="col">Program</th>
              <th scope="col">Bug</th>
              <th scope="col">Root cause</th>
              <th scope="col">Fix</th>
            </tr>
          </thead>
          <tbody>
            {bugsLog.map((row) => (
              <tr key={`${row.program}-${row.bug}`}>
                <td data-label="Program">{row.program}</td>
                <td data-label="Bug">{row.bug}</td>
                <td data-label="Root cause">{row.cause}</td>
                <td data-label="Fix">{row.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
