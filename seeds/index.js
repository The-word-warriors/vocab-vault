const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedWords = require('./wordsData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
 
  await seedUsers();

  await seedWords();


  process.exit();
};

seedAll();
