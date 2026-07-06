import { useState, useRef, useEffect } from 'react'

const welcomeLines = [
  'Welcome to Shreyash Pattewar\'s Portfolio terminal v2.0',
  'Type "help" for available commands.',
  '',
]

const helpText = `Available commands:
  help              - Show this message
  clear             - Clear terminal
  whoami            - Display current user
  ls                - List portfolio sections
  cat [section]     - Open a section (home, about, projects, skills, experience, contact, readme)
  pwd               - Print working directory
  date              - Show current date
  echo [text]       - Print text
  neofetch          - Display system info`

const fileMap = {
  home: 'home', about: 'about', projects: 'projects',
  skills: 'skills', experience: 'experience', github: 'github',
  contact: 'contact', readme: 'readme',
}

export default function Terminal({ visible, onToggle, onOpenFile }) {
  const [lines, setLines] = useState(welcomeLines)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (visible && inputRef.current) inputRef.current.focus()
  }, [visible])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const processCommand = (cmd) => {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    setHistory((h) => [...h, cmd])
    setHistoryIdx(-1)

    const output = []

    switch (command) {
      case 'help':
        output.push(helpText)
        break
      case 'clear':
        setLines([])
        return
      case 'whoami':
        output.push('shreyashp47')
        break
      case 'ls':
        output.push('home.tsx    about.html    projects.js    skills.json')
        output.push('experience.ts    github.json    contact.css    README.md')
        break
      case 'cat':
      case 'open':
        if (args.length === 0) {
          output.push('cat: missing operand')
        } else {
          const target = args[0].replace(/\.\w+$/, '').toLowerCase()
          if (fileMap[target]) {
            if (onOpenFile) onOpenFile(fileMap[target])
            output.push(`Opening ${args[0]}...`)
          } else {
            output.push(`cat: ${args[0]}: No such file`)
          }
        }
        break
      case 'pwd':
        output.push('/home/shreyashp47/portfolio')
        break
      case 'date':
        output.push(new Date().toString())
        break
      case 'echo':
        output.push(args.join(' '))
        break
      case 'neofetch':
        output.push('shreyashp47@portfolio')
        output.push('---------------------')
        output.push('OS: macOS')
        output.push('Shell: zsh')
        output.push('Editor: VS Code Portfolio')
        output.push('Languages: Kotlin, Swift, Python, TypeScript')
        output.push('Uptime: ' + Math.floor(Math.random() * 30 + 1) + ' days')
        break
      default:
        output.push(`Command not found: ${command}. Type "help" for available commands.`)
    }

    setLines((l) => [...l, `$ ${cmd}`, ...output])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      processCommand(input.trim())
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx >= 0) {
        const idx = historyIdx + 1
        if (idx >= history.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(idx)
          setInput(history[idx])
        }
      }
    }
  }

  if (!visible) return null

  return (
    <div className="terminal-panel">
      <div className="terminal-header" onClick={onToggle}>
        <span><i className="fa-solid fa-terminal" style={{marginRight: 6}} />Terminal</span>
        <span onClick={(e) => { e.stopPropagation(); onToggle() }} style={{cursor: 'pointer'}}>
          <i className="fa-solid fa-times" />
        </span>
      </div>
      <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div className="terminal-line" key={i} style={{color: line.startsWith('$') ? 'var(--gcm)' : line.startsWith('Command') || line.startsWith('cat:') ? 'var(--red)' : 'var(--text)'}}>
            {line}
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="terminal-prompt">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
