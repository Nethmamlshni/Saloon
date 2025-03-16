import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    deleteUser ,
    forgotPassword,
    resetPassword,
    updateUser
} from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const Userouter = express.Router();

Userouter.post('/register', registerUser);
Userouter.post('/login', loginUser);
Userouter.get('/user', getAllUsers);
Userouter.get('/user/:id',  getUserById);
Userouter.delete('/users/:id',  deleteUser);
Userouter.put('/user/:id', authenticateToken, updateUser);
Userouter.post('/forgot-password', forgotPassword);
Userouter.post('/reset-password',  resetPassword);

export default Userouter;
