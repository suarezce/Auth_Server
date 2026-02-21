import 'dotenv/config';

const MODE_ENV = process.env.MODE_ENV || 'development';
const isDev = MODE_ENV === 'development' || MODE_ENV === 'enviroment';

export default {
  MODE_ENV,
  PORT: process.env.AUTH_PORT || 20000,
  HOST: isDev ? 'localhost' : (process.env.HOST_PRIVATE || '192.168.1.69'),
  AUTH_URI: process.env.AUTH_URI || `http://${process.env.AUTH_HOST}:20000`,
  HOST_PRIVATE: process.env.HOST_PRIVATE || '192.168.1.69',
  HOST_PUBLIC: process.env.HOST_PUBLIC || '',
  HOST_CLIENTE: process.env.HOST_CLIENTE || '',
};