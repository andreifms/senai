import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

const usuarioSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  CPF: yup.string().required('O CPF é obrigatório'),
  email: yup.string().required('O email é obrigatória'),
  celular: yup.string().required('O celular é obrigatória'),
  casaId: yup.string().required('O id da casa é obrigatório'),
  especializacaoId: yup.string().required('O id da especialização é obrigatório')
});

export const validateUsuario = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await usuarioSchema.validate(req.body, {abortEarly: false});
    next();
  } catch (error) {
    next(error);
  }
};
