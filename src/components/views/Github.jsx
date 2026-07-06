import { useState, useEffect } from 'react'

const GITHUB_USER = 'shreyashp47'

export default function Github() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch repos')
        return res.json()
      })
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        setRepos(sorted)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// github.json - open source & activity'}</div>
        <h2>GitHub</h2>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4,
          padding: 16, flex: '1 1 200px', textAlign: 'center',
        }}>
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USER}&show_icons=true&hide_title=true&count_private=true&theme=transparent&text_color=var(--text)&icon_color=var(--blue2)&border_color=transparent`}
            alt="GitHub Stats"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4,
          padding: 16, flex: '1 1 200px', textAlign: 'center',
        }}>
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USER}&theme=transparent&hide_border=true&stroke=var(--border)&ring=var(--blue2)&fire=var(--blue2)&currStreakNum=var(--text)&sideNums=var(--text)&currStreakLabel=var(--dim)&sideLabels=var(--dim)&dates=var(--dim)`}
            alt="GitHub Streak"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4,
          padding: 16, flex: '1 1 200px', textAlign: 'center',
        }}>
          <img
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USER}&layout=compact&hide_title=true&theme=transparent&text_color=var(--text)&border_color=transparent`}
            alt="Top Languages"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
      </div>

      {/* Contribution Graph */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 4,
        padding: 16, marginBottom: 24, overflow: 'hidden',
      }}>
        <h3 style={{ fontSize: 13, color: 'var(--dim)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <i className="fa-solid fa-chart-line" style={{ marginRight: 8 }} />Contribution Graph
        </h3>
        <img
          src={`https://ghchart.rshah.org/1e1e1e/${GITHUB_USER}`}
          alt="Contribution Graph"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 2 }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentNode.innerHTML += '<p style="color:var(--dim);font-size:12px">Contribution graph unavailable</p>'
          }}
        />
      </div>

      {/* Repos */}
      <div className="view-header" style={{ marginBottom: 12 }}>
        <div className="filename" style={{ fontSize: 12 }}>
          {'// '}repositories (sorted by last updated)
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--dim)' }}>
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 24, marginBottom: 12 }} />
          <p>Loading repositories...</p>
        </div>
      )}

      {error && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--red)' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 24, marginBottom: 12 }} />
          <p>Failed to load repositories</p>
          <p style={{ fontSize: 12, color: 'var(--dim)', marginTop: 4 }}>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="project-grid">
          {repos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <i className="fa-brands fa-github" style={{ color: 'var(--dim)', fontSize: 14 }} />
                <h3 style={{ fontSize: 14, margin: 0 }}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--blue)', textDecoration: 'none' }}>
                    {repo.name}
                  </a>
                </h3>
              </div>
              <p style={{ fontSize: 12, color: 'var(--dim)', lineHeight: 1.7, marginBottom: 12 }}>
                {repo.description || 'No description'}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--dim)' }}>
                {repo.language && (
                  <span>
                    <span style={{
                      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                      background: langColor(repo.language), marginRight: 4,
                    }} />
                    {repo.language}
                  </span>
                )}
                <span><i className="fa-regular fa-star" /> {repo.stargazers_count || 0}</span>
                <span><i className="fa-solid fa-code-fork" /> {repo.forks_count || 0}</span>
                <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function langColor(lang) {
  const colors = {
    Kotlin: '#7F52FF', Java: '#ED8B00', Python: '#3776AB', TypeScript: '#3178C6',
    JavaScript: '#F7DF1E', HTML: '#E34F26', CSS: '#1572B6', Swift: '#F05138',
    Dart: '#0175C2', Shell: '#89E051', Ruby: '#701516', Go: '#00ADD8',
    Rust: '#DEA584', C: '#555555', 'C++': '#F34B7D', 'C#': '#178600',
  }
  return colors[lang] || '#6e7681'
}
