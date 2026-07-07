import { useState, useRef, useEffect } from 'react'

const buildLines = [
  { text: '> Building Portfolio...', delay: 0 },
  { text: '> Compiling Skills... ✅', delay: 800 },
  { text: '> Loading Projects... ✅', delay: 1600 },
  { text: '> BUILD SUCCESSFUL in 0.8s', delay: 2400 },
  { text: '', delay: 3200 },
]

export default function Terminal({ visible, onToggle, onOpenFile }) {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [buildDone, setBuildDone] = useState(false)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    setLines([])
    setBuildDone(false)
    buildLines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { text, type: 'build' }])
        if (delay === 3200) {
          setTimeout(() => setBuildDone(true), 400)
        }
      }, delay)
    })
  }, [visible])

  useEffect(() => {
    if (visible && inputRef.current) inputRef.current.focus()
  }, [visible])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const fileMap = {
    bio: 'bio', techstack: 'techstack', project1: 'project1',
    project2: 'project2', project3: 'project3', contact: 'contact',
  }

  const processCommand = (cmd) => {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    setHistory((h) => [...h, cmd])
    setHistoryIdx(-1)

    const output = []

    switch (command) {
      case 'help':
        output.push('Available commands:')
        output.push('  help              - Show this message')
        output.push('  clear             - Clear terminal')
        output.push('  whoami            - Display current user')
        output.push('  ls                - List portfolio files')
        output.push('  open [file]       - Open a file (Bio.md, TechStack.json, Project1.java, etc.)')
        output.push('  pwd               - Print working directory')
        output.push('  build             - Re-run build')
        output.push('  neofetch          - Display system info')
        break
      case 'clear':
        setLines([])
        return
      case 'whoami':
        output.push('shreyashp47')
        break
      case 'ls':
        output.push('About/')
        output.push('  Bio.md')
        output.push('Skills/')
        output.push('  TechStack.json')
        output.push('Projects/')
        output.push('  Project1.java')
        output.push('  Project2.py')
        output.push('  Project3.js')
        output.push('Contact.txt')
        break
      case 'open':
        if (args.length === 0) {
          output.push('open: missing operand')
        } else {
          const target = args[0].replace(/\.\w+$/, '').toLowerCase()
          const idMap = { bio: 'bio', techstack: 'techstack', project1: 'project1', project2: 'project2', project3: 'project3', contact: 'contact' }
          if (idMap[target] && onOpenFile) {
            onOpenFile(idMap[target])
            output.push(`Opening ${args[0]}...`)
          } else {
            output.push(`open: ${args[0]}: No such file`)
          }
        }
        break
      case 'pwd':
        output.push('/home/shreyashp47/portfolio')
        break
      case 'build':
        setLines([])
        setBuildDone(false)
        buildLines.forEach(({ text, delay }) => {
          setTimeout(() => {
            setLines((prev) => [...prev, { text, type: 'build' }])
            if (delay === 3200) {
              setTimeout(() => setBuildDone(true), 400)
            }
          }, delay)
        })
        return
      case 'neofetch':
        output.push('shreyashp47@portfolio')
        output.push('---------------------')
        output.push('OS: macOS')
        output.push('Shell: zsh')
        output.push('IDE: Android Studio')
        output.push('Theme: Darcula Dark')
        output.push('Languages: Kotlin, Java, Python, JavaScript')
        break
      default:
        output.push(`Command not found: ${command}. Type "help" for available commands.`)
    }

    setLines((l) => [...l, { text: `$ ${cmd}`, type: 'input' }, ...output.map((t) => ({ text: t, type: 'output' }))])
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
        <span><i className="fa-solid fa-terminal" style={{ marginRight: 6 }} />Build</span>
        <span onClick={(e) => { e.stopPropagation(); onToggle() }} style={{ cursor: 'pointer' }}>
          <i className="fa-solid fa-times" />
        </span>
      </div>
      <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="terminal-line"
            style={{
              color: line.type === 'build'
                ? line.text.includes('SUCCESSFUL') ? 'var(--as-green)' : 'var(--as-text)'
                : line.type === 'input' ? 'var(--accent-android)' : 'var(--as-text)',
            }}
          >
            {line.text}
          </div>
        ))}
        {buildDone && (
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
        )}
      </div>
    </div>
  )
}
