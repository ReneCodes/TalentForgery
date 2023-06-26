const router = require('express').Router();
const UserController = require('./controllers/UserController');
const InviteController = require('./controllers/InviteController');

router.get('/user', UserController.getUserInformation);
router.get('/invite', InviteController.getInvite);

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;

