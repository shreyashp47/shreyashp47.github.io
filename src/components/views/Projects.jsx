import { projects } from '../../data/content'

export default function Projects() {
  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// build.gradle.kts : things I\'ve built & shipped'}</div>
        <h2>Projects</h2>
        <div style={{color: 'var(--dim)', fontSize: 12, marginTop: 4}}>
          <span style={{color: 'var(--orange)'}}>const</span> projects <span style={{color: 'var(--dim)'}}>=</span> [<span style={{color: 'var(--orange)'}}>...shipped</span>, <span style={{color: 'var(--green)'}}>...building</span>];
        </div>
      </div>
      <div className="project-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <div className="project-type">{p.type} &middot; {p.period}</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="project-tech">
              {p.tech.map((t) => <span key={t}>{t}</span>)}
            </div>
            <div className="project-links">
              <a href={p.github} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github" /> Source
              </a>
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer">
                  <i className="fa-solid fa-arrow-up-right-from-square" /> Live
                </a>
              )}
              {p.playStore && (
                <a href={p.playStore} target="_blank" rel="noopener noreferrer">
                  <i className="fa-brands fa-google-play" /> Play Store
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
