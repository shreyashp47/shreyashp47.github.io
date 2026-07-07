import { useState, useEffect } from 'react'

const allFiles = [
  { id: 'bio', name: 'Bio.md' },
  { id: 'techstack', name: 'TechStack.json' },
  { id: 'project1', name: 'Project1.java' },
  { id: 'project2', name: 'Project2.py' },
  { id: 'project3', name: 'Project3.js' },
  { id: 'contact', name: 'Contact.txt' },
]

export default function CommandPalette({ visible, onClose, onOpenFile }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (visible) setQuery('')
  }, [visible])

  const filtered = allFiles.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.id.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (file) => {
    onOpenFile(file.id, file.name)
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
              <i className="fa-solid fa-file cmd-icon" />
              <span>{f.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
