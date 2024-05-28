import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import userRoute from './routes/hospitals';
import docRoute from './routes/doctors';
import {v2 as cloudinary } from 'cloudinary';
import  session from 'express-session';
import passport from 'passport';
import './passport'; // Import the passport configuration
import patientRoute from './routes/patients'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true, // Allow credentials such as cookies, authorization headers, etc.
  }),
);

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: false },
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);
app.use('/api/hospitals', userRoute);
app.use('/api/doctors', docRoute);
app.use('/api/patients', patientRoute)

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});

export default app;
