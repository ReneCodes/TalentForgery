const router = require("express").Router();
const UserController = require("./controllers/UserController");
const TutorialController = require("./controllers/TutorialControllers");

router.get("/user", UserController.getUserInformation);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

router.post("/create_tutorial", TutorialController.createTutorial);
router.get("/get_all_tutorials", TutorialController.getAllTutorials);

module.exports = router;
