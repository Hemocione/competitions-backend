const express = require("express");
const router = express.Router();
const competitionModel = require("../models/competition");
const donationModel = require("../models/donation")
const { query } = require("express");

router.get("/competitions", (req, res, next) => {
  var query = {}
  if (req.body.available) {
    query['startAt'] = { $lte: Date.now() }
    query['endAt'] = { $gte: Date.now() }
  } else {
    query['endAt'] = { $lt: Date.now() }
  }
  competitions = competitionModel.find(query).exec();
  competitions
    .then((competitions) => {
      res.status(200).json(competitions);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/donations', (req, res, next) => {
  const validAttributes = (({ userName, userEmail, competition, institution, team}) => ({ userName, userEmail, competition, institution, team}))(req.body);
  const donation = new donationModel(validAttributes);
  donation
    .save()
    .then((donation) => {
      res.status(201).json(donation)
    })
    .catch((err) => {
      next(err);
    })
})

module.exports = { url: "/", router };
