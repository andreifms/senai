import { Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

class EspecializacaoController {
  static async listarEspecializacoes(req: Request, res: Response): Promise<void> {
    try {
      const listaEspecializacoes = await prisma.especializacao.findMany({
        include: {usuarios: true}
      });
      res.status(200).json(listaEspecializacoes);
    } catch (erro: any) {
      res.status(500).json({message: `Falha ao listar especializações: ${ erro.message }`});
    }
  }

  static async listarEspecializacaoPorID(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const especializacaoEncontrada = await prisma.especializacao.findUnique({
        where: {id: Number(id)},
        include: {usuarios: true}
      });
      if (especializacaoEncontrada) {
        res.status(200).json(especializacaoEncontrada);
      } else {
        res.status(404).json({message: 'Especialização não encontrada'});
      }
    } catch (erro: any) {
      res.status(500).json({message: `${ erro.message } - falha na requisição da especialização`});
    }
  }

  static async cadastrarEspecializacao(req: Request, res: Response): Promise<void> {
    try {
      const {nome} = req.body;

      const novaEspecializacao = await prisma.especializacao.create({
        data: {
          nome
        }
      });
      res.status(201).json({message: 'Criada com sucesso', especializacao: novaEspecializacao});
    } catch (erro: any) {
      if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === 'P2002') {
        res.status(400).json({message: 'Nome da especialização já existe'});
      } else {
        res.status(500).json({message: `${ erro.message } - falha ao cadastrar especialização`});
      }
    }
  }

  static async atualizarEspecializacao(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const {nome} = req.body;
      const especializacaoAtualizada = await prisma.especializacao.update({
        where: {id: Number(id)},
        data: {
          nome
        }
      });
      res.status(200).json({message: 'Especialização atualizada', especializacao: especializacaoAtualizada});
    } catch (erro: any) {
      if (erro instanceof Prisma.PrismaClientKnownRequestError && erro.code === 'P2002') {
        res.status(400).json({message: 'Nome da especialização já existe'});
      } else {
        res.status(500).json({message: `${ erro.message } - falha na atualização`});
      }
    }
  }

  static async deletarEspecializacao(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const especializacao = await prisma.especializacao.findUnique({
        where: {id: Number(id)}
      });

      if (!especializacao) {
        return res.status(404).json({message: 'Especialização não encontrada'});
      }

      await prisma.especializacao.delete({
        where: {id: Number(id)}
      });
      res.status(200).json({message: 'Especialização excluída com sucesso'});
    } catch (erro: any) {
      res.status(500).json({message: `${ erro.message } - falha na exclusão`});
    }
  }
}

export default EspecializacaoController;
