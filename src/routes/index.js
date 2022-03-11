const express = require("express");
const router = express.Router();
const { getCompetitions, getCompetition } = require('../services/competitionService')

router.get("/", (req, res, next) => {
  getCompetitions().then((competitions) => {
    res.status(200).json(competitions);
  })
  .catch((err) => {
    res.status(500).json({ "message": "Ocorreu um erro inesperado, desculpe pelo transtorno."}) 
    console.log(err)
  });
});

router.get("/:id", (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(404).json({ "message": "Competição não encontrada." })
  }
  console.log('oiiiiii lau')

  getCompetition(id).then((competition) => {
    console.log('oiee deu bom')
    res.status(200).json(competition)
  }).catch((err) => {
    console.log('oiee deu ruim')
    res.status(404).json({ "message": "Competição não encontrada."}) 
    console.log(err)
  });
});

router.post('/:id/donations', (req, res, next) => {
  const validAttributes = (({ userName, userEmail, competition, institution, team }) => ({ userName, userEmail, competition, institution, team }))(req.body);

  const query = {
    endAt: { $gte: Date.now() },
    startAt: { $lte: Date.now() },
    Id: validAttributes.competition
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
            competition = competitionModel.findOneAndUpdate({ Id: validAttributes.competition }, { $inc: { 'partialDonationCount': 1 } }).exec()
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

module.exports = { url: "/competitions", router };
