import leoProfanity from 'leo-profanity';
import profanityList from '../config/private/profanity-list';

// Create the list of routes within the application
const routes = [
  '/',
  'about',
  'dashboard',
  'onboarding',
  // Add more routes as needed
];

// Load custom profanity list from a file
function loadCustomWordList() {
  try {
    leoProfanity.add(profanityList);
  } catch (error) {
    throw new Error(`Failed to load custom word list: ${error}`);
  }
}

// Load the custom word list
loadCustomWordList();

// Function to check for profanity in a given text
export function checkProfanity(text: string): boolean {
  return leoProfanity.check(text);
}

// Function to check if the username is the same as a route
export function isUsernameRoute(username: string): boolean {
  const normalizedUsername = username.toLowerCase();
  return routes.includes(normalizedUsername);
}

// Standalone username validator
export function usernameIsValid(username: string): boolean {
  // Check if the username is empty
  if (!username || username.trim() === '') {
    return false;
  }

  // Check if the username matches any route
  if (isUsernameRoute(username)) {
    return false;
  }

  // Check for profanity in the username
  if (checkProfanity(username)) {
    return false;
  }

  // If all checks pass, return true indicating no errors
  return true;
}
