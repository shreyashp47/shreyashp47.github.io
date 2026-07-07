import { projects } from '../../data/content'

const p = projects[0]

const lines = [
  { text: '/*', type: 'comment' },
  { text: ` * ${p.title}`, type: 'comment' },
  { text: ` * ${p.type} - ${p.period}`, type: 'comment' },
  { text: ' */', type: 'comment' },
  { text: `package com.shreyash.${p.title.toLowerCase()};`, type: 'keyword' },
  { text: '', type: 'empty' },
  { text: 'import android.os.Bundle;', type: 'keyword' },
  { text: 'import androidx.activity.ComponentActivity;', type: 'keyword' },
  { text: 'import androidx.compose.foundation.layout.*;', type: 'keyword' },
  { text: 'import androidx.compose.material3.*;', type: 'keyword' },
  { text: 'import androidx.compose.runtime.*;', type: 'keyword' },
  { text: 'import androidx.room.*;', type: 'keyword' },
  { text: 'import dagger.hilt.android.*;', type: 'keyword' },
  { text: 'import javax.inject.Inject;', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '@HiltAndroidApp', type: 'annotation' },
  { text: 'public class MainApplication extends Application { }', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '@AndroidEntryPoint', type: 'annotation' },
  { text: 'public class MainActivity extends ComponentActivity {', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '    @Inject', type: 'annotation' },
  { text: '    TaskRepository taskRepository;', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '    @Override', type: 'annotation' },
  { text: '    protected void onCreate(Bundle savedInstanceState) {', type: 'func' },
  { text: '        super.onCreate(savedInstanceState);', type: 'func' },
  { text: '        setContent {', type: 'func' },
  { text: '            PortfolioTheme {', type: 'func' },
  { text: '                TaskManagerApp(taskRepository);', type: 'func' },
  { text: '            }', type: 'func' },
  { text: '        }', type: 'func' },
  { text: '    }', type: 'func' },
  { text: '}', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '/*', type: 'comment' },
  { text: ` * ${p.description}`, type: 'comment' },
  { text: ` * Tech: ${p.tech.join(', ')}`, type: 'comment' },
  { text: ' */', type: 'comment' },
]

export default function Project1Java() {
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
