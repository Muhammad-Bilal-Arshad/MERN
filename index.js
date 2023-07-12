import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from "body-parser"; 
import officerRoute from './Routes/policeofficer.js';
import stationRoute from './Routes/policestation.js';
import shoppingRoute from './Routes/shoppingcart.js'
import cookieParser from 'cookie-parser';
import { authorize } from './Middleware/auth.js';
import userRoute from './Routes/sign.js'; // Import the user router
import session from 'express-session';

// Configuring the server
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
    secret: 'YourSessionSecret',
    resave: false,
    saveUninitialized: false
  }));

// Routes
app.use('/user', userRoute); // Use the user router
app.use("/officer", authorize, officerRoute);
app.use("/station", authorize, stationRoute);
app.use('/shoppingcart', shoppingRoute);

// DB connection
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => {
    console.log('Server Port: ' + PORT)
  })
}).catch((error) => console.log(error))
