import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UsuarioController {
  static async listarUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const listaUsuarios = await prisma.usuario.findMany({
        include: { especializacao: true, casa: true }
      });
      res.status(200).json(listaUsuarios);
    } catch (erro: any) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarUsuarioPorId(req: Request, res: Response): Promise<void> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(req.params.id) },
        include: { especializacao: true, casa: true }
      });
      if (usuario) {
        res.json(usuario);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, CPF, celular, especializacaoId, casaId } = req.body;
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          CPF,
          celular,
          especializacaoId,
          casaId
        }
      });
      res.status(201).json(novoUsuario);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, email, CPF, celular, especializacaoId, casaId } = req.body;
      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: Number(id) },
        data: {
          nome,
          email,
          CPF,
          celular,
          especializacaoId,
          casaId
        }
      });
      res.json(usuarioAtualizado);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async excluirUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) }
      });

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await prisma.usuario.delete({
        where: { id: Number(id) }
      });

      res.json({ message: 'Usuário deletado com sucesso', usuario });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default UsuarioController;
