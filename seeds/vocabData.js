const Vocab = require("../models/Vocab");
const User = require("../models/User");
const Word = require("../models/Words");

const vocabData = [
    {
        user_id: 2,
        vocab_id: 2,
    },
    {
        user_id: 2,
        vocab_id: 3,
    },
    {
        user_id: 2,
        vocab_id: 4,
    },
];

const seedVocab = () => Vocab.bulkCreate(vocabData);

module.exports = seedVocab;
