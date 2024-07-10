import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'yup';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.inner.map((error: any) => ({
        field: error.path,
        message: error.message,
      })),
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Erro interno do servidor',
  });
};

export default errorHandler;
