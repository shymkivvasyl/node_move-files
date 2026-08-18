/* eslint-disable no-console */
// write code here
const fs = require('fs');

const [sourceFile, destinationDir] = process.argv.slice(2);

if (!sourceFile || !destinationDir) {
  console.error('Error: Source file and destination directory are required.');
  process.exit(0);
}

if (sourceFile === destinationDir) {
  process.exit(0);
}

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Source file "${sourceFile}" does not exist.`);
  process.exit(0);
}

if (!fs.statSync(sourceFile).isFile()) {
  console.error(`Error: Source file "${sourceFile}" is not a file.`);
  process.exit(0);
}

const path = require('path');
const fileName = path.basename(sourceFile);
const fileRoad = path.join(destinationDir, fileName);

if (destinationDir.endsWith('/')) {
  if (fs.existsSync(destinationDir)) {
    fs.renameSync(sourceFile, fileRoad);
  } else {
    console.error(
      `Error: Destination directory "${destinationDir}" does not exist.`,
    );
    process.exit(0);
  }
} else if (
  fs.existsSync(destinationDir) &&
  fs.statSync(destinationDir).isDirectory()
) {
  fs.renameSync(sourceFile, fileRoad);
  process.exit(0);
} else {
  const pathParent = path.dirname(destinationDir);

  if (!fs.existsSync(pathParent)) {
    console.error("Your parent diractory dosn't exist");
    process.exit(0);
  }
  fs.renameSync(sourceFile, destinationDir);
  process.exit(0);
}
