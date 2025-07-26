import * as fs from 'fs';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { aiConfig } from './aiConfig';
import { PersonalData } from '../types/data';

// Function to preprocess data for training
export function preprocessData() {
  const dataPath = path.join(process.cwd(), 'data', 'personal_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData) as PersonalData;

  // Create training examples from the data
  const trainingExamples = [
    // Profile information
    {
      prompt: "Tell me about yourself and your professional background.",
      completion: `I am ${data.profile.name}, a ${data.profile.title}. ${data.profile.summary}`
    },
    {
      prompt: "What languages do you speak?",
      completion: `I am proficient in ${data.profile.languages.map(l => 
        l.proficiency === "Learning" ? 
        `${l.name} (${l.details})` : 
        `${l.name} (${l.proficiency})`
      ).join(', ')}.`
    },
    
    // Skills examples
    ...data.skills.flatMap(category => [
      {
        prompt: `What is your experience with ${category.category} technologies?`,
        completion: `In ${category.category}, I have expertise in ${category.items
          .map(item => `${item.name} (${item.level}, ${item.years} years)`)
          .join(', ')}.`
      }
   ]),

    // Projects examples
    ...data.projects.map(project => ({
      prompt: `Tell me about your ${project.title} project.`,
      completion: `${project.description} This project uses ${project.technologies.join(', ')}. Key highlights include: ${project.highlights.join(', ')}.`
    })),

    // Experience examples
    ...data.experience.map(exp => ({
      prompt: `What did you do at ${exp.company}?`,
      completion: `At ${exp.company}, I worked as ${exp.role} (${exp.duration}) where I ${exp.description} Key achievements: ${exp.achievements.join(', ')}.`
    })),

    // Education examples
    ...data.education.map(edu => ({
      prompt: `Tell me about your education at ${edu.institution}.`,
      completion: `I studied ${edu.degree} with specialization in ${edu.specialization} at ${edu.institution} (${edu.duration}). ${edu.achievements.join(', ')}.`
    })),

    // European focus examples
    {
      prompt: "Why are you interested in European opportunities?",
      completion: `I am actively seeking opportunities in the European tech ecosystem, with a particular focus on cross-cultural development teams and international software development. I am currently learning German (${data.profile.languages.find(l => l.name === "German")?.details}) to better integrate into the European tech community.`
    }
  ];

  // Save the formatted data
  const outputPath = path.join(process.cwd(), 'data', 'training_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(trainingExamples, null, 2));

  console.log('Data preprocessing complete. Training data saved to:', outputPath);
  return trainingExamples;
}

// Run the preprocessing function if this script is executed directly
if (require.main === module) {
  preprocessData();
}
