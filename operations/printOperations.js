import os from "os";
import { promisify } from "util";

async function printHomedir() {
  try {
    const homedir = os.homedir();
    console.log(`Home directory: ${homedir}`);
  } catch (error) {
    console.error(`Error getting home directory: ${error.message}`);
  }
}

async function printUsername() {
  try {
    const userInfo = os.userInfo();
    console.log(`Current system username: ${userInfo.username}`);
  } catch (error) {
    console.error(`Error getting system username: ${error.message}`);
  }
}

async function printArchitecture() {
  try {
    const architecture = process.arch;
    console.log(`Node.js binary compiled for architecture: ${architecture}`);
  } catch (error) {
    console.error(`Error getting architecture information: ${error.message}`);
  }
}

export { printArchitecture, printHomedir, printUsername };
