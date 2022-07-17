const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');

router.get('/search', auth, userController.searchUser);
router.get('/get-user/:id', auth, userController.getUser);
router.patch('/edit-user/:id', auth, userController.editUser);

module.exports = router;
