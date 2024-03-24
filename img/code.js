const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configura el middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para manejar el envío de correo electrónico
app.post('/enviar-correo', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Configura el transporte SMTP para enviar correo electrónico
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tu_correo@gmail.com',
      pass: 'tu_contraseña'
    }
  });

  // Configura el correo electrónico
  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'mendez.daniela1199@gmail.com',
    subject: 'Nuevo mensaje de contacto desde el sitio web',
    text: `Nombre: ${nombre}\nCorreo electrónico: ${email}\nMensaje: ${mensaje}`
  };

  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado:', info.response);
      res.send('¡El mensaje ha sido enviado correctamente!');
    }
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
