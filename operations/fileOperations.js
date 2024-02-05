import path from "path";
import fs from "fs/promises";
import { printCurrentWorkingDirectory } from "../fileManager.js";

async function readFileContent(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);

  try {
    const fileData = await fs.readFile(fullPath);
    console.log(fileData.toString());
    console.log(`File "${filePath}" read successfully.`);
  } catch (error) {
    console.error(`Error reading file "${filePath}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

async function createFile(fileName) {
  const fullPath = path.resolve(process.cwd(), fileName);

  try {
    await fs.writeFile(fullPath, "");
    console.log(`File "${fileName}" created successfully.`);
  } catch (error) {
    console.error(`Failed to create file "${fileName}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

async function navigateUp() {
  const currentPath = process.cwd();

  if (currentPath !== "C:\\" && currentPath !== "/") {
    const newPath = path.resolve(currentPath, "..");
    try {
      await fs.access(newPath, fs.constants.R_OK | fs.constants.W_OK);
      process.chdir(newPath);
      console.log(`Navigated up to: ${newPath}`);
    } catch (error) {
      console.error(`Error navigating up: ${error.message}`);
    }
  } else {
    console.log("Already at the root directory. Can't navigate up.");
  }

  printCurrentWorkingDirectory();
}

async function changeDirectory(targetPath) {
  const currentPath = process.cwd();
  const newPath = path.resolve(currentPath, targetPath);

  try {
    await fs.access(newPath, fs.constants.X_OK);
    process.chdir(newPath);
    console.log(`Changed directory to: ${newPath}`);
  } catch (error) {
    console.error(`Failed to change directory: ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

async function renameFile(oldFileName, newFileName) {
  const oldFullPath = path.resolve(process.cwd(), oldFileName);
  const newFullPath = path.resolve(process.cwd(), newFileName);

  try {
    await fs.rename(oldFullPath, newFullPath);
    console.log(
      `File "${oldFileName}" renamed to "${newFileName}" successfully.`
    );
  } catch (error) {
    console.error(`Failed to rename file "${oldFileName}": ${error.message}`);
  }

  printCurrentWorkingDirectory();
}

async function copyFile(sourcePath, targetPath) {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));

  const targetDir = path.dirname(targetFile);

  try {
    await fs.access(targetDir, fs.constants.W_OK);
  } catch (error) {
    console.error(`Error: Target directory "${targetDir}" does not exist.`);
    return;
  }

  try {
    const fileData = await fs.readFile(sourceFile);
    await fs.writeFile(targetFile, fileData);

    console.log(`File '${sourcePath}' copied to '${targetPath}' successfully.`);
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
  }
}

async function moveFile(sourcePath, targetPath) {
  const sourceFile = path.resolve(sourcePath);
  const targetFile = path.resolve(targetPath, path.basename(sourcePath));

  const targetDir = path.dirname(targetFile);

  try {
    await fs.access(targetDir, fs.constants.W_OK);
  } catch (error) {
    console.error(`Error: Target directory "${targetDir}" does not exist.`);
    return;
  }

  try {
    await fs.rename(sourceFile, targetFile);
    console.log(`File '${sourcePath}' moved to '${targetPath}' successfully.`);
  } catch (error) {
    console.error(`Error moving file: ${error.message}`);
  }
}

async function removeFile(filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);

  try {
    await fs.unlink(fullPath);
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
  renameFile,
  copyFile,
  moveFile,
  removeFile,
};
