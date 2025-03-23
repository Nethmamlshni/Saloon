import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, required: true, default: 'pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
