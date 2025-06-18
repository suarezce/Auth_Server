// app de Athentication
import 'dotenv/config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

// Configuración
import { corsOptions } from '../config/corsOptions.js';
import { connectDB } from '../config/dbConn.js';
import { createRoles } from '../config/inicialSetup.js';

// Middleware
import { logger } from '../middleware/logEvents.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { credentials } from '../middleware/credentials.js';

// Routers
import rootRouter from '../routes/root.js';
import authRouter from '../routes/auth.js';
import registerRouter from '../routes/register.js';
import refreshRouter from '../routes/refresh.js';
import logoutRouter from '../routes/logout.js';
import employersRouter from '../routes/api/employees.js';
import usersRouter from '../routes/api/users.js';
import rolesRouter from '../routes/api/roles.js';

// Configuración inicial
const app = express();
const PORT = process.env.AUTH_PORT || 3800;

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ======================
// Inicialización del App
// ======================

// 1. Conexión a MongoDB
const initializeDatabase = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');
    
    // Crear roles después de conectar a la DB
    await createRoles();
    console.log('✅ Initial roles created');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};

// 2. Middleware
const setupMiddleware = () => {
  // Middleware personalizados
  app.use(logger);
  app.use(credentials); // Antes de CORS
  
  // Configuración CORS
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
    );
    next();
  });
  
  app.use(cors(corsOptions));
  
  // Parsers
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  
  // Archivos estáticos
  console.log(path.join(__dirname, '../public'))
  app.use(express.static(path.join(__dirname, '../public')));
};

// 3. Configuración de rutas
const setupRoutes = () => {
  // Rutas públicas
  app.use('/', rootRouter);
  app.use('/auth', authRouter);
  app.use('/refresh', refreshRouter);
  app.use('/logout', logoutRouter);
  
  // Middleware de autenticación para rutas protegidas
  app.use(verifyJWT);
  
  // Rutas protegidas
  app.use('/register', registerRouter);
  app.use('/employees', employersRouter);
  app.use('/users', usersRouter);
  app.use('/roles', rolesRouter);
  
  // Manejo de rutas no encontradas (404)
  app.all('*', (req, res) => {
    res.status(404);
    
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
      res.json({ error: "404 Not Found" });
    } else {
      res.type('txt').send("404 Not Found");
    }
  });
  
  // Middleware de manejo de errores
  app.use(errorHandler);
};

// 4. Iniciar servidor
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Access at: http://localhost:${PORT}`);
  });
};

// ======================
// Inicialización de la App
// ======================
const initializeApp = async () => {
  try {
    await initializeDatabase();
    setupMiddleware();
    setupRoutes();
    startServer();
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
initializeApp();