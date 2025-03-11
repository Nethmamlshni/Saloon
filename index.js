import express from 'express';
import bodyParser from 'body-parser';
import Userouter from './routes/userRoute.js';
import Bookingrouter from './routes/bookingRoute.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api/users', Userouter);
app.use('/api/bookings', Bookingrouter);


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded; // Store the decoded token in the request object
        next();
    });
};

export default authenticateToken;


const connect =process.env.Mongo_Url; ;

mongoose.connect(connect)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.listen(3000, (req,res) => {
    console.log('Server is running on port 3000');
    } );