import path from "path";
import fs from "fs";

async function listContents() {
  const currentPath = process.cwd();

  try {
    const contents = await fs.promises.readdir(currentPath);
    const sortedContents = contents.sort();

    console.log("List of contents:");
    for (let index = 0; index < sortedContents.length; index++) {
      const item = sortedContents[index];
      const fullPath = path.join(currentPath, item);
      const stats = await fs.promises.stat(fullPath);

      const isDirectory = stats.isDirectory();
      const type = isDirectory ? "directory" : "file";
      const formattedName = isDirectory ? item + "/" : item;
      console.log(`${index + 1}: ${formattedName}\t${type}`);
    }
  } catch (error) {
    console.error(`Error listing contents: ${error.message}`);
  }
}

export { listContents };
