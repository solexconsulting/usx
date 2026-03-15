#!/usr/bin/env node

const { createComponent } = require('./commands/create-component');
const { createTheme } = require('./commands/create-theme');

function printHelp() {
  console.log('agency-ui <command> <name>');
  console.log('');
  console.log('Commands:');
  console.log('  create-component <name>');
  console.log('  create-theme <name>');
}

function run() {
  const [, , command, name] = process.argv;

  if (!command || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'create-component') {
    createComponent(name);
    return;
  }

  if (command === 'create-theme') {
    createTheme(name);
    return;
  }

  console.error(`Unknown command: ${command}`);
  printHelp();
  process.exitCode = 1;
}

run();
