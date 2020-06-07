import express from 'express';
import mongoose from 'mongoose';
import { TodoItemsRoute } from '../routes/api/todo-items.route.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environmental variables
dotenv.config();

// Start express server
const app = express();

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

// Assign express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/todo-items', TodoItemsRoute);

// Connect to MongoDB Atlas server
mongoose
    .connect(process.env.ATLAS_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err));
