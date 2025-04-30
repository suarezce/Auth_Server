import {allowedOrigins} from './allowedOrigins.js';

/* export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
} */

export const corsOptions = {
    origin: (origin, callback) => {
        console.log("Origen recibido:", origin); // 🔼 Depuración
        if (allowedOrigins.includes(origin)) { // ❌ Quita || !origin
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] 
};
