/* eslint-disable @typescript-eslint/no-explicit-any */
import Bytez from 'bytez.js';
import config from '../config';
import { downloadAndEncodeImage } from './convertImageToBase64';
import { uploadToImageBB } from './imageBBUpload';

const key = config.opn_jrny_api as string;
const sdk = new Bytez(key);

const createWithOpenJourney = async (userPrompt: string) => {
  try {
    const model = sdk.model('SG161222/RealVisXL_V5.0');
    const { error, output } = await model.run(userPrompt);

    if (error) {
      return { success: false, message: error };
    }

    if (!output) {
      return { success: false, message: 'No output returned from model' };
    }

    const base64Image = await downloadAndEncodeImage(output);
    const { url, delete_url } = await uploadToImageBB(base64Image);

    return {
      success: true,
      url,
      delete_url,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Internal Server Error',
    };
  }
};

export default createWithOpenJourney;
