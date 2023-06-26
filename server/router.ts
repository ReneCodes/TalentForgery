const router = require('express').Router();
const UserController = require('./controllers/UserController');
const InviteController = require('./controllers/InviteController');
const authUser = require('./middleware/AuthMiddleware');

router.get('/user', authUser, UserController.getUserInformation);
router.get('/invite', authUser, InviteController.getInvite);

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.post('/upload', UserController.uploadImage)
module.exports = router;

