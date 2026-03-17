#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const projectRoot = process.cwd();

// Recursively find files matching a pattern
function findFiles(dir, pattern) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, pattern));
    } else if (pattern.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function discoverTests() {
  const testDir = path.join(projectRoot, 'tests');
  const filePattern = /\.(spec|test|e2e)\.ts$/;
  const files = findFiles(testDir, filePattern);
  const tests = [];

  // Read projects from playwright.config.ts
  const projects = ['chromium', 'firefox'];

  files.forEach(abs => {
    let content;
    try { content = fs.readFileSync(abs, 'utf8'); } catch { return; }

    const testRegex = /test\s*\(\s*['"`]([^'"`]+)['"`]/g;
    let match;
    while ((match = testRegex.exec(content)) !== null) {
      const testName = match[1];
      for (const project of projects) {
        tests.push(`${testName}::${project}`);
      }
    }
  });

  return tests;
}

// Print one entry per line: "TestName::browser"
try {
  const tests = discoverTests();
  tests.forEach(t => {
    process.stdout.write(t + '\n');
  });
} catch (err) {
  console.error('Fatal error:', err && err.message ? err.message : String(err));
}