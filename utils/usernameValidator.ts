import leoProfanity from 'leo-profanity';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load custom profanity list from a file
function loadCustomWordList() {

  // Try to read the custom word list file
  try {
    const data = readFileSync(join(process.cwd(), './config/private/profanity-list.txt'), 'utf-8')
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 0);

    // Add custom words to leoProfanity
    leoProfanity.add(data);
  } catch (error) {
    // Logging the error for testing purposes
    console.error('Error loading custom profanity list:', error);
  }
};

// Load the custom word list
loadCustomWordList();

// Function to check for profanity in a given text
function checkProfanity(text: string): boolean {
  // Check if the text contains profanity
  return leoProfanity.check(text);
}

