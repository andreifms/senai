import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const especialziacaoSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
});

export const validateEspecializacao = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await especialziacaoSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(error);
  }
};
