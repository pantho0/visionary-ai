/* eslint-disable @typescript-eslint/no-explicit-any */

const IMGBB_API_KEY = process.env.IMGBB_API_KEY!;
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;
export const uploadToImageBB = async (
  base64Image: string,
): Promise<{ url: string; delete_url: string }> => {
  const formData = new URLSearchParams();
  formData.append('image', base64Image);
  formData.append('name', `generated-image-${Date.now()}`);

  const imgbbRes = await fetch(IMGBB_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!imgbbRes.ok) {
    const errText = await imgbbRes.text();
    throw new Error(`ImageBB upload failed: ${errText}`);
  }

  const imgbbData: any = await imgbbRes.json();

  if (imgbbData.data && imgbbData.data.image && imgbbData.data.image.url) {
    console.log('Image successfully uploaded to ImageBB.');
    const imageData: { url: string; delete_url: string } = {
      url: imgbbData.data.image.url,
      delete_url: imgbbData.data.delete_url,
    };
    return imageData;
  } else {
    throw new Error(
      `ImageBB upload failed or returned an unexpected response: ${JSON.stringify(imgbbData)}`,
    );
  }
};
