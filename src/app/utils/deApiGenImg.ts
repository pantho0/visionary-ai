import fetch from 'node-fetch'; // assuming this is a Node.js environment

const API_KEY = process.env.DEAPI_API_KEY!;
const BASE_URL = 'https://api.deapi.ai/api/v1/client';

// Helper function to pause execution
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const deGenerateImage = async (prompt: string): Promise<string> => {
  const initRes = await fetch(`${BASE_URL}/txt2img`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      // Keeping your existing parameters
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

  // --- 2️⃣ Implement the POLLING LOOP to grab the result ---
  let status = 'pending';
  const maxPollAttempts = 45; // Set a sensible limit to prevent infinite loops
  let attempts = 0;

  while (
    status !== 'done' &&
    status !== 'failed' &&
    attempts < maxPollAttempts
  ) {
    attempts++;
    await sleep(3000); // Wait 3 seconds between checks (adjust as needed)

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
      data: { status: string; result_url?: string };
    };
    status = pollData.status;

    console.log(`Attempt ${attempts}/${maxPollAttempts} - Status: ${status}`);

    if (status === 'done') {
      if (pollData.result_url) {
        return pollData.result_url; // 🎉 SUCCESS: Return the image URL
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

  // This line should technically be unreachable if logic is correct
  return 'Polling ended without result.';
};
