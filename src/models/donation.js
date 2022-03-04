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

donationSchema.index({ userEmail: 1, competition: 1 }, { unique: true })

module.exports = mongoose.model("Donation", donationSchema);
