import { useState, useEffect, useCallback } from 'react'
import { files } from './data/content'
import { useTheme } from './hooks/useTheme'
import ThemeSwitcher from './components/ThemeSwitcher'
import Terminal from './components/Terminal'
import CommandPalette from './components/CommandPalette'
import Home from './components/views/Home'
import About from './components/views/About'
import Projects from './components/views/Projects'
import Skills from './components/views/Skills'
import Experience from './components/views/Experience'
import Github from './components/views/Github'
import Contact from './components/views/Contact'
import Readme from './components/views/Readme'

const fileIcons = {
  'fa-brands fa-react': '#61DAFB',
  'fa-brands fa-html5': '#E34F26',
  'fa-brands fa-js': '#F7DF1E',
  'fa-solid fa-code': '#519ABA',
  'fa-brands fa-css3-alt': '#1572B6',
  'fa-solid fa-markdown': '#083FA1',
  'fa-brands fa-github': '#FFFFFF',
}

const viewComponents = {
  home: Home,
  about: About,
  projects: Projects,
  skills: Skills,
  experience: Experience,
  github: Github,
  contact: Contact,
  readme: Readme,
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [activeFile, setActiveFile] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const [openTabs, setOpenTabs] = useState([{ id: 'home', name: 'home.tsx', icon: 'fa-brands fa-react' }])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openFile = useCallback((id) => {
    const file = files.find((f) => f.id === id)
    if (!file) return
    setActiveFile(id)
    setMobileSidebar(false)
    setOpenTabs((tabs) => {
      if (tabs.find((t) => t.id === id)) return tabs
      return [...tabs, { id: file.id, name: file.name, icon: file.icon }]
    })
  }, [])

  const closeTab = (e, id) => {
    e.stopPropagation()
    const newTabs = openTabs.filter((t) => t.id !== id)
    setOpenTabs(newTabs)
    if (id === activeFile && newTabs.length > 0) {
      setActiveFile(newTabs[newTabs.length - 1].id)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault()
        setTerminalOpen((v) => !v)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        setSidebarOpen((v) => !v)
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false)
        setThemeSwitcherOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const currentTheme = theme === 'default' ? 'Default Dark+' : null
  const ActiveView = viewComponents[activeFile] || Home

  const sidebarContent = (
    <>
      <div className="sidebar-header">
        <span>Portfolio</span>
        <i className="fa-solid fa-ellipsis" />
      </div>
      {files.map((file) => (
        <div
          key={file.id}
          className={`file-item ${activeFile === file.id ? 'active' : ''}`}
          onClick={() => openFile(file.id)}
          data-file={file.id}
        >
          <span className="file-icon" style={{ color: fileIcons[file.icon] || 'var(--dim)' }}>
            <i className={file.icon} />
          </span>
          <span className="truncate">{file.name}</span>
        </div>
      ))}
    </>
  )

  return (
    <div className="app-grid">
      {/* Title Bar */}
      <div className="title-bar">
        <span style={{ opacity: 0.6 }}>
          <i className="fa-solid fa-file-code" style={{ marginRight: 8 }} />
          Portfolio - {files.find((f) => f.id === activeFile)?.name || 'home.tsx'}
        </span>
      </div>

      {/* Activity Bar */}
      <div className="activity-bar">
        <button
          className={`activity-btn ${sidebarOpen ? 'active' : ''}`}
          onClick={() => setSidebarOpen((v) => !v)}
          title="Explorer (Ctrl+B)"
        >
          <i className="fa-solid fa-files" />
        </button>
        <button
          className={`activity-btn ${paletteOpen ? 'active' : ''}`}
          onClick={() => setPaletteOpen(true)}
          title="Search (Ctrl+P)"
        >
          <i className="fa-solid fa-search" />
        </button>
        <button
          className={`activity-btn ${terminalOpen ? 'active' : ''}`}
          onClick={() => setTerminalOpen((v) => !v)}
          title="Terminal (Ctrl+`)"
        >
          <i className="fa-solid fa-terminal" />
        </button>
        <div className="activity-spacer" />
        <button
          className="activity-btn"
          onClick={() => setThemeSwitcherOpen(true)}
          title="Change Theme"
        >
          <i className="fa-solid fa-palette" />
        </button>
        <button
          className="activity-btn"
          onClick={() => window.open('https://github.com/shreyashp47', '_blank')}
          title="GitHub"
        >
          <i className="fa-brands fa-github" />
        </button>
      </div>

      {/* Sidebar */}
      {!isMobile && sidebarOpen && (
        <div className="sidebar">
          {sidebarContent}
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && mobileSidebar && (
        <>
          <div className="mobile-overlay" onClick={() => setMobileSidebar(false)} />
          <div className={`mobile-sidebar ${mobileSidebar ? 'open' : ''}`}>
            {sidebarContent}
          </div>
        </>
      )}

      {/* Editor */}
      <div className="editor-area" style={terminalOpen ? { gridRow: '2 / 3' } : {}}>
        <div className="editor-tabs">
          {openTabs.map((tab) => (
            <div
              key={tab.id}
              className={`editor-tab ${activeFile === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFile(tab.id)}
            >
              <i className={tab.icon} style={{ fontSize: 12, color: fileIcons[tab.icon] || 'var(--dim)' }} />
              <span>{tab.name}</span>
              <i
                className="fa-solid fa-xmark"
                style={{ fontSize: 12, opacity: 0.5, marginLeft: 4, cursor: 'pointer' }}
                onClick={(e) => closeTab(e, tab.id)}
              />
            </div>
          ))}
        </div>
        <div className="editor-content">
          <ActiveView />
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="status-item" onClick={() => setTerminalOpen((v) => !v)}>
            <i className="fa-solid fa-branch" /> v2
          </span>
          <span className="status-item">
            <i className="fa-solid fa-code" /> {files.find((f) => f.id === activeFile)?.label || 'TypeScript React'}
          </span>
          <span className="status-item">
            <i className="fa-solid fa-check-circle" style={{color: '#89d185'}} /> Prettier
          </span>
        </div>
        <div className="status-right">
          <span className="status-item" onClick={() => setThemeSwitcherOpen(true)}>
            <i className="fa-solid fa-palette" /> {theme === 'default' ? 'Default Dark+' : theme}
          </span>
          <span className="status-item">Ln 1, Col 1</span>
          <span className="status-item">UTF-8</span>
          <span className="status-item" onClick={() => setMobileSidebar((v) => !v)}>
            <i className="fa-solid fa-bars" />
          </span>
        </div>
      </div>

      {/* Terminal */}
      <Terminal
        visible={terminalOpen}
        onToggle={() => setTerminalOpen(false)}
        onOpenFile={(id) => openFile(id)}
      />

      {/* Command Palette */}
      <CommandPalette
        visible={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenFile={(id) => openFile(id)}
      />

      {/* Theme Switcher */}
      {themeSwitcherOpen && (
        <ThemeSwitcher
          current={theme}
          onSelect={setTheme}
          onClose={() => setThemeSwitcherOpen(false)}
        />
      )}
    </div>
  )
}
