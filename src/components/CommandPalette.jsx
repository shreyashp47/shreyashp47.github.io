import { useState } from 'react'
import { files } from '../data/content'

export default function CommandPalette({ visible, onClose, onOpenFile }) {
  const [query, setQuery] = useState('')

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.id.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (file) => {
    onOpenFile(file.id)
    onClose()
  }

  if (!visible) return null

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search files..."
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered.length > 0) handleSelect(filtered[0])
            if (e.key === 'Escape') onClose()
          }}
        />
        <div className="command-list">
          {filtered.map((f) => (
            <div key={f.id} className="command-item" onClick={() => handleSelect(f)}>
              <i className={`${f.icon} cmd-icon`} />
              <span>{f.name}</span>
              <span style={{marginLeft: 'auto', fontSize: 11, color: 'var(--dim)'}}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
