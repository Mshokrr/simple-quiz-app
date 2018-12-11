/* eslint-disable no-console */
const { exec } = require('child_process');

export default (command) => {
  const process = exec(command);

  process.stdout.on('data', (data) => {
    console.log(`STDOUT: ${data.toString()}`);
  });

  process.stderr.on('data', (data) => {
    console.log(`STDERR: ${data.toString()}`);
  });

  process.on('exit', (code) => {
    console.log(`child process exited with code ${code.toString()}`);
  });
};
