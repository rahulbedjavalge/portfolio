import * as fs from 'fs';
import * as path from 'path';
import { aiConfig } from './aiConfig';
import { preprocessData } from './preprocessData';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TrainingExample {
  prompt: string;
  completion: string;
}

async function trainModel() {
  try {
    // Step 1: Preprocess the data
    console.log('Preprocessing data...');
    const trainingExamples = preprocessData();

    // Step 2: Save the training data in JSONL format for OpenRouter/OpenAI fine-tuning
    const trainingDataPath = path.join(process.cwd(), 'data', 'training_data.jsonl');
    fs.writeFileSync(
      trainingDataPath,
      trainingExamples.map(example => JSON.stringify(example)).join('\n')
    );

    console.log('Training data prepared and saved to:', trainingDataPath);
    console.log('\nNext steps for fine-tuning:');
    console.log('1. Use the OpenRouter API to create a fine-tuned model:');
    console.log(`   - Base model: ${aiConfig.model.name}`);
    console.log('   - Training data: training_data.jsonl');
    console.log('2. Update the model name in aiConfig.ts with your fine-tuned model ID');
    console.log('3. Test the model with validation prompts from aiConfig.validationPrompts');

    // Display some example prompts
    console.log('\nExample training data:');
    trainingExamples.slice(0, 3).forEach((example, i) => {
      console.log(`\nExample ${i + 1}:`);
      console.log('Prompt:', example.prompt);
      console.log('Completion:', example.completion);
    });

  } catch (error) {
    console.error('Error during training setup:', error);
    throw error;
  }
}

// Run the training setup if this script is executed directly
if (require.main === module) {
  trainModel().catch(console.error);
}
