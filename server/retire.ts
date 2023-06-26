const { exec } = require('child_process');

exec('retire', (error: Error, stdout, stderr) => {
  if (error) {
    console.error('Retire.js failed:', error);
  } else {
    console.log('Retire.js vulnerabilities found:', stdout);
  }
});