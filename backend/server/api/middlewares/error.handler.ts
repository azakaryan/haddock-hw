import { Request, Response, NextFunction } from 'express';

// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow
export default function errorHandler(
  err: any,
  // @ts-ignore
  req: Request,
  res: Response,
  // @ts-ignore
  next: NextFunction
) {
  res.status(err.status || 500);
  res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
}
