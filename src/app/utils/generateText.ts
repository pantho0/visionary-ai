/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GoogleGenAI } from '@google/genai';
import * as fs from 'node:fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API! });

export const generateImages = async (usrprompt: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: usrprompt,
  });
  //@ts-ignore
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData!, 'base64');
      fs.writeFileSync('gemini-native-image.png', buffer);
      console.log(buffer);
      console.log('Image saved as gemini-native-image.png');
    }
  }
};
