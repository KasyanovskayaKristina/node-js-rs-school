import os from "os";

async function printEOL() {
  try {
    const eol = await new Promise((resolve, reject) => {
      resolve(os.EOL);
    });
    console.log(`End of Line (EOL) for the current operating system: "${eol}"`);
  } catch (error) {
    console.error(`Error getting End of Line (EOL): ${error.message}`);
  }
}

async function getCpusInfo() {
  try {
    const cpus = await new Promise((resolve, reject) => {
      resolve(os.cpus());
    });

    console.log(`Total CPUs: ${cpus.length}`);

    cpus.forEach(async (cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Speed: ${cpu.speed / 1000} GHz`);
    });
  } catch (error) {
    console.error(`Error getting CPU information: ${error.message}`);
  }
}

export { printEOL, getCpusInfo };
