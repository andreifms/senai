import express from 'express';
import EspecializacaoController from "../controllers/especializacaoController";
import { validateEspecializacao } from '../middlewares/validateEspecializacao';

const router = express.Router();

router.get('/', EspecializacaoController.listarEspecializacoes);
router.post('/', validateEspecializacao, EspecializacaoController.cadastrarEspecializacao);
router.get('/:id', EspecializacaoController.listarEspecializacaoPorID);
router.put('/:id', validateEspecializacao, EspecializacaoController.atualizarEspecializacao);
router.delete('/:id', EspecializacaoController.deletarEspecializacao);

export default router;
