import { model, Schema } from 'mongoose';
import { IImageGenProperties } from './imageGen.interface';

const ImageGenerateSchema = new Schema<IImageGenProperties>({
  url: { type: String, required: true },
  delete_url: { type: String, required: true },
});

export const ImageGenerate = model<IImageGenProperties>(
  'ImageGenerate',
  ImageGenerateSchema,
);
