import { Request, Response } from 'express';
import { imageGenService } from './imageGen.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';

const generateImageWithFlux1SNEll = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await imageGenService.generateImageViaAPI(req.body.prompt);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Image Generated Successfully',
    data: result,
  });
});

const generateImageWithSDXL = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await imageGenService.generateWithSDXL(req.body.prompt);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Image Generated Successfully',
    data: result,
  });
});

export const imageGenController = {
  generateImage: generateImageWithFlux1SNEll,
  generateImageWithSDXL,
};
