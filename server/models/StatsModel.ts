export { };
const { Stats } = require('./Schemas');

const updateUserStats = async (user_id: string, userPassed: boolean, totalRight: number, totalWrong: number) => {

  const userStats = await Stats.findOne({ where: { user_id } });

  if (userPassed) {
    userStats.passed += 1;
  } else {
    userStats.failed += 1;
  };

  userStats.correct_questions += totalRight;
  userStats.wrong_questions += totalWrong;

  await userStats.save();
};

module.exports = { updateUserStats };