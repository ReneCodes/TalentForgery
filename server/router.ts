const router = require('express').Router();

const UserController = require('./controllers/UserController');
const InviteController = require('./controllers/InviteController');
const TutorialController = require("./controllers/TutorialControllers");
const TestController = require('./controllers/TestController');
const ValidateInformation = require('./controllers/ValidateInformation');

const { authUser, authAdminUser, userExists } = require('./middleware/AuthMiddleware');

// VALIDATION ROUTES
router.post("/validate_email", ValidateInformation.validateEmail);
router.post("/validate_number", ValidateInformation.validateNumber);

router.post("/confirm_email", ValidateInformation.confirmEmail);
router.post("/confirm_number", ValidateInformation.confirmNumber);

// AUTHENTICATION ROUTES
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/auth_user", authUser, userExists);

// ACCEPT / REJECT / UPDATE /GETALL USERS / GET USER STATS
router.post("/accept_user", authAdminUser, UserController.acceptUser);
router.post("/reject_user", authAdminUser, UserController.rejectUser);
router.post("/update_user", authUser, UserController.updateUser);
router.get("/users", authAdminUser, UserController.getAllUsers);
router.post("/user_stats", authAdminUser, UserController.getUserStats);

// INFORMATION ROUTES
router.get('/invite', authAdminUser, InviteController.getInvite);
router.get('/user', authUser, UserController.getUserInformation);
router.get('/pending_users', authAdminUser, UserController.getPendingUsers);

// TUTORIAL ROUTES
router.get('/get_all_tutorials', authAdminUser, TutorialController.getAllTutorials);
router.get('/get_tutorials', authUser, TutorialController.getTutorials);
router.get('/get_all_questions', authUser, TutorialController.getAllQuestions);

router.post('/create_tutorial', authAdminUser, TutorialController.createTutorial);
router.post('/questions', authUser, TutorialController.getQuestions);
router.post('/mark_as_watched', authUser, TutorialController.markTutorial);

// TEST ROUTES
router.post('/handle_test_done', authUser, TestController.handleTest);

// DELETE USER
router.delete('/user', authUser, UserController.deleteMyAccount);
router.delete('/an_user', authAdminUser, UserController.deleteUserAccount);

// LOGOUT
router.delete('/logout', authUser, UserController.logUserOut);

module.exports = router;
