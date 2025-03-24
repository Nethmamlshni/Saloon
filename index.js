import express from 'express';
import bodyParser from 'body-parser';
import Userrouter from './routes/userRoute.js';
import Bookingrouter from './routes/bookingRoute.js';
import Feedbackrouter from './routes/feedbackRoute.js';
import Inforrouter from './routes/informationRoute.js';
import Pricerouter from './routes/priceRoute.js';
import Servicerouter from './routes/serviseRoute.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


const allowedOrigins = ['https://saloon-frontend-new.vercel.app']; 

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow request
      } else {
        callback(new Error('Not allowed by CORS'), false); // Reject request
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(bodyParser.json());

// Routes
app.use('/api/users', Userrouter);
app.use('/api/bookings', Bookingrouter);
app.use('/api/feedbacks', Feedbackrouter);
app.use('/api/information', Inforrouter);
app.use('/api/price', Pricerouter);
app.use('/api/servises', Servicerouter);

// MongoDB connection
const connect = process.env.Mongo_Url;

mongoose.connect(connect)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Server listener
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
