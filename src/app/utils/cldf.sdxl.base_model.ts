import fetch from 'node-fetch';
import { uploadToImageBB } from './imageBBUpload';
const SDXL_BASE_URL = process.env.SDXL_BASE_URL;
const SDXL_API_KEY = process.env.SDXL_API_KEY;

export const generateImgSDXLBaseModel = async (prompt: string) => {
  if (!SDXL_BASE_URL || !SDXL_API_KEY) {
    throw new Error('SDXL_BASE_URL or SDXL_API_KEY is not defined');
  }

  const res = await fetch(SDXL_BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SDXL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error(`SDXL API error: ${res.status} ${res.statusText}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  const base64 = buffer.toString('base64');

  const imageData = uploadToImageBB(base64);

  return imageData;
};
