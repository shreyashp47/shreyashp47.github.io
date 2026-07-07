import { projects } from '../../data/content'

const p = projects[6]

const lines = [
  { text: '#!/usr/bin/env python3', type: 'comment' },
  { text: '"""', type: 'comment' },
  { text: `${p.title}`, type: 'comment' },
  { text: `${p.type} - ${p.period}`, type: 'comment' },
  { text: '', type: 'empty' },
  { text: `${p.description}`, type: 'comment' },
  { text: '"""', type: 'comment' },
  { text: '', type: 'empty' },
  { text: 'import os', type: 'keyword' },
  { text: 'import json', type: 'keyword' },
  { text: 'from typing import Optional', type: 'keyword' },
  { text: 'from langchain.llms import OpenAI', type: 'keyword' },
  { text: 'from mcp import MCPServer', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '', type: 'empty' },
  { text: 'class AIAssistant:', type: 'keyword' },
  { text: '    """AI-powered personal assistant with MCP integration."""', type: 'string' },
  { text: '', type: 'empty' },
  { text: '    def __init__(self, api_key: str = None):', type: 'func' },
  { text: '        self.api_key = api_key or os.getenv("OPENAI_API_KEY")', type: 'keyword' },
  { text: '        self.llm = OpenAI(api_key=self.api_key)', type: 'keyword' },
  { text: '        self.mcp = MCPServer()', type: 'keyword' },
  { text: '        self.tools = []', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '    def register_tool(self, func):', type: 'func' },
  { text: '        """Register a function as an MCP tool."""', type: 'string' },
  { text: '        self.tools.append(func)', type: 'keyword' },
  { text: '        return self.mcp.register(func)', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '    async def process_query(self, query: str) -> str:', type: 'func' },
  { text: '        """Process a natural language query using LLM agents."""', type: 'string' },
  { text: '        response = await self.llm.agenerate(', type: 'func' },
  { text: '            prompt=query,', type: 'string' },
  { text: '            tools=self.tools,', type: 'string' },
  { text: '            temperature=0.7', type: 'number' },
  { text: '        )', type: 'func' },
  { text: '        return response.generations[0].text', type: 'keyword' },
  { text: '', type: 'empty' },
  { text: '    def run_cli(self):', type: 'func' },
  { text: '        """Run the assistant in CLI mode."""', type: 'string' },
  { text: '        print(f"{p.title} CLI Ready")', type: 'func' },
  { text: '        while True:', type: 'keyword' },
  { text: '            query = input(">> ")', type: 'func' },
  { text: '            if query.lower() == "exit":', type: 'keyword' },
  { text: '                break', type: 'keyword' },
  { text: '            print(self.process_query(query))', type: 'func' },
  { text: '', type: 'empty' },
  { text: '', type: 'empty' },
  { text: 'if __name__ == "__main__":', type: 'keyword' },
  { text: '    assistant = AIAssistant()', type: 'keyword' },
  { text: '    assistant.run_cli()', type: 'keyword' },
]

export default function Project2Py() {
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
