const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: {
    required: true,
    type: String
  }
})

const institutionSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  teams: [teamSchema]
})

const competitionSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  partialDonationCount: {
    required: true,
    type: Number,
    default: 0
  },
  startAt: {
    required: true,
    type: Date,
  },
  endAt: {
    required: true,
    type: Date,
  },
  institutions: [institutionSchema]
});

competitionSchema.index({
  endAt: '-1',
  startAt: '-1',
});

module.exports = mongoose.model("Competition", competitionSchema);