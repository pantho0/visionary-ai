import { generateImgSDXLBaseModel } from '../../utils/cldf.sdxl.base_model';
import { deGenerateImage } from '../../utils/deApiGenImg';
import { ImageGenerate } from './imageGen.model';

const generateImageViaAPIFLUX = async (usrPrompt: string) => {
  const generatedIMGData = await deGenerateImage(usrPrompt);
  const result = await ImageGenerate.create(generatedIMGData);
  return result;
};

const generateWithSDXL = async (prompt: string) => {
  const generatedIMGData = await generateImgSDXLBaseModel(prompt);
  const result = await ImageGenerate.create(generatedIMGData);
  return result;
};

const getAllImagesFromDB = async () => {
  const result = await ImageGenerate.find();
  return result;
};

export const imageGenService = {
  generateImageViaAPI: generateImageViaAPIFLUX,
  generateWithSDXL,
  getAllImagesFromDB,
};
