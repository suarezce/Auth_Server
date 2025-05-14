import {allowedOrigins} from '../config/allowedOrigins.js';

export const credentials = (req, res, next) => {

//    console.log('este es el req.header', req.headers)

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);

       // Convertir a string para el log    
        
        const headers = res.getHeaders();
        const headersString = JSON.stringify(headers, null, 2);

        console.log('Headers de la respuesta:', headersString);
        
    }
    next();
}

