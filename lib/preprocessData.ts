import * as fs from 'fs';
import * as path from 'path';
import { PersonalData } from '../types/data';

// Function to preprocess data for training
export function preprocessData(rawData: PersonalData) {
  const safeMap = <T, U>(array: T[] | undefined, callback: (item: T) => U): U[] => (Array.isArray(array) ? array.map(callback) : []);

  // Create training examples from the data
  const trainingExamples = [
    // Profile information
    {
      prompt: "Tell me about yourself and your professional background.",
      completion: `I am ${rawData.profile?.name || 'N/A'}, a ${rawData.profile?.title || 'N/A'}. ${rawData.profile?.summary || 'N/A'}`
    },
    {
      prompt: "What languages do you speak?",
      completion: `I am proficient in ${safeMap(rawData.profile?.languages, (l: { name: string; proficiency: string; details?: string }) => 
        l.proficiency === "Learning" ? 
        `${l.name} (${l.details})` : 
        `${l.name} (${l.proficiency})`
      ).join(', ') || 'N/A'}.`
    },

    // Skills examples
    ...safeMap(rawData.skills, (category: { category: string; items: { name: string; level: string; years?: number }[] }) => ({
      prompt: `What is your experience with ${category.category} technologies?`,
      completion: `In ${category.category}, I have expertise in ${safeMap(category.items, (item: { name: string; level: string; years?: number }) => `${item.name} (${item.level}, ${item.years || 0} years)`).join(', ') || 'N/A'}.`
    })),

    // Projects examples
    ...safeMap(rawData.projects, (project: { title: string; description: string; technologies: string[]; highlights: string[] }) => ({
      prompt: `Tell me about your ${project.title} project.`,
      completion: `${project.description || 'N/A'} This project uses ${safeMap(project.technologies, (tech: string) => tech).join(', ') || 'N/A'}. Key highlights include: ${safeMap(project.highlights, (highlight: string) => highlight).join(', ') || 'N/A'}.`
    })),

    // Experience examples
    ...safeMap(rawData.experience, (exp: { company: string; role: string; duration: string; description: string; achievements: string[] }) => ({
      prompt: `What did you do at ${exp.company}?`,
      completion: `At ${exp.company}, I worked as ${exp.role} (${exp.duration}) where I ${exp.description || 'N/A'}. Key achievements: ${safeMap(exp.achievements, (achievement: string) => achievement).join(', ') || 'N/A'}.`
    })),

    // Education examples
    ...safeMap(rawData.education, (edu: { institution: string; degree: string; duration: string; details?: string }) => ({
      prompt: `Tell me about your education at ${edu.institution}.`,
      completion: `${edu.degree} (${edu.duration}). ${edu.details || 'N/A'}`
    }))
  ];

  return trainingExamples;
}

// Run the preprocessing function if this script is executed directly
if (require.main === module) {
  const dataPath = path.join(process.cwd(), 'data', 'personal_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(rawData) as PersonalData;

  console.log('Parsed data:', data); // Log the parsed data structure

  const trainingExamples = preprocessData(data);

  // Save the formatted data
  const outputPath = path.join(process.cwd(), 'data', 'training_data.json');
  fs.writeFileSync(outputPath, JSON.stringify(trainingExamples, null, 2));

  console.log('Data preprocessing complete. Training data saved to:', outputPath);
}
