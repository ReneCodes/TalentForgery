export { };
const { Stats } = require('./Schemas');

const updateUserStats = async (user_id: string, totalRight: number, totalWrong: number) => {

  const userStats = await Stats.findOne({ where: { user_id } });
  const halfOfQuestions = Math.floor((totalRight + totalWrong) / 2);

  if (totalRight >= halfOfQuestions) {
    userStats.passed += 1;
  } else {
    userStats.failed += 1;
  };

  userStats.correct_questions += totalRight;
  userStats.wrong_questions += totalWrong;

  await userStats.save();
};

module.exports = { updateUserStats };