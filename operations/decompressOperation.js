import zlib from "zlib";
import { promises as fsPromises } from "fs";

async function decompressFile(sourcePath, destinationPath) {
  try {
    const stat = await fsPromises.stat(sourcePath);

    if (stat.isDirectory()) {
      throw new Error(
        `Source path '${sourcePath}' is a directory, not a file.`
      );
    }

    const compressedData = await fsPromises.readFile(sourcePath);
    const decompressedData = zlib.brotliDecompressSync(compressedData);

    await fsPromises.writeFile(destinationPath, decompressedData);

    console.log(
      `File '${sourcePath}' decompressed to '${destinationPath}' successfully.`
    );
  } catch (error) {
    console.error(`Error decompressing file: ${error.message}`);
  }
}

export { decompressFile };
