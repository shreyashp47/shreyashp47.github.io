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
  'fa-brands fa-android': '#3DDC84',
  'fa-solid fa-mobile-screen': '#6897BB',
  'fa-solid fa-cubes': '#E8BF6A',
  'fa-solid fa-database': '#CC7832',
  'fa-brands fa-github': '#FFFFFF',
  'fa-solid fa-markdown': '#083FA1',
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

const menuItems = ['File', 'Edit', 'View', 'Navigate', 'Code', 'Analyze', 'Refactor', 'Build', 'Run', 'Tools', 'VCS', 'Window', 'Help']

export default function App() {
  const { theme, setTheme } = useTheme()
  const [activeFile, setActiveFile] = useState('home')
  const [navOpen, setNavOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [mobileNav, setMobileNav] = useState(false)
  const [openTabs, setOpenTabs] = useState([{ id: 'home', name: 'home.kt', icon: 'fa-brands fa-android' }])
  const [activeMenu, setActiveMenu] = useState(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openFile = useCallback((id) => {
    const file = files.find((f) => f.id === id)
    if (!file) return
    setActiveFile(id)
    setMobileNav(false)
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
      if (e.key === 'Escape') {
        setPaletteOpen(false)
        setThemeSwitcherOpen(false)
        setActiveMenu(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const ActiveView = viewComponents[activeFile] || Home

  const navContent = (
    <>
      <div className="nav-header">
        <i className="fa-solid fa-folder-open" />
        <span>Portfolio</span>
        <i className="fa-solid fa-ellipsis-vertical" style={{ marginLeft: 'auto', opacity: 0.5 }} />
      </div>
      <div className="nav-tree">
        {files.map((file) => (
          <div
            key={file.id}
            className={`nav-file ${activeFile === file.id ? 'active' : ''}`}
            onClick={() => openFile(file.id)}
          >
            <i className={file.icon} style={{ color: fileIcons[file.icon] || 'var(--as-dim)', width: 16, fontSize: 12 }} />
            <span>{file.name}</span>
          </div>
        ))}
      </div>
      {isMobile && (
        <>
          <div className="nav-divider" />
          <div className="nav-actions">
            <div className="nav-file" onClick={() => { setPaletteOpen(true); setMobileNav(false) }}>
              <i className="fa-solid fa-search" style={{ width: 16, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Search</span>
            </div>
            <div className="nav-file" onClick={() => { setTerminalOpen((v) => !v); setMobileNav(false) }}>
              <i className="fa-solid fa-terminal" style={{ width: 16, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Terminal</span>
            </div>
            <div className="nav-file" onClick={() => { setThemeSwitcherOpen(true); setMobileNav(false) }}>
              <i className="fa-solid fa-palette" style={{ width: 16, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Theme</span>
            </div>
            <div className="nav-file" onClick={() => { window.open('https://github.com/shreyashp47', '_blank'); setMobileNav(false) }}>
              <i className="fa-brands fa-github" style={{ width: 16, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>GitHub</span>
            </div>
          </div>
        </>
      )}
    </>
  )

  const layoutClass = [
    'as-layout',
    isMobile ? 'mobile' : '',
    navOpen ? '' : 'nav-hidden',
    terminalOpen ? 'terminal-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={layoutClass} onClick={() => activeMenu && setActiveMenu(null)}>
      {/* Menu Bar */}
      <div className="menu-bar">
        <span className="menu-logo" style={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.5 }}>
          <i className="fa-brands fa-android" style={{ fontSize: 14, marginRight: 6, color: 'var(--as-green)' }} />
          Portfolio
        </span>
        {menuItems.map((m) => (
          <span
            key={m}
            className={`menu-item ${activeMenu === m ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === m ? null : m) }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-group">
          <button className="toolbar-btn" title="Back"><i className="fa-solid fa-arrow-left" /></button>
          <button className="toolbar-btn" title="Forward"><i className="fa-solid fa-arrow-right" /></button>
          <span className="toolbar-sep" />
          <button className="toolbar-btn" onClick={() => setNavOpen((v) => !v)} title="Project"><i className="fa-solid fa-folder-tree" /></button>
        </div>
        <div className="toolbar-group">
          <button className="toolbar-btn" title="Build"><i className="fa-solid fa-hammer" /></button>
          <button className="toolbar-btn" title="Run"><i className="fa-solid fa-play" style={{ color: 'var(--as-green)' }} /></button>
          <button className="toolbar-btn" title="Debug"><i className="fa-solid fa-bug" style={{ color: 'var(--as-green)' }} /></button>
          <span className="toolbar-sep" />
          <button className="toolbar-btn" title="Stop"><i className="fa-solid fa-stop" style={{ color: 'var(--as-red)' }} /></button>
        </div>
        <div className="toolbar-group" style={{ marginLeft: 'auto' }}>
          <button className="toolbar-btn" onClick={() => setPaletteOpen(true)} title="Search"><i className="fa-solid fa-search" /></button>
          <button className="toolbar-btn" onClick={() => setThemeSwitcherOpen(true)} title="Theme"><i className="fa-solid fa-palette" /></button>
          <button className="toolbar-btn" onClick={() => window.open('https://github.com/shreyashp47', '_blank')} title="GitHub"><i className="fa-brands fa-github" /></button>
        </div>
      </div>

      {/* Navigation Panel */}
      {!isMobile && navOpen && (
        <div className="nav-panel">
          {navContent}
        </div>
      )}

      {/* Mobile Nav Overlay */}
      {isMobile && mobileNav && (
        <>
          <div className="nav-overlay" onClick={() => setMobileNav(false)} />
          <div className="mobile-nav">
            {navContent}
          </div>
        </>
      )}

      {/* Editor */}
      <div className="editor">
        <div className="editor-tabs">
          {openTabs.map((tab) => (
            <div
              key={tab.id}
              className={`editor-tab ${activeFile === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFile(tab.id)}
            >
              <i className={tab.icon} style={{ fontSize: 11, color: fileIcons[tab.icon] || 'var(--as-dim)' }} />
              <span>{tab.name}</span>
              <i
                className="fa-solid fa-xmark"
                style={{ fontSize: 11, opacity: 0.5, marginLeft: 4, cursor: 'pointer' }}
                onClick={(e) => closeTab(e, tab.id)}
              />
            </div>
          ))}
        </div>
        <div className={`editor-content ${isMobile ? 'compact' : ''}`}>
          <ActiveView onNavigate={openFile} />
        </div>
      </div>

      {/* Tool Window Bar (bottom) */}
      <div className="tw-bar">
        <div className="tw-bar-left">
          <span className={`tw-item ${terminalOpen ? 'active' : ''}`} onClick={() => setTerminalOpen((v) => !v)}>
            <i className="fa-solid fa-terminal" /> Terminal
          </span>
          <span className="tw-item"><i className="fa-solid fa-list-check" /> TODO</span>
          <span className="tw-item"><i className="fa-solid fa-bug" /> Logcat</span>
          <span className="tw-item"><i className="fa-solid fa-hammer" /> Build</span>
          <span className="tw-item"><i className="fa-solid fa-circle-play" /> Run</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="status-item" onClick={() => setTerminalOpen((v) => !v)}>
            <i className="fa-solid fa-branch" /> v3
          </span>
          <span className="status-item">
            <i className="fa-solid fa-code" /> {files.find((f) => f.id === activeFile)?.label || 'TypeScript'}
          </span>
        </div>
        <div className="status-right">
          <span className="status-item">
            <i className="fa-solid fa-indent" /> UTF-8
          </span>
          <span className="status-item">Ln 1, Col 1</span>
          <span className="status-item">LF</span>
          <span className="status-item">4 spaces</span>
          <span className="status-item hamburger" onClick={() => setMobileNav((v) => !v)}>
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
