import crypto from "crypto";
import { promises as fsPromises } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fsPromises.readFile);

async function calculateFileHash(filePath) {
  const algorithm = "sha256";
  const hash = crypto.createHash(algorithm);

  try {
    const fileData = await readFileAsync(filePath);
    hash.update(fileData);
    const fileHash = hash.digest("hex");
    return fileHash;
  } catch (error) {
    throw error;
  }
}

export { calculateFileHash };
