import zlib from "zlib";
import { promises as fsPromises } from "fs";

async function compressFile(sourcePath, destinationPath) {
  const sourceFileData = await fsPromises.readFile(sourcePath);
  const compressedData = zlib.brotliCompressSync(sourceFileData);

  await fsPromises.writeFile(destinationPath, compressedData);

  console.log(
    `File '${sourcePath}' compressed to '${destinationPath}' successfully.`
  );
}

export { compressFile };
