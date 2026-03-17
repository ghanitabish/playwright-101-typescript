#!/usr/bin/env node
// run-playwright-test-wrapper.js
// Cross-platform wrapper for running Playwright tests in HyperExecute
// Usage: node run-playwright-test-wrapper.js "TestName::browser"

const { spawnSync } = require('child_process');

const input = process.argv[2];

if (!input) {
  console.error('Usage: node run-playwright-test-wrapper.js "TestName::browser"');
  process.exit(1);
}

// Parse "Scenario Name::chromium" format
const sepIndex = input.lastIndexOf('::');
let testName, project;
if (sepIndex > 0) {
  testName = input.substring(0, sepIndex);
  project = input.substring(sepIndex + 2);
} else {
  testName = input;
  project = null;
}

// Escape regex metacharacters so the test name is matched literally
function escapeForRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const escaped = escapeForRegex(testName);
const anchored = `^${escaped}$`;

// Build args array and call npx directly
const args = ['playwright', 'test', '-g', anchored, '--config=playwright.config.ts'];
if (project) {
  args.push(`--project=${project}`);
}

console.log(`Running: npx ${args.join(' ')}`);

// Use stdio: 'inherit' so output streams are forwarded
const result = spawnSync('npx', args, { stdio: 'inherit' });

// If spawnSync failed to start the process, print error and exit 1
if (result.error) {
  console.error('Failed to run npx:', result.error);
  process.exit(1);
}

// Exit with the same status code as the child process
process.exit(result.status === null ? 1 : result.status);
