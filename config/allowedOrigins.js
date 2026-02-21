import "dotenv/config.js";
import config from './config.js';

const ports = [20000,20001,20002,20003,20004,20005];
let origins = [];

if (config.MODE_ENV === 'development' || config.MODE_ENV === 'enviroment') {
  origins.push('*');
} else {
  const hosts = [
    config.HOST,
    config.HOST_PRIVATE,
    config.HOST_PUBLIC,
    'localhost',
    config.HOST_CLIENTE,
  ].filter(Boolean);

  hosts.forEach(h => {
    ports.forEach(p => {
      origins.push(`http://${h}:${p}`);
    });
  });
  origins.unshift('https://www.yoursite.com');
}

export const allowedOrigins = origins;
