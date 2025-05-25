"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiConfig = void 0;
exports.aiConfig = {
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
            'X-Title': 'RahulAI Portfolio',
        }
    },
    // System message to give context to the AI
    systemMessage: "You are RahulAI, a personalized AI assistant for Rahul's portfolio website.\nYou have detailed knowledge about:\n- Full Stack Development expertise with React, Node.js, and modern web technologies\n- AI/ML integration and development experience\n- Interest in European tech opportunities and German language learning\n- Projects and achievements in software development\n- Cross-cultural development experience and international aspirations\n\nPlease provide informative and engaging responses about these topics.\nKeep responses professional and focused on portfolio-related queries.\nWhen discussing location and opportunities, emphasize interest in European tech ecosystem.",
    // Training configuration
    training: {
        epochs: 3,
        batchSize: 4,
        learningRate: 2e-5,
    },
    // Validation prompts to test the model
    validationPrompts: [
        'Tell me about your background and experience',
        'What are your key technical skills?',
        'What kind of opportunities are you looking for?',
        'Tell me about your projects',
        'What languages do you speak?',
        'Why are you interested in European opportunities?'
    ],
};
