import express from 'express';
import {
    createFeedback,
    getAllFeedback,
    getFeedbackById,
    deleteFeedback
} from '../controllers/feedbackController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const Feedbackrouter = express.Router();

Feedbackrouter.post('/feedback',  createFeedback);
Feedbackrouter.get('/feedback', getAllFeedback);
Feedbackrouter.get('/feedback/:id', getFeedbackById);
Feedbackrouter.delete('/feedback/:id',  deleteFeedback);

export default Feedbackrouter;