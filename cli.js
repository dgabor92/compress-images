const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { program } = require("commander");

program
  .arguments("<inputPath>")
  .option("-o, --output <outputPath>", "output path for compressed images")
  .parse(process.argv);

const inputPath = program.args[0];
const outputPath = program.args[1] || inputPath;
if (!outputPath) {
  console.log("Please specify an output path");
  process.exit(1);
}

console.log("inputPath", inputPath);
console.log("outputPath", outputPath);

async function compressImages() {
  try {
    const files = await fs.promises.readdir(inputPath);
    const imageFiles = files.filter((file) =>
      /\.(png|jpe?g|webp)$/i.test(file)
    );

    for (const file of imageFiles) {
      const inputFilePath = path.join(inputPath, file);
      const outputFilePath = path.join(outputPath, file);

      await sharp(inputFilePath).toFile(outputFilePath);
    }

    console.log("Images compressed successfully!");
  } catch (error) {
    console.log("Error compressing images:", error);
  }
}

compressImages();
