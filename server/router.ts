const router = require('express').Router();
const UserController = require('./controllers/UserController');
const InviteController = require('./controllers/InviteController');
const TutorialController = require("./controllers/TutorialControllers");

const { authUser, authAdminUser, userExists } = require('./middleware/AuthMiddleware');

// AUTHENTICATION ROUTES
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/auth_user", authUser, userExists);

// ACCEPT / REJECT USERS
router.post("/accept_user", authAdminUser, UserController.acceptUser);
router.post("/reject_user", authAdminUser, UserController.rejectUser);

// INFORMATION ROUTES
router.get('/invite', authAdminUser, InviteController.getInvite);
router.get('/user', authUser, UserController.getUserInformation);
router.get('/pending_users', authAdminUser, UserController.getPendingUsers);

// TUTORIAL ROUTES
router.get('/get_all_tutorials', authUser, TutorialController.getAllTutorials);
router.post('/create_tutorial', authAdminUser, TutorialController.createTutorial);

// DELETE USER
router.delete('/user', authUser, UserController.deleteMyAccount);
router.delete('/an_user', authAdminUser, UserController.deleteUserAccount);


module.exports = router;
