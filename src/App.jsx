import { useState, useEffect, useCallback } from 'react'
import { fileTree } from './data/content'
import { useTheme } from './hooks/useTheme'
import ThemeSwitcher from './components/ThemeSwitcher'
import Terminal from './components/Terminal'
import CommandPalette from './components/CommandPalette'
import Home from './components/views/Home'
import About from './components/views/About'
import Skills from './components/views/Skills'
import Projects from './components/views/Projects'
import Experience from './components/views/Experience'
import Github from './components/views/Github'
import Contact from './components/views/Contact'
import Readme from './components/views/Readme'

const viewComponents = {
  home: Home,
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  github: Github,
  contact: Contact,
  readme: Readme,
}

const menuItems = ['File', 'Edit', 'View', 'Navigate', 'Code', 'Run', 'Portfolio']

const fileIconMap = {
  'fa-solid fa-file-lines': '#A9B7C6',
  'fa-solid fa-file-code': '#6897BB',
  'fa-brands fa-android': '#3DDC84',
  'fa-brands fa-github': '#FFFFFF',
  'fa-solid fa-mobile-screen': '#6897BB',
  'fa-solid fa-markdown': '#083FA1',
}

const fileExtIcons = {
  md: { icon: 'fa-solid fa-file-lines', color: '#A9B7C6' },
  json: { icon: 'fa-solid fa-file-code', color: '#6897BB' },
  kt: { icon: 'fa-brands fa-android', color: '#3DDC84' },
  xml: { icon: 'fa-solid fa-mobile-screen', color: '#6897BB' },
}

function getFileIcon(name) {
  const ext = name.split('.').pop()
  return fileExtIcons[ext] || { icon: 'fa-solid fa-file', color: '#A9B7C6' }
}

