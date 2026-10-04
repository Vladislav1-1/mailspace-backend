const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: "Нет авторизации", 
      message: "Токен доступа отсутствует в заголовке Authorization" 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        error: "Ошибка доступа", 
        message: "Недействительный или просроченный токен" 
      });
    }
    
    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ 
      error: "Доступ запрещен", 
      message: "Требуются права администратора" 
    });
  }
};

module.exports = { verifyToken, isAdmin };