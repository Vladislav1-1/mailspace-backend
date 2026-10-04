require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const campaignRoutes = require('./routes/campaignRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({
    project: "MailSpace API",
    version: "1.0.0",
    description: "Серверная платформа управления массовыми рассылками",
    endpoints: "/api/campaigns"
  });
});

app.use('/api/campaigns', campaignRoutes);
app.use('/auth', authRoutes); 

app.use((req, res, next) => {
  res.status(404).json({
    error: "Маршрут не найден",
    message: `Путь ${req.originalUrl} отсутствует на сервере`
  });
});

app.use((err, req, res, next) => {
  console.error("Глобальная ошибка сервера:", err.stack);
  res.status(err.status || 500).json({
    error: "Внутренняя ошибка сервера",
    message: err.message || "Непредвиденный сбой сервера"
  });
});

app.listen(PORT, () => {
  console.log(`Сервер MailSpace запущен: http://localhost:${PORT}`);
  console.log(`Эндпоинт рассылок: http://localhost:${PORT}/api/campaigns`);
});