import 'dotenv/config.js'


export const allowedOrigins = [
    `https://www.yoursite.com`,
    `http://${process.env.AUTH_HOST}:20000`,
    `http://${process.env.AUTH_HOST}:20001`,
    `http://${process.env.AUTH_HOST}:20003`,
    `http://${process.env.AUTH_HOST}:20002`,
    `http://localhost:20000`,
    `http://localhost:20002`,
    `http://localhost:20001`,
    `http://localhost:20003`,
    `http://localhost:5173`

];
