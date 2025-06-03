import { preprocessData } from './preprocessData';

const mockConfig = {
  model: {
    name: 'mock-model',
    temperature: 0.7,
    maxTokens: 1000,
  },
  training: {
    epochs: 1,
    batchSize: 1,
    learningRate: 1e-5,
  },
  validationPrompts: ['Test prompt'],
  profile: {
    name: 'Mock Name',
    title: 'Mock Title',
    summary: 'Mock Summary',
    location: 'Mock Location',
    availability: 'Mock Availability',
    contact: {
      email: 'mock@example.com',
      linkedin: 'mock-linkedin',
      github: 'mock-github',
    },
    languages: [
      { name: 'Mock Language', proficiency: 'Mock Proficiency' },
    ],
    interests: ['Mock Interest'],
  },
  projects: [
    {
      title: 'Mock Project',
      description: 'Mock Description',
      technologies: ['Mock Technology'],
      highlights: ['Mock Highlight'],
      github: 'mock-github',
      demo: 'mock-demo',
    },
  ],
  skills: [
    {
      category: 'Mock Category',
      items: [
        { name: 'Mock Skill', level: 'Mock Level', years: 1 },
      ],
    },
  ],
  experience: [
    {
      company: 'Mock Company',
      role: 'Mock Role',
      duration: 'Mock Duration',
      location: 'Mock Location',
      description: 'Mock Description',
      achievements: ['Mock Achievement'],
      technologies: ['Mock Technology'],
    },
  ],
  education: [
    {
      institution: 'Mock Institution',
      degree: 'Mock Degree',
      specialization: 'Mock Specialization',
      duration: 'Mock Duration',
      achievements: ['Mock Achievement'],
    },
  ],
};

console.log('Testing preprocessData with mock configuration...');
const result = preprocessData(mockConfig);
console.log('Result:', result);
