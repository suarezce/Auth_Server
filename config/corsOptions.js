import {allowedOrigins} from './allowedOrigins.js';


export const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes('*')) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        const m = origin.match(/^http?:\/\/([^/:]+):(\d+)$/);
        if (m) {
            const port = parseInt(m[2], 10);
            if (port >= 20000 && port <= 20005) {
                return callback(null, true);
            }
        }
        callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'Cache-Control'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] 
};