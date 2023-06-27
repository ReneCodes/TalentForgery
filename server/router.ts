const router = require('express').Router();
const UserController = require('./controllers/UserController');
const InviteController = require('./controllers/InviteController');
const TutorialController = require("./controllers/TutorialControllers");

const authUser = require('./middleware/AuthMiddleware');

router.get('/user', authUser, UserController.getUserInformation);
router.get('/invite', authUser, InviteController.getInvite);
router.get('/get_all_tutorials', authUser, TutorialController.getAllTutorials);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post('/create_tutorial', authUser, TutorialController.createTutorial);

router.post('/upload', UserController.uploadImage);

module.exports = router;
