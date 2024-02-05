import zlib from "zlib";
import { promises as fsPromises } from "fs";

async function compressFile(sourcePath, destinationPath) {
  try {
    const stat = await fsPromises.stat(sourcePath);

    if (stat.isDirectory()) {
      throw new Error(
        `Source path '${sourcePath}' is a directory, not a file.`
      );
    }

    const sourceFileData = await fsPromises.readFile(sourcePath);
    const compressedData = zlib.brotliCompressSync(sourceFileData);

    await fsPromises.writeFile(destinationPath, compressedData);

    console.log(
      `File '${sourcePath}' compressed to '${destinationPath}' successfully.`
    );
  } catch (error) {
    console.error(`Error compressing file: ${error.message}`);
  }
}


export { compressFile };
