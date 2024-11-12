// import { Request, Response, NextFunction } from 'express';

// export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
// };


import { Request, Response, NextFunction } from 'express';

// Express error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
};
