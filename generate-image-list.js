const fs = require('fs');
const path = require('path');

const inputDir = 'src/assets/images'; // Folder containing the images
const outputFilePath = 'src/assets/images/image-list.json'; // JSON file output path

console.log('hello from script');

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err}`);
    return;
  }

  const imageList = files.filter(file => /\.(jpe?g|png|gif|jfif)$/i.test(file));
  const jsonData = {
    images: imageList,
  };

  fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error(`Error writing JSON file: ${err}`);
      return;
    }

    console.log(`Image list successfully saved to ${outputFilePath}`);
  });
});
