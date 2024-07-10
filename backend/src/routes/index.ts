import express from 'express';
import especilizacaoRoutes from './especializacaoRotas';
import usuarioRotas from "./usuarioRotas";
import casaRotas from "./casaRotas";

const router = express.Router();

router.use(express.json());

router.use('/casas', casaRotas);
router.use('/especializacoes', especilizacaoRoutes);
router.use('/usuarios',usuarioRotas);

router.use((req, res) => {
  res.status(404).send({ message: 'Rota não encontrada' });
});

export default router;
