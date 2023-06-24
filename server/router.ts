const router = require('express').Router();
const UserController = require('./controllers/UserController');

router.get('/', UserController.getAllInformation);
router.post('/', UserController.registerUser);

module.exports = router;
