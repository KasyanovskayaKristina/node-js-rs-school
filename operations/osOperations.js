import os from "os";

function printEOL() {
  const eol = os.EOL;
  console.log(`End of Line (EOL) for the current operating system: "${eol}"`);
}

function getCpusInfo() {
  const cpus = os.cpus();
  console.log(`Total CPUs: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed / 1000} GHz`); // Преобразование к ГГц
  });
}

export { printEOL, getCpusInfo };
