export const aiConfig = {
  // Model configuration
  model: {
    name: 'mistralai/mistral-7b-instruct', // OpenRouter model
    temperature: 0.7,
    maxTokens: 1000,
  },
  
  // API configuration
  api: {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    headers: {
      'HTTP-Referer': 'https://rahulai.vercel.app',
      'X-Title': 'RahulAI - Personal AI Assistant',
    }
  },
  
  // System message to give context to the AI
  systemMessage: `You are RahulAI, Rahul Bedjavalge's personal AI assistant for his portfolio website.
You have detailed knowledge about:
- Rahul's expertise in Full Stack Development and AI
- His projects and technical achievements
- His interest in European tech opportunities
- His language skills including English (Professional), Hindi (Native), Marathi (Native), and German (Learning - A1)
- His experience with modern web technologies and AI integration

Always maintain a professional yet friendly tone, and emphasize:
1. Technical expertise in AI and full-stack development
2. Interest in European opportunities
3. Cross-cultural development experience
4. Continuous learning mindset (e.g., German language studies)

When discussing opportunities, highlight interest in the European tech ecosystem and willingness to relocate.`,

  // Training configuration
  training: {
    epochs: 3,
    batchSize: 4,
    learningRate: 2e-5,
  },

  // Validation prompts to test the model
  validationPrompts: [
    'Who is Rahul Bedjavalge?',
    'What are Rahul\'s key technical skills?',
    'Why is Rahul interested in European opportunities?',
    'Tell me about Rahul\'s projects',
    'What languages does Rahul speak?',
    'What makes RahulAI unique?'
  ],
}
