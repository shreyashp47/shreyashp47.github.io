import { skills, skillTags } from '../../data/content'

const lines = [
  { text: '{', type: 'plain' },
  { text: '  "developer": {', type: 'plain' },
  { text: '    "name": "Shreyash Pattewar",', type: 'string' },
  { text: '    "languages": ["Kotlin", "Java"],', type: 'string' },
  { text: '    "frameworks": ["Jetpack Compose", "XML Layouts"],', type: 'string' },
  { text: '    "architecture": ["MVVM", "MVP", "MVI", "Clean Architecture"],', type: 'string' },
  { text: '    "tools": ["Retrofit", "Dagger-Hilt", "RxJava", "Firebase"],', type: 'string' },
  { text: '    "cloud": ["Firebase", "Amazon IVS", "Socket.IO"],', type: 'string' },
  { text: '    "devops": ["CI/CD", "GitHub Actions", "Google Play Console"],', type: 'string' },
  { text: '    "experience": "7+ years",', type: 'string' },
  { text: '    "apps_built": "30+",', type: 'string' },
  { text: '    "white_label_apps": "27+",', type: 'string' },
  { text: '    "enterprise_clients": "37+",', type: 'string' },
  { text: '    "certifications": [', type: 'plain' },
  { text: '      "Advanced Android Bootcamp 2024",', type: 'string' },
  { text: '      "The Complete iOS App Development"', type: 'string' },
  { text: '    ],', type: 'plain' },
  { text: '    "awards": [', type: 'plain' },
  { text: '      "Employee of the Month - HubEngage (May 2025)",', type: 'string' },
  { text: '      "Employee of the Month (2x) - TaxiVaxi"', type: 'string' },
  { text: '    ]', type: 'plain' },
  { text: '  }', type: 'plain' },
  { text: '}', type: 'plain' },
]

export default function TechStackJson() {
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
