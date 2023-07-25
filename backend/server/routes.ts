import { Application, Router } from 'express';

import createModules from './api/modules';

export default function routes(app: Application): void {
  app.use('/api/v1', getDomainRouter());
};

// Private functions
function getDomainRouter() {
  const router = Router();
  const modules = new createModules();

  router.use('/products', modules.productWebModule.router);
  router.use('/order', modules.orderWebModule.router);

  return router;
};
