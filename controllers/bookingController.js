import Booking from '../models/bookingModel.js';
import nodemailer from 'nodemailer';


const sendEmailNotification = async (customerName, note, phone, date, time) => {
    try {
        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: process.env.SERVER,
            auth: {
                user: process.env.EMAIL_BOOKING, 
                pass: process.env.BOOKING_PASSWORD,  
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL_BOOKING,
            subject: "New Booking Notification",
            text: `A new booking has been made:\n\nName: ${customerName}\nNote: ${note}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
       console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { customerName, note, phone, date, time } = req.body;

        const newBooking = new Booking(req.body);
        await newBooking.save();

        await sendEmailNotification(customerName, note, phone, date, time);

        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: "Failed to create booking", details: error.message });
    }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
    }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking', details: error.message });
    }
};

// Update a booking
export const updateBooking = async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update booking', details: error.message });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking', details: error.message });
    }
};

// Confirm booking (PUT request)
export const confirmBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
    
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
    
        // Update the booking type to 'confirm'
        booking.type = 'confirm';
        await booking.save();
        console.log(booking
          );
    
        res.status(200).json({ message: 'Booking confirmed successfully', booking });
      } catch (error) {
        res.status(500).json({ error: 'Failed to confirm booking', details: error.message });
      }
    };