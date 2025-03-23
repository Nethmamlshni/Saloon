import express from 'express';
import { 
    createBooking, 
    getAllBookings, 
    getBookingById, 
    updateBooking, 
    deleteBooking ,
    confirmBooking
} from '../controllers/bookingController.js';
import authenticateToken from '../middleware/authenticateToken.js';

const Bookingrouter = express.Router();

Bookingrouter.post('/booking', authenticateToken, createBooking);
Bookingrouter.get('/booking', getAllBookings);
Bookingrouter.get('/booking/:id', getBookingById);
Bookingrouter.put('/booking/:id', updateBooking);
Bookingrouter.delete('/booking/:id', deleteBooking);
Bookingrouter.put('/booking/confirm/:id', confirmBooking);

export default Bookingrouter;
