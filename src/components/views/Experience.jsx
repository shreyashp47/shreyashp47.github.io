import { experience } from '../../data/content'

export default function Experience() {
  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// experience.kt - professional journey'}</div>
        <h2>Experience</h2>
        <div style={{color: 'var(--dim)', fontSize: 12, marginTop: 4}}>
          <span style={{color: 'var(--blue)'}}>interface</span> Career <span style={{color: 'var(--blue)'}}>extends</span> Timeline {'{}'}
        </div>
      </div>
      <div className="timeline">
        {experience.map((exp, i) => (
          <div className="timeline-item" key={i}>
            <div className="timeline-dot" />
            <div className="timeline-date">{exp.period}</div>
            <div className="timeline-title">{exp.role}</div>
            <div className="timeline-company">{exp.company} &middot; {exp.location}</div>
            <div className="timeline-desc">{exp.description}</div>
            <div className="timeline-tags">
              {exp.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
