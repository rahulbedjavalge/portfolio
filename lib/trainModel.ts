import * as fs from 'fs';
import * as path from 'path';

async function trainModel() {
  try {
    console.log('Starting training process...');

    // Step 1: Load raw data
    const dataPath = path.join(process.cwd(), 'data', 'personal_data.json');
    const rawData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Step 2: Preprocess the data
    console.log('Preprocessing data...');
    const { preprocessData } = await import('./preprocessData'); // Lazy load the dependency
    const trainingExamples = preprocessData(rawData);

    console.log('Checking data preprocessing...');
    if (!trainingExamples || trainingExamples.length === 0) {
      throw new Error('No training examples generated. Please check the preprocessData function.');
    }
    console.log('Training examples generated successfully.');

    // Step 3: Save the training data in JSONL format for OpenRouter/OpenAI fine-tuning
    const trainingDataPath = path.join(process.cwd(), 'data', 'training_data.jsonl');
    fs.writeFileSync(
      trainingDataPath,
      trainingExamples.map(example => JSON.stringify(example)).join('\n')
    );

    console.log('Training data prepared and saved to:', trainingDataPath);
    console.log('Training examples:', trainingExamples);
    console.log('Saving training data to:', trainingDataPath);
    console.log('\nNext steps for fine-tuning:');
    console.log('1. Use the OpenRouter API to create a fine-tuned model:');
    console.log('   - Base model: mistralai/mistral-7b-instruct');
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

if (require.main === module) {
  trainModel().catch(console.error);
}
