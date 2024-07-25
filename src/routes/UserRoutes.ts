import { Router } from 'express';
import { UserController } from '../controller/UserController';

const router = Router();
const userController = new UserController();

router.post('/users', (req, res) => userController.createUser(req, res));
router.get('/users', (req, res) => userController.getUsers(req, res));
router.get('/users/:id', (req, res) => userController.getUser(req, res));
router.put('/users/:id', (req, res) => userController.updateUser(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

export default router;
