import { useState, useEffect } from 'react'

const GITHUB_USER = 'shreyashp47'

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

const langColors = {
  Kotlin: '#7F52FF', Java: '#ED8B00', Python: '#3776AB', TypeScript: '#3178C6',
  JavaScript: '#F7DF1E', HTML: '#E34F26', CSS: '#1572B6', Swift: '#F05138',
  Dart: '#0175C2', Shell: '#89E051', Ruby: '#701516', Go: '#00ADD8',
  Rust: '#DEA584', C: '#555555', 'C++': '#F34B7D', 'C#': '#178600',
}

function langColor(lang) {
  return langColors[lang] || '#6e7681'
}

export default function Github() {
  const [repos, setRepos] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USER}`),
          fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`),
        ])
        if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data')
        const userData = await userRes.json()
        const reposData = await reposRes.json()
        reposData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        setUser(userData)
        setRepos(reposData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const pinnedRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6)

  const visibleRepos = repos.filter(r => !pinnedRepos.find(p => p.id === r.id))

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: 'var(--as-dim)' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 28, marginBottom: 16 }} />
        <p style={{ fontSize: 13 }}>Loading GitHub data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 60, color: 'var(--as-red)' }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 28, marginBottom: 16 }} />
        <p style={{ fontSize: 13 }}>Failed to load GitHub data</p>
        <p style={{ fontSize: 12, color: 'var(--as-dim)', marginTop: 4 }}>{error}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// github.json - open source & activity'}</div>
      </div>

      {/* Profile Header */}
      <div style={{
        background: 'var(--as-bg2)', border: '1px solid var(--as-border)', borderRadius: 6,
        padding: 24, marginBottom: 0,
      }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <img
            src={`https://avatars.githubusercontent.com/${GITHUB_USER}`}
            alt={GITHUB_USER}
            style={{ width: 80, height: 80, borderRadius: '50%', border: '2px solid var(--as-border)' }}
          />
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--as-text)', margin: 0 }}>
              {user?.name || GITHUB_USER}
              <span style={{ fontSize: 16, fontWeight: 300, color: 'var(--as-dim)', marginLeft: 8 }}>
                {user?.login}
              </span>
            </h1>
            {user?.bio && (
              <p style={{ fontSize: 13, color: 'var(--as-dim)', marginTop: 6, lineHeight: 1.6 }}>
                {user.bio}
              </p>
            )}
            <div style={{ display: 'flex', gap: 20, marginTop: 10, fontSize: 12, color: 'var(--as-dim)' }}>
              {user?.company && (
                <span><i className="fa-solid fa-building" style={{ marginRight: 4 }} />{user.company}</span>
              )}
              {user?.location && (
                <span><i className="fa-solid fa-location-dot" style={{ marginRight: 4 }} />{user.location}</span>
              )}
              <span><i className="fa-regular fa-star" style={{ marginRight: 4 }} />{user?.public_repos} repositories</span>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 8, fontSize: 12 }}>
              <span style={{ color: 'var(--as-text)' }}>
                <strong>{user?.followers}</strong>
                <span style={{ color: 'var(--as-dim)', marginLeft: 4 }}>followers</span>
              </span>
              <span style={{ color: 'var(--as-text)' }}>
                <strong>{user?.following}</strong>
                <span style={{ color: 'var(--as-dim)', marginLeft: 4 }}>following</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{
        display: 'flex', gap: 0, borderBottom: '1px solid var(--as-border)',
        marginBottom: 16, marginTop: 20,
      }}>
        {['overview', 'repositories'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px 16px', fontSize: 12, fontFamily: 'inherit',
              color: tab === t ? 'var(--as-text)' : 'var(--as-dim)',
              borderBottom: tab === t ? `2px solid var(--as-orange)` : '2px solid transparent',
              marginBottom: -1, transition: 'all .15s ease',
            }}
          >
            <i className={`fa-solid ${t === 'overview' ? 'fa-book' : 'fa-code-fork'}`} style={{ marginRight: 6 }} />
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {tab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
            {[
              { img: `https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&hide_title=true&count_private=true&theme=transparent&text_color=${encodeURIComponent(cssVar('--as-text'))}&icon_color=${encodeURIComponent(cssVar('--as-blue'))}&border_color=transparent`, label: 'GitHub Stats' },
              { img: `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=transparent&hide_border=true&stroke=${encodeURIComponent(cssVar('--as-border'))}&ring=${encodeURIComponent(cssVar('--as-blue'))}&fire=${encodeURIComponent(cssVar('--as-blue'))}&currStreakNum=${encodeURIComponent(cssVar('--as-text'))}&sideNums=${encodeURIComponent(cssVar('--as-text'))}&currStreakLabel=${encodeURIComponent(cssVar('--as-dim'))}&sideLabels=${encodeURIComponent(cssVar('--as-dim'))}&dates=${encodeURIComponent(cssVar('--as-dim'))}`, label: 'Streak' },
              { img: `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&hide_title=true&theme=transparent&text_color=${encodeURIComponent(cssVar('--as-text'))}&border_color=transparent`, label: 'Top Languages' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--as-bg2)', border: '1px solid var(--as-border)', borderRadius: 6,
                padding: 16, flex: '1 1 240px', textAlign: 'center',
              }}>
                <img src={s.img} alt={s.label} style={{ maxWidth: '100%', height: 'auto' }}
                  onError={(e) => { e.target.style.display = 'none' }} />
              </div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div style={{
            background: 'var(--as-bg2)', border: '1px solid var(--as-border)', borderRadius: 6,
            padding: 16, marginBottom: 20,
          }}>
            <h3 style={{ fontSize: 13, color: 'var(--as-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <i className="fa-solid fa-chart-line" style={{ marginRight: 8 }} />Contribution Graph
            </h3>
            <img
              src={`https://ghchart.rshah.org/0D0E10/${GITHUB_USER}`}
              alt="Contribution Graph"
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 6 }}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentNode.innerHTML += '<p style="color:var(--as-dim);font-size:12px">Contribution graph unavailable</p>'
              }}
            />
          </div>

          {/* Pinned Repositories */}
          {pinnedRepos.length > 0 && (
            <div>
              <h3 style={{ fontSize: 13, color: 'var(--as-dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                <i className="fa-solid fa-thumbtack" style={{ marginRight: 8 }} />Pinned
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
                {pinnedRepos.map(repo => (
                  <div key={repo.id} style={{
                    background: 'var(--as-bg2)', border: '1px solid var(--as-border)', borderRadius: 6,
                    padding: 16, transition: 'border-color .15s ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--as-border2)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--as-border)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <i className="fa-regular fa-bookmark" style={{ color: 'var(--as-dim)', fontSize: 12 }} />
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        style={{ color: 'var(--as-blue)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                        {repo.name}
                      </a>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--as-dim)', lineHeight: 1.6, marginBottom: 12 }}>
                      {repo.description || ''}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--as-dim)' }}>
                      {repo.language && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: langColor(repo.language), display: 'inline-block' }} />
                          {repo.language}
                        </span>
                      )}
                      <span><i className="fa-regular fa-star" /> {repo.stargazers_count}</span>
                      <span><i className="fa-solid fa-code-fork" /> {repo.forks_count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Repositories Tab */}
      {tab === 'repositories' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: 'var(--as-dim)' }}>
              <i className="fa-solid fa-book" style={{ marginRight: 6 }} />{repos.length} repositories
            </span>
          </div>
          <div style={{ border: '1px solid var(--as-border)', borderRadius: 6, overflow: 'hidden' }}>
            {visibleRepos.map((repo, i) => (
              <div key={repo.id} style={{
                padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i < visibleRepos.length - 1 ? '1px solid var(--as-border)' : 'none',
                transition: 'background .15s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--as-bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--as-blue)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p style={{ fontSize: 11, color: 'var(--as-dim)', marginTop: 2, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {repo.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 6, fontSize: 11, color: 'var(--as-dim)' }}>
                    {repo.language && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: langColor(repo.language), display: 'inline-block' }} />
                        {repo.language}
                      </span>
                    )}
                    <span><i className="fa-regular fa-star" /> {repo.stargazers_count}</span>
                    <span><i className="fa-solid fa-code-fork" /> {repo.forks_count}</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--as-dim)', whiteSpace: 'nowrap', marginLeft: 16 }}>
                  Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
