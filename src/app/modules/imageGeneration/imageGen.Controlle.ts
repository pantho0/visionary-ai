import { Request, Response } from 'express';
import { imageGenService } from './imageGen.service';

const generateImage = async (_req: Request, res: Response) => {
  try {
    const result = await imageGenService.generateImageViaAPI();
    return res
      .status(200)
      .json({ message: 'Image generated successfully', data: result });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error generating image', error: error.message });
  }
};

export const imageGenController = {
  generateImage,
};
