import Bytez from 'bytez.js';
import config from '../config';

const key = config.opn_jrny_api as string;
const sdk = new Bytez(key);
const model = sdk.model('SG161222/RealVisXL_V5.0');

const createWithOpenJourney = async (userPrompt: string) => {
  const { error, output } = await model.run(userPrompt);
  return { error, output };
};

export default createWithOpenJourney;
