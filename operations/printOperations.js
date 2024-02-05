import os from "os";

function printHomedir() {
  const homedir = os.homedir();
  console.log(`Home directory: ${homedir}`);
}

function printUsername() {
  const userInfo = os.userInfo();
  console.log(`Current system username: ${userInfo.username}`);
}

function printArchitecture() {
  const architecture = process.arch;
  console.log(`Node.js binary compiled for architecture: ${architecture}`);
}

export { printArchitecture, printHomedir, printUsername };
