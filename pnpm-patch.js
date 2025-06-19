#!/usr/bin/env node

/**
 * This script fixes the common ERR_PNPM_MISSING_HOISTED_LOCATIONS error
 * Run it with: node pnpm-patch.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const modulesYamlPath = path.join(process.cwd(), 'node_modules', '.modules.yaml');

// Check if the file exists
if (!fs.existsSync(modulesYamlPath)) {
  console.error('modules.yaml not found. Run pnpm install first.');
  process.exit(1);
}

try {
  // Read the current file
  const yamlContent = fs.readFileSync(modulesYamlPath, 'utf8');
  const data = yaml.load(yamlContent);

  // Ensure hoistedLocations exists
  if (!data.hoistedLocations) {
    data.hoistedLocations = {};
  }

  // Add missing babel helper if needed
  if (!data.hoistedLocations['@babel/helper-string-parser']) {
    data.hoistedLocations['@babel/helper-string-parser/7.22.5'] = '.pnpm/@babel+helper-string-parser@7.22.5/node_modules/@babel/helper-string-parser';
  }

  // Write back the file
  fs.writeFileSync(modulesYamlPath, yaml.dump(data), 'utf8');
  console.log('modules.yaml patched successfully!');
} catch (error) {
  console.error('Error patching modules.yaml:', error);
  process.exit(1);
}
