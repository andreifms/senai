import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const casaSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});

export const validateCasa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await casaSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};
