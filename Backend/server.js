const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuración del entorno (para cargar las variables de entorno)
dotenv.config();

// Crear la aplicación Express
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Habilitar CORS para permitir solicitudes desde el frontend
app.use(express.json());


// Ruta para manejar la solicitud de contacto
app.post('/contacto', async (req, res) => {
  const { message } = req.body;  // Recibimos el mensaje enviado por el frontend

  // Comprobamos que el mensaje esté presente
  if (!message || message.trim() === '') {
    return res.status(400).json({ status: 'error', mensaje: 'El mensaje no puede estar vacío.' });
  }

  // Configuración del servicio de correo (Nodemailer)
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Si usas Gmail
    auth: {
      user: process.env.EMAIL_FROM,  // Debes tener esta variable en tu archivo .env
      pass: process.env.EMAIL_PASS   // También esta
    }
  });

  // Opciones del correo
  const mailOptions = {
    from: process.env.EMAIL_FROM,   
    to: process.env.EMAIL_TO,       // Destinatario, puede ser tu email
    subject: 'Nuevo mensaje de contacto',
    text: message                    // El mensaje enviado desde el frontend
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
