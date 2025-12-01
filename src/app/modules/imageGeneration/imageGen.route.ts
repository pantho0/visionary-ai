import { Router } from 'express';
import { imageGenController } from './imageGen.Controlle';

const router = Router();

router.post('/', imageGenController.generateImage);
export const ImageGenRoute = router;
