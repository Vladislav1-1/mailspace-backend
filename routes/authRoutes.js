const express = require('express');
const router = express.Router();
const { register, login, getProfile, changePassword } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, getProfile);

router.get('/admin-panel', verifyToken, isAdmin, (req, res) => {
  status: 200,
  res.json({ 
    message: "Добро пожаловать в панель администратора" 
  });
});

module.exports = router;