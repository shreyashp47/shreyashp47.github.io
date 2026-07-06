import { personal, taglines, bio, focusAreas, quickStats, social } from '../../data/content'
import { useTypingAnimation } from '../../hooks/useTypingAnimation'

export default function Home() {
  const typingText = useTypingAnimation(taglines)
  const scrollTo = (id) => {
    const fileBtns = document.querySelectorAll('[data-file]')
    fileBtns.forEach((btn) => {
      if (btn.dataset.file === id) btn.click()
    })
  }

  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// home.tsx - ' + personal.name}</div>
      </div>
      <div className="home-wrapper">
        <div className="home-avatar">
          <div className="avatar-ring" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg3)', fontSize: 40, fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'var(--blue2)'}}>
            SP
          </div>
          <div className="avatar-glow" />
        </div>
        <div className="home-content">
          <h1>{personal.name}</h1>
          <div className="subtitle">
            <span className="typing-text">{typingText}</span>
            <span className="typing-cursor" />
          </div>
          <p className="description">
            I live at the crossroads of <span className="highlight">mobile engineering</span>,{' '}
            <span className="highlight">AI/ML</span>, and{' '}
            <span className="highlight">backend systems</span>.
            I build apps that are genuinely <span className="highlight">intelligent and scalable</span>.
          </p>
          <div className="quick-stats">
            {quickStats.map((s) => (
              <div className="stat-item" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
              <i className="fa-solid fa-code" /> See my Projects
            </button>
            <button className="btn" onClick={() => scrollTo('about')}>
              <i className="fa-solid fa-user" /> About Me
            </button>
            <button className="btn" onClick={() => scrollTo('contact')}>
              <i className="fa-solid fa-envelope" /> Get In Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
