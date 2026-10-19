const CONFIG = {
  name: "Shreyash Pattewar",
  tagline: "Building AI agents and LLM-powered apps",
  // Used for SEO metadata (JSON-LD, llms.txt) by scripts/prerender.mjs; not shown on the page.
  jobTitle: "AI Engineer",
  company: "Cognizant",
  siteUrl: "https://shreyashp47.github.io/",
  githubUsername: "shreyashp47",
  githubUrl: "https://github.com/shreyashp47",
  leetcodeUsername: "shreyashp47",
  linkedinUrl: "https://linkedin.com/in/shreyashpattewardeveloper",
  twitterUrl: "https://x.com/shreyashp4",
  mediumUrl: "https://medium.com/@shreyashp47",
  stackoverflowUrl: "https://stackoverflow.com/users/12186899/shreyash-pattewar",
  instagramUrl: "https://instagram.com/shreyashpattewar_",
  email: "shreyashp47@gmail.com",
  resumePath: "static/assets/resume.pdf",
  skills: {
    "AI & LLMs": ["Python", "LangChain", "MCP", "Ollama", "OpenAI", "Groq", "FastAPI"],
    "Mobile": ["Kotlin", "Java", "Swift", "Dart", "Flutter", "Jetpack Compose"],
    "Web & Database": ["TypeScript", "Next.js", "Node.js", "Firebase", "Swagger", "Realm", "SQLite"],
    "Tools & DevOps": ["Figma", "Notion", "Git", "Docker", "CI/CD"]
  },
  // AI work first. tags drive the project filter chips (ai | android | web); image is an 800x400 WebP thumbnail.
  projects: [
    {
      title: "AI Foundation",
      description: "93 free, visual lessons on AI engineering: KV cache, prompt caching, RAG retrieval and reranking, tool calling, evals and guardrails. Each pairs a plain-English explanation with an interactive demo, runnable Python and a quiz.",
      tech: ["JavaScript", "Python", "Firebase"],
      github: "",
      demo: "https://aifoundation.web.app/lesson.html#kv-cache",
      tags: ["ai", "web"],
      image: "static/assets/projects/ai-foundation.webp"
    },
    {
      title: "Agent Office",
      description: "Real-time observability for OpenCode AI agents: a plugin streams tool calls, idle and permission events over SSE, and each agent appears as a pixel-art character moving around an office.",
      tech: ["TypeScript", "Hono", "OpenCode", "SSE"],
      github: "https://github.com/shreyashp47/Agent-Office",
      demo: "",
      tags: ["ai"],
      image: "static/assets/projects/agent-office.webp"
    },
    {
      title: "Shreyash-AI",
      description: "A fully local AI agent: a FastAPI service lets an Ollama model choose a tool from an MCP server, runs it over SSE, and answers from the result. No cloud LLM, no API keys.",
      tech: ["Python", "Ollama", "MCP", "LangChain", "FastAPI"],
      github: "https://github.com/shreyashp47/Shreyash-AI",
      demo: "",
      tags: ["ai"],
      image: "static/assets/projects/shreyash-ai.webp"
    },
    {
      title: "CalmSpace",
      description: "A voice-first AI companion for calming down after a stressful moment: Whisper speech-to-text with live captions, an LLM-guided grounding and reframing flow, text-to-speech, and a crisis check on every message.",
      tech: ["JavaScript", "Node.js", "Groq", "Whisper"],
      github: "https://github.com/shreyashp47/CalmSpace",
      demo: "",
      tags: ["ai", "web"],
      image: "static/assets/projects/calmspace.webp"
    },
    {
      title: "Tone Fixer",
      description: "A Chrome extension that rewrites any text in 9 tones, from polite to persuasive, using Groq, OpenRouter, Claude, ChatGPT, Gemini or Grok. Your API key stays in local storage.",
      tech: ["JavaScript", "Chrome Extension", "LLM"],
      github: "https://github.com/shreyashp47/tone-fixer",
      demo: "",
      tags: ["ai"],
      image: "static/assets/projects/tone-fixer.webp"
    },
    {
      title: "DoTrack",
      description: "A modern task management Android app built with Clean Architecture and Jetpack Compose that turns your wallpaper into a dynamic to-do list.",
      tech: ["Kotlin", "Jetpack Compose", "Room", "Hilt"],
      github: "https://github.com/shreyashp47/DoTrack",
      demo: "https://play.google.com/store/apps/details?id=com.shreyash.dotrack",
      tags: ["android"],
      image: "static/assets/projects/dotrack.webp"
    },
    {
      title: "ChatGPT Analysis",
      description: "A ChatGPT-style chat app with streaming replies from Ollama (local), Groq, Gemini or OpenAI, plus Markdown and code highlighting. API keys stay in the browser.",
      tech: ["Next.js", "TypeScript", "LLM"],
      github: "https://github.com/shreyashp47/chatgpt-analysis",
      demo: "https://chatgpt-clone-app-lyart.vercel.app",
      tags: ["ai", "web"],
      image: "static/assets/projects/chatgpt-analysis.webp"
    },
    {
      title: "Sensor-App",
      description: "A Kotlin-based Android app for reading and visualizing device sensor data in real time.",
      tech: ["Kotlin", "Android Sensors"],
      github: "https://github.com/shreyashp47/Sensor-App",
      demo: "https://play.google.com/store/apps/details?id=com.shreyash.sensorapp",
      tags: ["android"],
      image: "static/assets/projects/sensor-app.webp"
    },
    {
      title: "OpenCodeLeet",
      description: "A local LeetCode-style coding challenge platform supporting Python and Kotlin. Solve algorithm problems in a web editor, run code against test cases, and get instant feedback.",
      tech: ["Python", "Flask", "Kotlin", "HTML", "Tailwind CSS"],
      github: "https://github.com/shreyashp47/OpenCodeLeet",
      demo: "https://opencodeleet.onrender.com/",
      tags: ["web"],
      image: "static/assets/projects/opencodeleet.webp",
      note: "free server: first load can take ~30 s"
    },
    {
      title: "Anti-Theft-Alarm-App",
      description: "An Android app that detects unauthorized device motion and triggers a loud alarm — built with Kotlin and device sensor integration.",
      tech: ["Kotlin", "Android Sensors"],
      github: "https://github.com/shreyashp47/Anti-Theft-Alarm-App",
      demo: "",
      tags: ["android"],
      image: "static/assets/projects/anti-theft-alarm.webp"
    }
  ],
  linkedinPosts: [
    {
      date: "Sep 2025",
      excerpt: "Side-Effects Simplified in Jetpack Compose — a carousel breaking down what side effects are, suspending vs non-suspending effects, and when to use each one in your Compose UI.",
      likes: 93,
      url: "https://www.linkedin.com/posts/shreyashpattewardeveloper_side-effects-in-compose-activity-7376132742343925761-kPVw"
    },
    {
      date: "Sep 2025",
      excerpt: "Kotlin Essentials Every Developer Must Know — a quick carousel covering null-safety, type operators, range operators, scope functions, and equality in Kotlin.",
      likes: 134,
      url: "https://www.linkedin.com/posts/shreyashpattewardeveloper_kotlin-essentials-every-developer-must-know-activity-7368942670427115524-biTT"
    },
    {
      date: "June 2025",
      excerpt: "Introducing DoTrack - a modern task management app that turns your wallpaper into a live to-do list! Built with Clean Architecture, Jetpack Compose, Material 3, and a fully automated CI/CD pipeline with GitHub Actions.",
      likes: 120,
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7338562065843810304/"
    }
  ],
  bio: "Software engineer at Cognizant, focused on AI. I build LLM-powered products: agents that call tools through MCP, local models with Ollama, streaming chat, and voice assistants with speech-to-text and safety checks. I also created AI Foundation, 93 free interactive lessons on AI engineering.\n\nI came to AI from Android (Kotlin, Jetpack Compose, apps on Google Play), so I care about shipping AI features people actually use. Open to collaborating on AI agents and LLM products. When I'm not coding, you'll find me swimming or playing ping pong."
};
