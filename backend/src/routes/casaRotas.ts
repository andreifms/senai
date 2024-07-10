import express from 'express';
import CasaController from "../controllers/casaController";
import { validateCasa } from '../middlewares/validateCasa';

const router = express.Router();

router.get('/', CasaController.listarCasas);
router.post('/', validateCasa, CasaController.cadastrarCasa);
router.get('/:id', CasaController.listarCasaPorID);
router.put('/:id', validateCasa, CasaController.atualizarCasa);
router.delete('/:id', CasaController.deletarCasa);

export default router;
