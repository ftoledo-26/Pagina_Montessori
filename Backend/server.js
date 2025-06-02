const express = require('express'); 
const nodemailer = require('nodemailer');
const dotenv = require('dotenv'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');  
const rateLimit = require('express-rate-limit'); 
const cookie = require('cookie-parser');

import { cookiesMiddleware } from './cookies/cookiesMiddleware.js'


cookiesMiddleware.use(express.json());

// Configuración del entorno (para cargar las variables de entorno)
dotenv.config();
const PORT = process.env.PORT || 3000;
// Crear la aplicación Express
const app = express();
app.use(bodyParser.json()); 
app.use(cors()); 
app.use(express.json());



const Limit = rateLimit({
  windowMs: 1 * 60 * 1000, // 60000 MILISEGUNDOS = 1 MINUTO
  max: 3,
  message: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde.' 
})
app.use('/contacto', Limit); 


// Ruta para manejar la solicitud de contactox
app.post('/contacto', async (req, res) => {
  const { message  } = req.body;
  if (!message || message.trim() === '') {
    return res.status(400).json({ status: 'error', mensaje: 'El mensaje no puede estar vacío.' });
  }

  // Configuración del servicio de correo (Nodemailer) usando gmail y el archivo.env
  const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_FROM,  
      pass: process.env.EMAIL_PASS   
    }
  });

  // Opciones del correo
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,   
    to: process.env.EMAIL_TO,      
    subject: 'Nuevo mensaje de contacto',
    text: message                    
  };

  // Intentamos enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: 'ok', mensaje: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).json({ status: 'error', mensaje: 'Hubo un error al enviar el mensaje', error });
  }
});

// Configuración del puerto del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
