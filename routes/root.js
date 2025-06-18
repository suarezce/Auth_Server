// root del sistema

import express from 'express';
const router = express.Router();
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(path.join(__dirname, '..', 'views', 'index.html'))

router.get('^/$|/index(.html)?', (req, res) => {

    console.log(path.join(__dirname, '..', 'views', 'index.html'))

    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;