const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const competitionModel = require("../models/competition");
const donationModel = require("../models/donation")

router.get("/competitions", (req, res, next) => {
  var query = {}
  if (req.query.available === "true") {
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
  const validAttributes = (({ userName, userEmail, competition, institution, team }) => ({ userName, userEmail, competition, institution, team }))(req.body);

  const query = {
    endAt: { $gte: Date.now() },
    startAt: { $lte: Date.now() },
    _id: validAttributes.competition
  }

  validCompetition = competitionModel.findOne(query).exec()
  validCompetition
    .then((competition) => {
      if (competition === null) {
        return res.status(404).json({ message: "Competição não encontrada." })
      } else {
        const donation = new donationModel(validAttributes);
        donation
          .save()
          .then((donation) => {
            competition = competitionModel.findOneAndUpdate({ _id: validAttributes.competition }, { $inc: { 'partialDonationCount': 1 } }).exec()
            competition
              .catch((err) => {
                console.log(err)
                console.log("error when incrementing competition " + validAttributes.competition)
              })
            return res.status(201).json(donation)
          })
          .catch((err) => {
            if (err instanceof mongoose.mongo.MongoError && err.code === 11000) {
              return res.status(422).json({ message: "Você já doou nesta competição." })
            } else {
              next(err);
            }
          })
      }
    })
    .catch((err) => {
      next(err);
    });
})

module.exports = { url: "/", router };
