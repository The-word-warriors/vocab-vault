const User = require("../models/User");

// const { models: { User } } = require('../models');



const userData = [
  {
    username: "halima",
    email: "halima@email.com",
    password: "Password1",
  },
  {
    username: "matt",
    email: "matt@email.com",
    password: "Password1",
  },
  {
    username: "rachel",
    email: "rachel@email.com",
    password: "Password1",
  },
  {
    username: "kar",
    email: "kar@email.com",
    password: "Password1",
  },
  {
    username: "Sal",
    email: "sal@hotmail.com",
    password: "Password1",
  },
  {
    username: "Lernantino",
    email: "lernantino@email.com",
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
