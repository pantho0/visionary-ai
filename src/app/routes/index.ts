import { Router } from 'express';
import { ImageGenRoute } from '../modules/imageGeneration/imageGen.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/gen-img',
    route: ImageGenRoute,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
