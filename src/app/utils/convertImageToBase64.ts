export const downloadAndEncodeImage = async (url: string): Promise<string> => {
  console.log('Downloading full-size image from deAPI result_url...');

  const imageRes = await fetch(url);

  if (!imageRes.ok) {
    const errText = await imageRes.text();
    throw new Error(
      `Failed to download full image from result_url: ${errText}`,
    );
  }

  const arrayBuffer = await imageRes.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return buffer.toString('base64');
};