function TreeNode({ node, activeFile, onOpenFile, expandedFolders, onToggleFolder }) {
  const isFolder = node.type === 'folder'
  const isOpen = expandedFolders[node.name] !== false

  if (isFolder) {
    return (
      <div className="tree-folder">
        <div className="tree-folder-label" onClick={() => onToggleFolder(node.name)}>
          <i className={`fa-solid fa-chevron-right tree-chevron ${isOpen ? 'open' : ''}`} />
          <i className={`fa-solid ${isOpen ? 'fa-folder-open' : 'fa-folder'} tree-folder-icon`} />
          <span>{node.name}</span>
        </div>
        {isOpen && node.children && (
          <div className="tree-children">
            {node.children.map((child, i) => (
              <TreeNode
                key={child.name + i}
                node={child}
                activeFile={activeFile}
                onOpenFile={onOpenFile}
                expandedFolders={expandedFolders}
                onToggleFolder={onToggleFolder}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  const fi = node.icon ? { icon: node.icon, color: fileIconMap[node.icon] || '#A9B7C6' } : getFileIcon(node.name)

  return (
    <div
      className={`tree-file ${activeFile === node.id ? 'active' : ''}`}
      onClick={() => onOpenFile(node.id, node.name)}
    >
      <i className={fi.icon} style={{ color: fi.color, width: 14, fontSize: 12 }} />
      <span>{node.name}</span>
    </div>
  )
}

export default function App() {
  const { theme, setTheme } = useTheme()
  const [activeFile, setActiveFile] = useState('home')
  const [navOpen, setNavOpen] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [mobileNav, setMobileNav] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [expandedFolders, setExpandedFolders] = useState({ Portfolio: true, Projects: true })
  const [openTabs, setOpenTabs] = useState([{ id: 'home', name: 'Home.md' }])

  const allFiles = useCallback(() => {
    const result = []
    const walk = (nodes) => {
      for (const n of nodes) {
        if (n.type === 'file') result.push({ id: n.id, name: n.name, icon: n.icon })
        if (n.children) walk(n.children)
      }
    }
    walk(fileTree)
    return result
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openFile = useCallback((id, name) => {
    if (!id || !name) return
    setActiveFile(id)
    setMobileNav(false)
    setOpenTabs((tabs) => {
      if (tabs.find((t) => t.id === id)) return tabs
      return [...tabs, { id, name }]
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

  const toggleFolder = (name) => {
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const ActiveView = viewComponents[activeFile] || Home

  const navContent = (
    <>
      <div className="nav-header">
        <i className="fa-solid fa-folder-open" />
        <span>Project</span>
        <i className="fa-solid fa-ellipsis-vertical" style={{ marginLeft: 'auto', opacity: 0.5 }} />
      </div>
      <div className="nav-tree">
        {fileTree.map((node, i) => (
          <TreeNode
            key={node.name + i}
            node={node}
            activeFile={activeFile}
            onOpenFile={openFile}
            expandedFolders={expandedFolders}
            onToggleFolder={toggleFolder}
          />
        ))}
      </div>
      {isMobile && (
        <>
          <div className="nav-divider" />
          <div className="nav-actions">
            <div className="tree-file" onClick={() => { setPaletteOpen(true); setMobileNav(false) }}>
              <i className="fa-solid fa-search" style={{ width: 14, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Search</span>
            </div>
            <div className="tree-file" onClick={() => { setTerminalOpen((v) => !v); setMobileNav(false) }}>
              <i className="fa-solid fa-terminal" style={{ width: 14, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Terminal</span>
            </div>
            <div className="tree-file" onClick={() => { setThemeSwitcherOpen(true); setMobileNav(false) }}>
              <i className="fa-solid fa-palette" style={{ width: 14, fontSize: 12, color: 'var(--as-dim)' }} />
              <span>Theme</span>
            </div>
            <div className="tree-file" onClick={() => { window.open('https://github.com/shreyashp47', '_blank'); setMobileNav(false) }}>
              <i className="fa-brands fa-github" style={{ width: 14, fontSize: 12, color: 'var(--as-dim)' }} />
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
        <div className="window-controls">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>
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
          {openTabs.map((tab) => {
            const fi = getFileIcon(tab.name)
            return (
              <div
                key={tab.id}
                className={`editor-tab ${activeFile === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFile(tab.id)}
              >
                <i className={fi.icon} style={{ fontSize: 11, color: fi.color }} />
                <span>{tab.name}</span>
                <i
                  className="fa-solid fa-xmark"
                  style={{ fontSize: 11, opacity: 0.5, marginLeft: 4, cursor: 'pointer' }}
                  onClick={(e) => closeTab(e, tab.id)}
                />
              </div>
            )
          })}
        </div>
        <div className="editor-content">
          <ActiveView onNavigate={(id) => {
            const files = allFiles()
            const f = files.find((x) => x.id === id)
            if (f) openFile(f.id, f.name)
          }} />
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <span className="status-item" onClick={() => setTerminalOpen((v) => !v)}>
            <i className="fa-solid fa-branch" /> main
          </span>
          <span className="status-item">
            <i className="fa-solid fa-code" /> UTF-8
          </span>
        </div>
        <div className="status-right">
          <span className="status-item">Ln 1, Col 1</span>
          <span className="status-item">
            <a href="https://github.com/shreyashp47" target="_blank" rel="noopener noreferrer" className="status-link">
              <i className="fa-brands fa-github" />
            </a>
          </span>
          <span className="status-item">
            <a href="https://linkedin.com/in/shreyashpattewardeveloper" target="_blank" rel="noopener noreferrer" className="status-link">
              <i className="fa-brands fa-linkedin-in" />
            </a>
          </span>
          <span className="status-item">
            <a href="mailto:shreyashp47@gmail.com" className="status-link">
              <i className="fa-solid fa-envelope" />
            </a>
          </span>
          <span className="status-item hamburger" onClick={() => setMobileNav((v) => !v)}>
            <i className="fa-solid fa-bars" />
          </span>
        </div>
      </div>

      {/* Terminal */}
      <Terminal
        visible={terminalOpen}
        onToggle={() => setTerminalOpen(false)}
        onOpenFile={(id) => {
          const files = allFiles()
          const f = files.find((x) => x.id === id)
          if (f) openFile(f.id, f.name)
        }}
      />

      {/* Command Palette */}
      <CommandPalette
        visible={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenFile={(id, name) => openFile(id, name)}
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
