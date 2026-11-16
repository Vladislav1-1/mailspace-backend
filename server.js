require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const campaignRoutes = require('./routes/campaignRoutes');
const authRoutes = require('./routes/authRoutes');
const campaignMongoRoutes = require('./routes/campaignMongoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mailspace_mongo')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    project: 'MailSpace Backend',
    database: 'PostgreSQL + MongoDB',
    endpoints: {
      postgres: '/api/campaigns',
      mongo: '/api/mongo/campaigns'
    }
  });
});

app.use('/api/campaigns', campaignRoutes);
app.use('/auth', authRoutes);
app.use('/api/mongo/campaigns', campaignMongoRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    message: `Путь ${req.originalUrl} отсутствует на сервере`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: 'Внутренняя ошибка сервера',
    message: err.message || 'Ошибка сервера'
  });
});

app.listen(PORT, () => {
  console.log(`Сервер MailSpace запущен: http://localhost:${PORT}`);
  console.log(`MongoDB эндпоинты: http://localhost:${PORT}/api/mongo/campaigns`);
});