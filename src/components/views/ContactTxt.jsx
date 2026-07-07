import { personal, social } from '../../data/content'

const github = social.find(s => s.platform === 'GitHub')
const linkedin = social.find(s => s.platform === 'LinkedIn')
const medium = social.find(s => s.platform === 'Medium')
const email = social.find(s => s.platform === 'Email')

const lines = [
  { text: '# Contact.txt', type: 'comment' },
  { text: '# ============', type: 'comment' },
  { text: '', type: 'empty' },
  { text: `Name:     ${personal.name}`, type: 'plain' },
  { text: `Email:    ${personal.email}`, type: 'plain' },
  { text: `Phone:    ${personal.phone}`, type: 'plain' },
  { text: `Location: ${personal.location}`, type: 'plain' },
  { text: '', type: 'empty' },
  { text: '--- Online ---', type: 'comment' },
  { text: `GitHub:     ${github?.url || ''}`, type: 'keyword' },
  { text: `LinkedIn:   ${linkedin?.url || ''}`, type: 'keyword' },
  { text: `Medium:     ${medium?.url || ''}`, type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '--- Resume ---', type: 'comment' },
  { text: `Download: ${personal.resumeUrl}`, type: 'plain' },
  { text: '', type: 'empty' },
  { text: '--- Preferences ---', type: 'comment' },
  { text: 'IDE:        Android Studio / VS Code', type: 'plain' },
  { text: 'Theme:      Darcula Dark', type: 'plain' },
  { text: 'Font:       JetBrains Mono, 14px', type: 'plain' },
  { text: 'OS:         macOS', type: 'plain' },
  { text: 'Shell:      zsh + oh-my-zsh', type: 'plain' },
  { text: '', type: 'empty' },
  { text: 'EOF', type: 'keyword' },
]

export default function ContactTxt() {
  return (
    <div className="code-view">
      {lines.map((line, i) => (
        <div key={i} className="code-line">
          <span className="line-number">{i + 1}</span>
          <span className={`line-content ${line.type}`}>{line.text}</span>
        </div>
      ))}
      <div className="blinking-cursor" />
    </div>
  )
}
