const { Words } = require('../models');

const wordsData = [
  {
    word: "conspectus",
    definition: "A detailed survey or overview of a subject.",
  },
  {
    word: "treatise",
    definition:
      "A formal, usually lengthy, systematic discourse on some subject.",
  },
  {
    word: "help",
    definition: "Action given to provide assistance.",
  },
  {
    word: "link",
    definition:
      "Some text or a graphic in an electronic document that can be activated to display another document or trigger an action.",
  },
  {
    word: "trip",
    definition: "A journey.",
  },
  {
    word: "speaker",
    definition: "One who speaks.",
  },
];

const seedWords = () =>  Words.bulkCreate(wordsData);

module.exports = seedWords;
