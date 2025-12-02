import { generateImgSDXLBaseModel } from '../../utils/cldf.sdxl.base_model';
import { deGenerateImage } from '../../utils/deApiGenImg';

const generateImageViaAPIFLUX = async (usrPrompt: string) => {
  const result = await deGenerateImage(usrPrompt);
  return result;
};

const generateWithSDXL = async (prompt: string) => {
  console.log(prompt);
  const result = await generateImgSDXLBaseModel(prompt);
  return result;
};

export const imageGenService = {
  generateImageViaAPI: generateImageViaAPIFLUX,
  generateWithSDXL,
};
