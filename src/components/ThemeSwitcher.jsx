import { themes } from '../data/content'

export default function ThemeSwitcher({ current, onSelect, onClose }) {
  return (
    <>
      <div className="command-palette-overlay" onClick={onClose}>
        <div className="command-palette" onClick={(e) => e.stopPropagation()} style={{maxHeight: 300}}>
          <div style={{padding: '8px 14px', fontSize: 11, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--border)'}}>
            Select Theme
          </div>
          <div className="command-list">
            {themes.map((t) => (
              <div
                key={t.id}
                className={`command-item ${current === t.id ? 'selected' : ''}`}
                onClick={() => { onSelect(t.id); onClose() }}
              >
                <i className="fa-solid fa-palette cmd-icon" />
                {t.label}
                {current === t.id && <span style={{marginLeft: 'auto', fontSize: 11, opacity: 0.7}}>active</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
