import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    deleteUser 
} from '../controllers/userController.js';

const Userouter = express.Router();

Userouter.post('/register', registerUser);
Userouter.post('/login', loginUser);
Userouter.get('/user', getAllUsers);
Userouter.get('/user/:id', getUserById);
Userouter.delete('/user/:id', deleteUser);

export default Userouter;
