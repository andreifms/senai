import express from 'express';
import UsuarioController from "../controllers/usuarioController";
import { validateUsuario } from "../middlewares/validateUsuario";

const router = express.Router();

router.get('/', UsuarioController.listarUsuarios);
router.post('/', validateUsuario, UsuarioController.criarUsuario);
router.get('/:id', UsuarioController.listarUsuarioPorId);
router.put('/:id', validateUsuario, UsuarioController.atualizarUsuario);
router.delete('/:id', UsuarioController.excluirUsuario);

export default router;
