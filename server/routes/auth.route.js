const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh_token', authController.generateAccessToken);
router.post('/logout', authController.logout);

module.exports = router;
