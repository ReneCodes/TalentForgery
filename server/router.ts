const router = require('express').Router();
const UserController = require('./controllers/UserController');

router.get('/user', UserController.getUserInformation);

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

router.post("/create-tutorial")
router.get("/all-tutorials")

module.exports = router;

