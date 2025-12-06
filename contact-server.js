require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, direction, comment } = req.body;

  if (!name || !phone || !email || !direction) {
    return res.status(400).json({ ok: false });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      subject: 'Новая заявка с сайта Logitrack',
      text:
        `Имя / компания: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Email: ${email}\n` +
        `Направление перевозки: ${direction}\n` +
        `Комментарий: ${comment || '-'}`,
    });

    res.json({ ok: true });
  } catch (e) {
    console.error('Mail error', e);
    res.status(500).json({ ok: false });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Contact server started on port ' + port);
});
