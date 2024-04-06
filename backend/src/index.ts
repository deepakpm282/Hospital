import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import userRoute from './routes/users';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    credentials: true, // Allow credentials such as cookies, authorization headers, etc.
  }),
);

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(7000, () => {
  console.log('Server is running on port 7000');
});

export default userRoute;
