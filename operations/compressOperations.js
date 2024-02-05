import zlib from "zlib";
import fs from "fs";

function compressFile(sourcePath, destinationPath) {
  const sourceFileStream = fs.createReadStream(sourcePath);
  const destinationFileStream = fs.createWriteStream(destinationPath);
  const brotliStream = zlib.createBrotliCompress();

  sourceFileStream.pipe(brotliStream).pipe(destinationFileStream);

  destinationFileStream.on("close", () => {
    console.log(
      `File '${sourcePath}' compressed to '${destinationPath}' successfully.`
    );
  });
}

function decompressFile(sourcePath, destinationPath) {
  const sourceFileStream = fs.createReadStream(sourcePath);
  const destinationFileStream = fs.createWriteStream(destinationPath);
  const brotliStream = zlib.createBrotliDecompress();

  sourceFileStream.pipe(brotliStream).pipe(destinationFileStream);

  destinationFileStream.on("close", () => {
    console.log(
      `File '${sourcePath}' decompressed to '${destinationPath}' successfully.`
    );
  });
}

export { compressFile, decompressFile };
