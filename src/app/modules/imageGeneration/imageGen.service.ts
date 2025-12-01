import { deGenerateImage } from '../../utils/deApiGenImg';

const generateImageViaAPI = async (usrPrompt: string) => {
  const result = await deGenerateImage(usrPrompt);
  return result;
};

export const imageGenService = {
  generateImageViaAPI,
};
