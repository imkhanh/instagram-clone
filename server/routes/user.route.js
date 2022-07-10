const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.get('/search', auth, userController.searchUser);

module.exports = router;
