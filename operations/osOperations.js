import os from "os";

function printEOL() {
  try {
    const eol = os.EOL;
    console.log(`End of Line (EOL) for the current operating system: "${eol}"`);
  } catch (error) {
    console.error(`Error getting End of Line (EOL): ${error.message}`);
  }
}

function getCpusInfo() {
  try {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);

    cpus.forEach((cpu, index) => {
      console.log(`CPU ${index + 1}:`);
      console.log(`  Model: ${cpu.model}`);
      console.log(`  Speed: ${cpu.speed / 1000} GHz`);
    });
  } catch (error) {
    console.error(`Error getting CPU information: ${error.message}`);
  }
}

export { printEOL, getCpusInfo };
