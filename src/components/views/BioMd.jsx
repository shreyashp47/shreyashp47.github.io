import { personal } from '../../data/content'

const lines = [
  { text: '/*', type: 'comment' },
  { text: ' * Bio.md', type: 'comment' },
  { text: ' * ======', type: 'comment' },
  { text: ' *', type: 'comment' },
  { text: ` * Name: ${personal.name}`, type: 'comment' },
  { text: ` * Role: ${personal.role}`, type: 'comment' },
  { text: ` * Location: ${personal.location}`, type: 'comment' },
  { text: ` * Email: ${personal.email}`, type: 'comment' },
  { text: ' *', type: 'comment' },
  { text: ' * Android Developer with 7+ years of experience', type: 'comment' },
  { text: ' * building 30+ high-impact apps for enterprise clients.', type: 'comment' },
  { text: ' * Reducing crash rates by 50%, improving load times', type: 'comment' },
  { text: ' * by 50%, and leading development of chat, AI search,', type: 'comment' },
  { text: ' * and live streaming modules using Kotlin, Jetpack,', type: 'comment' },
  { text: ' * and CI/CD pipelines.', type: 'comment' },
  { text: ' *', type: 'comment' },
  { text: ' * Currently @ Cognizant (CARIAD - Volkswagen Group)', type: 'comment' },
  { text: ' * Previously @ HubEngage, BAI Infosolutions', type: 'comment' },
  { text: ' */', type: 'comment' },
  { text: '', type: 'empty' },
  { text: '@startuml', type: 'keyword' },
  { text: 'class Developer {', type: 'keyword' },
  { text: '    +String name', type: 'string' },
  { text: '    +String role', type: 'string' },
  { text: '    +String location', type: 'string' },
  { text: '    +String[] skills', type: 'string' },
  { text: '    +buildApps(): App[]', type: 'func' },
  { text: '    +optimizePerformance(): void', type: 'func' },
  { text: '    +leadTeam(): void', type: 'func' },
  { text: '}', type: 'keyword' },
  { text: '@enduml', type: 'keyword' },
]

export default function BioMd() {
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
