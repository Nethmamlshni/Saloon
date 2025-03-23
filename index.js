import express from 'express';
import bodyParser from 'body-parser';
import Userouter from './routes/userRoute.js';
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
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', Userouter);
app.use('/api/bookings',Bookingrouter);
app.use('/api/feedbacks',Feedbackrouter);
app.use('/api/information',Inforrouter);
app.use('/api/price',Pricerouter);
app.use('/api/servises',Servicerouter);

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
