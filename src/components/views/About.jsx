import { personal, bio, focusAreas, education, social, certifications, awards } from '../../data/content'

export default function About() {
  return (
    <div>
      <div className="view-header">
        <div className="filename">{'<!-- about.xml - ' + personal.name + ' -->'}</div>
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          {bio.split('\n\n').map((p, i) => (
            <p key={i}>
              {p.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
                part.startsWith('**') && part.endsWith('**')
                  ? <strong key={j} className="highlight">{part.slice(2, -2)}</strong>
                  : part
              )}
            </p>
          ))}
          <div className="focus-grid">
            {focusAreas.map((f) => (
              <div className="focus-card" key={f.title}>
                <h4><i className="fa-solid fa-circle" style={{fontSize: 8, color: 'var(--orange)', marginRight: 6}} />{f.title}</h4>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{fontSize: 14, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12}}>Education</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="education-table">
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Degree</th>
                  <th>Period</th>
                </tr>
              </thead>
              <tbody>
                {education.map((e, i) => (
                  <tr key={i}>
                    <td>{e.institution}<br /><span style={{color: 'var(--dim)', fontSize: 11}}>{e.location}</span></td>
                    <td>{e.degree}</td>
                    <td>{e.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 style={{fontSize: 14, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 12px'}}>Certifications</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20}}>
            {certifications.map((c, i) => (
              <div key={i} style={{fontSize: 12, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8}}>
                <i className="fa-solid fa-certificate" style={{color: 'var(--orange)', width: 16}} />
                {c.name} <span style={{color: 'var(--dim)'}}>&middot; {c.issuer}</span>
              </div>
            ))}
          </div>
          <h3 style={{fontSize: 14, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px'}}>Awards</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20}}>
            {awards.map((a, i) => (
              <div key={i} style={{fontSize: 12, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8}}>
                <i className="fa-solid fa-trophy" style={{color: 'var(--yellow)', width: 16}} />
                {a}
              </div>
            ))}
          </div>
          <h3 style={{fontSize: 14, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px'}}>Connect</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
            {social.slice(0, 4).map((s) => (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--dim)', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8}}>
                <i className={s.icon} style={{width: 16, color: 'var(--orange)'}} /> {s.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
