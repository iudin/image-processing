import { readdir } from 'fs';
import sharp from 'sharp';
import { imgSize, inputDir, outputDir, imgFileTypes } from './constants';

export const makeThumbnail = (fileName: string) => {
  sharp(`${inputDir}/${fileName}`)
    .resize(imgSize, imgSize)
    .toFile(`${outputDir}/${fileName}`, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('SUCCESSFULLY PROCESSED', info);
      }
    });
};

export const isImage = (fileName: string) =>
  imgFileTypes.some((fileType) => fileName.endsWith(fileType));

export const processImages = () => {
  readdir(inputDir, (error, filenames) => {
    if (error) {
      throw error;
    }
    filenames.filter(isImage).forEach(makeThumbnail);
  });
};

console.log('START');
processImages();
