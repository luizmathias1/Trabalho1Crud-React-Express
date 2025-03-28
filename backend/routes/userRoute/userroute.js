import express from 'express';
import { getUser, postUser, deleteUser, updateUser } from '../controller/user_controller/user_controller.js';

const router = express.Router();

// Rota para obter todos os usuários
router.get('/users', getUser);

// Rota para criar um novo usuário
router.post('/users', postUser);

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', deleteUser);

// Rota para atualizar um usuário pelo ID
router.put('/users/:id', updateUser);

export default router;