const { User } = require("../models");



const userData = [
  {
    username: "halima",
    email: "halima@gmail.com",
    password: "Password1",
  },
  {
    username: "matt",
    email: "matt@gmail.com",
    password: "Password1",
  },
  {
    username: "rachel",
    email: "rachel@gmail.com",
    password: "Password1",
  },
  {
    username: "kar",
    email: "kar@gmail.com",
    password: "Password1",
  },
  {
    username: "Sal",
    email: "sal@hotmail.com",
    password: "Password1",
  },
  {
    username: "Lernantino",
    email: "lernantino@gmail.com",
    password: "Password1",
  },
  {
    username: "Amiko",
    email: "amiko2k20@aol.com",
    password: "Password1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
