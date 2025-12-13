import Bytez from 'bytez.js';
import config from '../config';
import { downloadAndEncodeImage } from './convertImageToBase64';
import { uploadToImageBB } from './imageBBUpload';

const key = config.opn_jrny_api as string;
const sdk = new Bytez(key);
const model = sdk.model('SG161222/RealVisXL_V5.0');

const createWithOpenJourney = async (userPrompt: string) => {
  const { error, output } = await model.run(userPrompt);

  if (error) {
    return error;
  }

  if (output) {
    const generateImgToBase64 = await downloadAndEncodeImage(output);
    const imgbbUrl: { url: string; delete_url: string } =
      await uploadToImageBB(generateImgToBase64);

    return imgbbUrl;
  }

  return 'Polling ended without result.';
};

export default createWithOpenJourney;
