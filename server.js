// app de Athentication

import 'dotenv/config.js'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { corsOptions } from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import { errorHandler } from './middleware/errorHandler.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import { credentials } from './middleware/credentials.js';
import mongoose from 'mongoose';
import { connectDB } from './config/dbConn.js';
import rootRouter from './routes/root.js';
import authRouter from './routes/auth.js';
import registerRouter from './routes/register.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'
import employersRouter from './routes/api/employees.js'
import usersRouter from './routes/api/users.js'
import rolesRouter from './routes/api/roles.js'


import {createRoles} from "./config/inicialSetup.js";
createRoles()


const app = express();

const PORT = process.env.PORT || 4500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const currentDir = process.cwd();

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', rootRouter);

app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(verifyJWT);
app.use('/register', registerRouter);
app.use('/employees', employersRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});