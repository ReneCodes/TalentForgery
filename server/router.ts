const router = require("express").Router();
const UserController = require("./controllers/UserController");
const TutorialController = require("./controllers/TutorialControllers");

router.get("/user", UserController.getUserInformation);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.post("/create-tutorial", TutorialController.createTutorial);
router.get("/all-tutorials", TutorialController.getAllTutorials);

module.exports = router;
