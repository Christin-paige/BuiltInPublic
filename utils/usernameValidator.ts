import leoProfanity from 'leo-profanity';
import { readFileSync } from 'fs';
import path from 'path';

// Create the list of routes within the application
const routes = [
  '/',
  'about',
  'dashboard',
  // Add more routes as needed
];

// Load custom profanity list from a file
function loadCustomWordList() {
  try {
    const data = readFileSync(
      path.join(process.cwd(), './config/private/profanity-list.txt'),
      'utf-8'
    )
      .split('\n')
      .map((word: string) => word.trim().toLowerCase())
      .filter((word: string) => word.length > 0);

    leoProfanity.add(data);
  } catch (error) {
    throw new Error(`Failed to load profanity list: ${error}`);
  }
}

// Load the custom word list
loadCustomWordList();

// Function to check for profanity in a given text
function checkProfanity(text: string): boolean {
  return leoProfanity.check(text);
}

// Function to check if the username is the same as a route
function isUsernameRoute(username: string): boolean {
  const normalizedUsername = username.toLowerCase();
  return routes.includes(normalizedUsername);
}

// Standalone username validator
export function usernameValidator(username: string): string | null {
  // Check if the username is empty
  if (!username || username.trim() === '') {
    return 'Username cannot be empty';
  }

  // Check for profanity in the username
  if (checkProfanity(username)) {
    return 'Username contains inappropriate language';
  }

  // Check if the username matches any route
  if (isUsernameRoute(username)) {
    return 'Username cannot match a route';
  }

  // If all checks pass, return null indicating no errors
  return null;
}
