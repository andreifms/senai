import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '../config/dbConnectionSQL';

const segredo = 'seuSegredoAqui'; // Substitua por um segredo seguro
const saltRounds = 10;

class LoginController {
  static async login(req: Request, res: Response) {
    const {email, senha} = req.body;

    try {
      const usuario = await prisma.usuario.findUnique({where: {email}});

      if (!usuario) {
        return res.status(401).json({mensagem: 'Usuário não encontrado'});
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({mensagem: 'Acesso negado'});
      }

      const token = jwt.sign({id: usuario.id, email: usuario.email}, segredo, {
        expiresIn: '1h'
      });

      res.json({ email: usuario.email, token });
    } catch (error) {
      res.status(500).json({mensagem: 'Erro no servidor'});
    }
  };

  static async logout(req: Request, res: Response) {
    res.json({mensagem: 'Logout realizado com sucesso'});
  };

  static async cadastrarUsuario(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;

    try {
      // Verifica se o usuário já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email }
      });

      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Usuário já existe' });
      }

      // Criptografa a senha
      const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

      // Cria o novo usuário
      const novoUsuario = await prisma.usuario.create({
        data: {
          email,
          senha: senhaCriptografada
        }
      });

      res.status(201).json(novoUsuario);
    } catch (error) {
      next(error);
    }
  };
}

export default LoginController;
