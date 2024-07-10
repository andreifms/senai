import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class CasaController {
  static async listarCasas(req: Request, res: Response): Promise<void> {
    try {
      const listaCasas = await prisma.casa.findMany({
        include: {usuarios: true}
      });
      res.status(200).json(listaCasas);
    } catch (erro: any) {
      res.status(500).json({message: `Falha ao listar casas: ${ erro.message }`});
    }
  }

  static async listarCasaPorID(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const casaEncontrada = await prisma.casa.findUnique({
        where: {id: Number(id)},
        include: {usuarios: true}
      });
      if (casaEncontrada) {
        res.status(200).json(casaEncontrada);
      } else {
        res.status(404).json({message: 'Casa não encontrada'});
      }
    } catch (erro: any) {
      res.status(500).json({message: `${ erro.message } - falha na requisição da casa`});
    }
  }

  static async cadastrarCasa(req: Request, res: Response): Promise<void> {
    try {
      const {nome} = req.body;

      const novaCasa = await prisma.casa.create({
        data: {
          nome
        }
      });
      res.status(201).json({message: 'Criada com sucesso', casa: novaCasa});
    } catch (erro: any) {
      if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === 'P2002') {
        res.status(400).json({message: 'Nome da casa já existe'});
      } else {
        res.status(500).json({message: `${ erro.message } - falha ao cadastrar casa`});
      }
    }
  }

  static async atualizarCasa(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const {nome} = req.body;
      const casaAtualizada = await prisma.casa.update({
        where: {id: Number(id)},
        data: {
          nome
        }
      });
      res.status(200).json({message: 'Casa atualizada', casa: casaAtualizada});
    } catch (erro: any) {
      if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === 'P2002') {
        res.status(400).json({message: 'Nome da casa já existe'});
      } else {
        res.status(500).json({message: `${ erro.message } - falha na atualização`});
      }
    }
  }

  static async deletarCasa(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const casa = await prisma.casa.findUnique({
        where: { id: Number(id) }
      });

      if (!casa) {
        return res.status(404).json({ message: 'Casa não encontrada' });
      }

      await prisma.casa.delete({
        where: {id: Number(id)}
      });
      res.status(200).json({message: 'Casa excluída com sucesso'});
    } catch (erro: any) {
      res.status(500).json({message: `${ erro.message } - falha na exclusão`});
    }
  }
}

export default CasaController;
