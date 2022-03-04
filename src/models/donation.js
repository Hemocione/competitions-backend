const mongoose = require("mongoose");
const { Schema } = mongoose;

const donationSchema = new Schema({
  userName: {
    required: true,
    type: String,
  },
  userEmail: {
    required: true,
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
  competition: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Competition",
  },
  institution: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Institution"
  },
  team: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Team"
  }
});

donationSchema.index({
  competition: 'text',
  institution: 'text',
  team: 'text'
});

module.exports = mongoose.model("Donation", donationSchema);
