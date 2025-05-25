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
  systemMessage: `You are RahulAI, a personal assistant for Rahul Bedjavalge. Your role is to answer questions about Rahul's skills, projects, and experience. If the input is unrelated to Rahul, politely inform the user that you can only answer questions about Rahul.`,

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
