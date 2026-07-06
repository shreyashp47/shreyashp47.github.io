import { social } from '../../data/content'

export default function Contact() {
  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// contact.css : ways to reach me'}</div>
        <h2>Contact</h2>
        <div style={{color: 'var(--dim)', fontSize: 12, marginTop: 4}}>
          {'// '}open to work, collabs &amp; good conversations
        </div>
      </div>
      <div className="contact-methods">
        {social.map((s) => (
          <a key={s.platform} className="contact-card" href={s.url} target="_blank" rel="noopener noreferrer">
            <div className="contact-icon"><i className={s.icon} /></div>
            <div>
              <div className="contact-label">{s.platform}</div>
              <div className="contact-value">{s.handle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
