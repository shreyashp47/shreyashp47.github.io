import { projects } from '../../data/content'

const p = projects[7]

const lines = [
  { text: '/**', type: 'comment' },
  { text: ` * ${p.title}`, type: 'comment' },
  { text: ` * ${p.type} - ${p.period}`, type: 'comment' },
  { text: ' */', type: 'comment' },
  { text: '', type: 'empty' },
  { text: "const express = require('express');", type: 'keyword' },
  { text: "const { PythonShell } = require('python-shell');", type: 'keyword' },
  { text: '', type: 'empty' },
  { text: 'class CodeChallengePlatform {', type: 'keyword' },
  { text: '    constructor() {', type: 'func' },
  { text: "        this.app = express();", type: 'keyword' },
  { text: '        this.port = process.env.PORT || 3000;', type: 'keyword' },
  { text: '        this.challenges = new Map();', type: 'keyword' },
  { text: '        this.submissions = [];', type: 'keyword' },
  { text: '    }', type: 'func' },
  { text: '', type: 'empty' },
  { text: '    init() {', type: 'func' },
  { text: '        this.app.use(express.json());', type: 'func' },
  { text: '        this.app.use(express.static("public"));', type: 'func' },
  { text: '        this.setupRoutes();', type: 'func' },
  { text: '    }', type: 'func' },
  { text: '', type: 'empty' },
  { text: '    setupRoutes() {', type: 'func' },
  { text: '        // Get challenge by ID', type: 'comment' },
  { text: "        this.app.get('/api/challenges/:id', (req, res) => {", type: 'func' },
  { text: '            const challenge = this.challenges.get(req.params.id);', type: 'keyword' },
  { text: '            if (!challenge) {', type: 'keyword' },
  { text: '                return res.status(404).json({ error: "Challenge not found" });', type: 'keyword' },
  { text: '            }', type: 'keyword' },
  { text: '            res.json(challenge);', type: 'func' },
  { text: '        });', type: 'func' },
  { text: '', type: 'empty' },
  { text: '        // Submit solution', type: 'comment' },
  { text: "        this.app.post('/api/submit', async (req, res) => {", type: 'func' },
  { text: '            const { challengeId, code, language } = req.body;', type: 'keyword' },
  { text: '            const result = await this.evaluate(challengeId, code, language);', type: 'keyword' },
  { text: '            this.submissions.push({ challengeId, code, language, result });', type: 'keyword' },
  { text: '            res.json(result);', type: 'func' },
  { text: '        });', type: 'func' },
  { text: '    }', type: 'func' },
  { text: '', type: 'empty' },
  { text: '    async evaluate(challengeId, code, language) {', type: 'func' },
  { text: '        const challenge = this.challenges.get(challengeId);', type: 'keyword' },
  { text: '        // Run test cases against user code', type: 'comment' },
  { text: '        const testResults = challenge.testCases.map(tc => ({', type: 'keyword' },
  { text: '            input: tc.input,', type: 'keyword' },
  { text: '            expected: tc.expected,', type: 'keyword' },
  { text: '            actual: null,', type: 'keyword' },
  { text: '            passed: false', type: 'keyword' },
  { text: '        }));', type: 'keyword' },
  { text: '        return { challengeId, testResults, passed: false };', type: 'keyword' },
  { text: '    }', type: 'func' },
  { text: '', type: 'empty' },
  { text: '    start() {', type: 'func' },
  { text: '        this.app.listen(this.port, () => {', type: 'func' },
  { text: `            console.log(\`${p.title} running on port \${this.port}\`);`, type: 'func' },
  { text: '        });', type: 'func' },
  { text: '    }', type: 'func' },
  { text: '}', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: "const platform = new CodeChallengePlatform();", type: 'keyword' },
  { text: 'platform.init();', type: 'keyword' },
  { text: 'platform.start();', type: 'keyword' },
]

export default function Project3Js() {
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
