import { Router } from 'express';
import { imageGenController } from './imageGen.Controlle';

const router = Router();

router.get('/', imageGenController.getAllImages);
router.post('/flux1snell', imageGenController.generateImage);
router.post('/sdxl', imageGenController.generateImageWithSDXL);
export const ImageGenRoute = router;
