import readline from "readline";
import {
  navigateUp,
  changeDirectory,
  listContents,
  readFileContent,
  createFile,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
} from "./operations/fileOperations.js";
import { printEOL, getCpusInfo } from "./operations/osOperations.js";
import {
  compressFile,
  decompressFile,
} from "./operations/compressOperations.js";
import { calculateFileHash } from "./operations/hashOperations.js";
import {
  printUsername,
  printArchitecture,
  printHomedir,
} from "./operations/printOperations.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const args = process.argv.slice(2);
const usernameArg = args.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Guest";

function printWelcomeMessage(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
}

function printCurrentWorkingDirectory() {
  console.log(`You are currently in ${process.cwd()}`);
}

function handleCommand(command) {
  if (command === ".exit" || command === "exit") {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  } else if (command === "up") {
    navigateUp();
  } else if (command.startsWith("cd")) {
    changeDirectory(command.slice(3).trim());
  } else if (command.startsWith("cat")) {
    const filePath = command.slice(4).trim();
    readFileContent(filePath);
  } else if (command.startsWith("add")) {
    const fileName = command.slice(4).trim();
    createFile(fileName);
  } else if (command.startsWith("rn")) {
    const args = command.slice(3).trim().split(" ");
    const oldFileName = args[0];
    const newFileName = args[1];
    renameFile(oldFileName, newFileName);
  } else if (command.startsWith("cp")) {
    const args = command.slice(3).trim().split(" ");
    const sourcePath = args[0];
    const targetPath = args[1];
    copyFile(sourcePath, targetPath);
  } else if (command.startsWith("mv")) {
    const args = command.slice(3).trim().split(" ");
    const sourcePath = args[0];
    const targetPath = args[1];
    moveFile(sourcePath, targetPath);
  } else if (command === "ls") {
    listContents();
  } else if (command.startsWith("rm")) {
    const filePath = command.slice(3).trim();
    removeFile(filePath);
  } else if (command === "os") {
    printEOL();
  } else if (command === "os --cpus") {
    getCpusInfo();
  } else if (command === "os --homedir") {
    printHomedir();
  } else if (command === "os --username") {
    printUsername();
  } else if (command === "os --architecture") {
    printArchitecture();
  } else if (command.startsWith("hash")) {
    const filePath = command.slice(5).trim();
    calculateFileHash(filePath)
      .then((fileHash) => {
        console.log(`Hash of ${filePath}: ${fileHash}`);
      })
      .catch((error) => {
        console.error(`Error calculating hash: ${error.message}`);
      });
  } else if (command.startsWith("compress")) {
    const args = command.slice(8).trim().split(" ");
    const sourcePath = args[0];
    const destinationPath = args[1];
    compressFile(sourcePath, destinationPath);
  } else if (command.startsWith("decompress")) {
    const args = command.slice(10).trim().split(" ");
    const sourcePath = args[0];
    const destinationPath = args[1];
    decompressFile(sourcePath, destinationPath);
  } else {
    console.log(`Command received: ${command}`);
  }
}

async function promptUser() {
  const userCommand = await new Promise((resolve) =>
    rl.question("> ", resolve)
  );
  handleCommand(userCommand);
  promptUser();
}

process.on("SIGINT", () => {});

process.on("beforeExit", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});

export { printCurrentWorkingDirectory };
printWelcomeMessage(username);
printCurrentWorkingDirectory();

promptUser();
