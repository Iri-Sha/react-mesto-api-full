require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const options = {
  origin: [
    'http://localhost:3000',
    'http://shamiren.students.nomoredomains.xyz',
    'https://shamiren.students.nomoredomains.xyz',
    'http://api.shamiren.students.nomoredomains.xyz',
    'https://api.shamiren.students.nomoredomains.xyz',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

const { PORT = 3001 } = process.env;

const app = express();

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT);
