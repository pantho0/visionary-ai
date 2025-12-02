import fetch from 'node-fetch';

export const downloadAndEncodeImage = async (url: string): Promise<string> => {
  console.log('Downloading full-size image from deAPI result_url...');
  const imageRes = await fetch(url);

  if (!imageRes.ok) {
    const errText = await imageRes.text();
    throw new Error(
      `Failed to download full image from result_url: ${errText}`,
    );
  }

  const imageBuffer = await imageRes.buffer(); // Convert the buffer to a Base64 string (this is the full-size image data)

  return imageBuffer.toString('base64');
};
