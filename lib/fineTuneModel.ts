import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import aiConfig from './aiConfig';

async function fineTuneModel(): Promise<void> {
  console.log('Starting fine-tuning process...');

  // Load training data in JSONL format
  const trainingDataPath = path.resolve(process.cwd(), 'data', 'training_data.jsonl');
  if (!fs.existsSync(trainingDataPath)) {
    console.error('Training data file not found:', trainingDataPath);
    process.exit(1);
  }
  const trainingData = fs.readFileSync(trainingDataPath, 'utf-8');

  console.log('Submitting fine-tune request to OpenRouter API...');
  const endpoint = 'https://openrouter.ai/api/v1/fine-tunes';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: aiConfig.model.name,
      training_file: trainingData,
      // optional: n_epochs: 3, learning_rate: 2e-5
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Fine-tune request failed:', errorText);
    process.exit(1);
  }

  const result = await response.json();
  console.log('Fine-tuning job created. Job ID:', result.job_id || result.id);
  console.log('When complete, update aiConfig.model.name with the new model ID.');
}

// Execute when run
fineTuneModel().catch((err) => {
  console.error('Error during fine-tuning:', err);
  process.exit(1);
});
