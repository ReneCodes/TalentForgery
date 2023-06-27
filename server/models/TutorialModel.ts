export { };
const { User, Tutorial } =  require('./Schemas');
import { UUID } from "crypto";
import { createdTutorial } from "../types/tutorial";

const createTheTutorial = async (providedInformaion: createdTutorial, user_id: UUID) => {

  const creator = await User.findOne({ where: { user_id } });

  if (creator.role !== "admin") {
    throw new Error("Unauthorized");
  } else {
    await Tutorial.create({
      ...providedInformaion,
      creator_id: user_id,
    });
    return "Tutorial created!";
  }
};

const getAllTheTutorials = async () => {
  try {
    const tutorials = await Tutorial.findAll();
    return tutorials;
  } catch (error) {
    throw new Error("Failed to retreive tutorials");
  }
};

module.exports = { createTheTutorial, getAllTheTutorials };