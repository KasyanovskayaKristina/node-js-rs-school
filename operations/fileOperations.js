import path from "path";
import fs from "fs";
import { printCurrentWorkingDirectory } from "../fileManager.js";

function readFileContent(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);

  try {
    const fileStream = fs.createReadStream(fullPath);

    fileStream.on("data", (chunk) => {
      console.log(chunk.toString());
    });

    fileStream.on("end", () => {
      console.log(`File "${filePath}" read successfully.`);
    });

    fileStream.on("error", (error) => {
      console.error(`Error reading file "${filePath}": ${error.message}`);
    });
  } catch (error) {
    console.error(`Failed to read file "${filePath}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

function createFile(fileName) {
  const fullPath = path.resolve(process.cwd(), fileName);

  try {
    fs.writeFileSync(fullPath, "");
    console.log(`File "${fileName}" created successfully.`);
  } catch (error) {
    console.error(`Failed to create file "${fileName}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

function navigateUp() {
  const currentPath = process.cwd();

  if (currentPath !== "C:\\" && currentPath !== "/") {
    const newPath = path.resolve(currentPath, "..");
    process.chdir(newPath);
    console.log(`Navigated up to: ${newPath}`);
  } else {
    console.log("Already at the root directory. Can't navigate up.");
  }

  printCurrentWorkingDirectory();
}

function changeDirectory(targetPath) {
  const currentPath = process.cwd();
  const newPath = path.resolve(currentPath, targetPath);

  try {
    process.chdir(newPath);
    console.log(`Changed directory to: ${newPath}`);
  } catch (error) {
    console.error(`Failed to change directory: ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

function listContents() {
  const currentPath = process.cwd();
  const contents = fs.readdirSync(currentPath).sort();

  console.log("List of contents:");
  contents.forEach((item, index) => {
    const fullPath = path.join(currentPath, item);
    const isDirectory = fs.statSync(fullPath).isDirectory();
    const type = isDirectory ? "directory" : "file";
    const formattedName = isDirectory ? item + "/" : item;
    console.log(`${index + 1}: ${formattedName}\t${type}`);
  });
}

function renameFile(oldFileName, newFileName) {
  const oldFullPath = path.resolve(process.cwd(), oldFileName);
  const newFullPath = path.resolve(process.cwd(), newFileName);

  try {
    fs.renameSync(oldFullPath, newFullPath);
    console.log(
      `File "${oldFileName}" renamed to "${newFileName}" successfully.`
    );
  } catch (error) {
    console.error(`Failed to rename file "${oldFileName}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

function copyFile(sourcePath, targetPath) {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));

  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Target directory "${targetDir}" does not exist.`);
    return;
  }

  const readStream = fs.createReadStream(sourceFile);

  readStream.on("error", (err) => {
    console.error(`Error reading file "${sourceFile}": ${err.message}`);
  });

  const writeStream = fs.createWriteStream(targetFile);

  writeStream.on("error", (err) => {
    console.error(`Error writing to file "${targetFile}": ${err.message}`);
    readStream.close();
  });

  writeStream.on("close", () => {
    console.log(`File '${sourcePath}' copied to '${targetPath}' successfully.`);
  });

  readStream.pipe(writeStream);
}

function moveFile(sourcePath, targetPath) {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));

  const targetDir = path.dirname(targetFile);
  if (!fs.existsSync(targetDir)) {
    console.error(`Error: Target directory "${targetDir}" does not exist.`);
    return;
  }

  fs.rename(sourceFile, targetFile, (err) => {
    if (err) {
      console.error(`Error moving file: ${err.message}`);
    } else {
      console.log(
        `File '${sourcePath}' moved to '${targetPath}' successfully.`
      );
    }
  });
}

function removeFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);

  try {
    fs.unlinkSync(fullPath);
    console.log(`File '${filePath}' removed successfully.`);
  } catch (error) {
    console.error(`Failed to remove file '${filePath}': ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

export {
  readFileContent,
  createFile,
  navigateUp,
  changeDirectory,
  listContents,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
};
