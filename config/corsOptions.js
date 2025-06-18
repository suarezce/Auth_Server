import {allowedOrigins} from './allowedOrigins.js';


export const corsOptions = {
    origin: (origin, callback) => {
        // Permite solicitudes sin 'Origin' (same-origin) o desde orígenes permitidos
        if (!origin || allowedOrigins.includes(origin)) { // ✅ ¡Corrección clave!
            console.log(origin)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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