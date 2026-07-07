import { personal, focusAreas, skillTags, social } from '../../data/content'

export default function Readme() {
  return (
    <div className="readme-content">
      <h1><span style={{color: 'var(--orange)'}}>#</span> {personal.name} — Portfolio</h1>

      <h2>About</h2>
      <p>
        Android & iOS developer working at <strong>Cognizant</strong>, passionate about building 
        mobile apps and exploring the world of LLMs, AI agents, and MCP servers. 
        I work with Kotlin, Swift, and Python to bring ideas to life.
      </p>

      <h2>Stack</h2>
      <p>
        {skillTags.map((t) => (
          <span className="badge" key={t}>{t}</span>
        ))}
      </p>

      <h2>Connect</h2>
      <p>
        {social.slice(0, 4).map((s) => (
          <span key={s.platform}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" style={{color: 'var(--orange)'}}>{s.platform}</a>
            {' | '}
          </span>
        ))}
      </p>

      <h3>Copyright & Usage</h3>
      <p>
        Designed and built from scratch by <strong>{personal.name}</strong>.
        Made with <code>React + Vite</code>.
      </p>
      <p style={{color: 'var(--dim)', fontSize: 12}}>
        Portfolio v2.0 &middot; {new Date().getFullYear()}
      </p>
    </div>
  )
}
