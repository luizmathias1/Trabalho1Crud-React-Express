import express from 'express';
import { getUser, createUser, deleteUser, updateUser } from '../../crontroller/user_controller/user_controller.js';

const router = express.Router();

router.get('/users', getUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', updateUser);

export default router;