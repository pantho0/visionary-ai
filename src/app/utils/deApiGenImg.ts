import { downloadAndEncodeImage } from './convertImageToBase64';
import { uploadToImageBB } from './imageBBUpload';
import { genImgRes } from '../interface/response';

const API_KEY = process.env.DEAPI_API_KEY!;
const IMGBB_API_KEY = process.env.IMGBB_API_KEY!;
const BASE_URL = 'https://api.deapi.ai/api/v1/client';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const deGenerateImage = async (
  prompt: string,
): Promise<genImgRes | null | undefined | unknown> => {
  if (!IMGBB_API_KEY) {
    throw new Error('IMGBB_API_KEY environment variable is not set.');
  }

  const initRes = await fetch(`${BASE_URL}/txt2img`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      model: 'Flux1schnell',
      width: 512,
      height: 512,
      steps: 4,
      guidance: 7.5,
      seed: 5,
      negative_prompt: 'blur, darkness, noise',
    }),
  });

  if (!initRes.ok) {
    const errText = await initRes.text();
    throw new Error(`deAPI generation failed: ${errText}`);
  }

  const { data: initialData } = (await initRes.json()) as {
    data: { request_id: string };
  };
  const requestId = initialData.request_id;

  console.log(`Request submitted. Task ID: ${requestId}`);

  let status = 'pending';
  const maxPollAttempts = 15;
  let attempts = 0;

  while (
    status !== 'done' &&
    status !== 'failed' &&
    attempts < maxPollAttempts
  ) {
    attempts++;
    await sleep(3000);

    const pollRes = await fetch(`${BASE_URL}/request-status/${requestId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: 'application/json',
      },
    });

    if (!pollRes.ok) {
      const errText = await pollRes.text();
      throw new Error(`deAPI status check failed: ${errText}`);
    }

    const { data: pollData } = (await pollRes.json()) as {
      data: { status: string; result_url?: string; preview?: string };
    };
    status = pollData.status;

    console.log(`Attempt ${attempts}/${maxPollAttempts} - Status: ${status}`);

    if (status === 'done') {
      if (pollData.result_url) {
        const fullSizeBase64 = await downloadAndEncodeImage(
          pollData.result_url,
        );

        const imgbbUrl: { url: string; delete_url: string } =
          await uploadToImageBB(fullSizeBase64);

        return imgbbUrl;
      } else {
        throw new Error('Image generation completed, but no result_url found.');
      }
    }

    if (status === 'failed' || status === 'error') {
      throw new Error(`Image generation task failed with status: ${status}`);
    }
  }

  if (attempts >= maxPollAttempts) {
    throw new Error('Exceeded max polling attempts. Task timed out.');
  }

  return 'Polling ended without result.';
};
