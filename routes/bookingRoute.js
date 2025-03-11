import express from 'express';
import { 
    createBooking, 
    getAllBookings, 
    getBookingById, 
    updateBooking, 
    deleteBooking 
} from '../controllers/bookingController.js';

const Bookingrouter = express.Router();

Bookingrouter.post('/booking', createBooking);
Bookingrouter.get('/booking', getAllBookings);
Bookingrouter.get('/booking/:id', getBookingById);
Bookingrouter.put('/booking/:id', updateBooking);
Bookingrouter.delete('/booking/:id', deleteBooking);

export default Bookingrouter;
