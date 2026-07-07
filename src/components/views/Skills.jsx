import { skills, skillTags } from '../../data/content'

export default function Skills() {
  return (
    <div>
      <div className="view-header">
        <div className="filename">{'// skills.json - tech stack & tools'}</div>
        <h2>Skills</h2>
      </div>
      <div className="skills-grid">
        {skills.map((cat) => (
          <div className="skill-category" key={cat.category}>
            <h3>{cat.category}</h3>
            {cat.items.map((skill) => (
              <div className="skill-item" key={skill.name}>
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span className="pct">{skill.pct}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-bar-fill" style={{width: skill.pct + '%', background: skill.color}} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="skill-tags">
        {skillTags.map((tag) => (
          <span className="skill-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}
