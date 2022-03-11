const express = require("express");
const router = express.Router();
const { getCompetitions, getCompetition, getCompetitionRanking } = require('../services/competitionService')
const { registerDonation } = require('../services/donationService')

router.get("/", async (req, res, next) => {
  try {
    const competitions = await getCompetitions()
    res.status(200).json(competitions);
  } catch (err) {
    res.status(500).json({ "message": "Ocorreu um erro inesperado, desculpe pelo transtorno."}) 
    console.log(err)
  }
});

router.get("/:id/ranking", async (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(404).json({ "message": "Competição não encontrada." })
  }

  try {
    const ranking = await getCompetitionRanking(id)
    res.status(200).json(ranking)
  } catch (err) {
    res.status(404).json({ "message": "Competição não encontrada."}) 
    console.log(err)
  }
});

router.post('/:id/donations', (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(404).json({ "message": "Competição não encontrada." })
  }

  const { user_name, user_email, competitionTeamId } = req.body;

  try {
    const competition = getCompetition(id)
    if (competition === null) {
      return res.status(404).json({ message: "Competição não encontrada." })
    } else if (competition.dataValues.status != 2) {
      return res.status(422).json({ message: "Esta competição não está disponível para registro de doações."})
    } else {
      console.log('retornado')
      try {
        const donation = registerDonation(competitionId, competitionTeamId, user_name, user_email)
        return res.status(201).json(donation)
      } catch(err) {
        console.log(`Erro ${err} quando registrando doação.`)
      }
    }
    } catch (err) {
      next(err)
    }
  }
)

module.exports = { url: "/competitions", router };
