import express from 'express'
import {
  getCompetitions,
  getCompetition,
  getCompetitionRanking,
} from '../services/competitionService'
import { registerDonation } from '../services/donationService'
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const competitions = await getCompetitions()
    res.status(200).json(competitions)
  } catch (err) {
    res.status(500).json({
      message: 'Ocorreu um erro inesperado, desculpe pelo transtorno.',
    })
    console.log(err)
  }
})

router.get('/:id/ranking', async (req, res, next) => {
  const id = parseInt(req.params.id)
  if (!Number.isInteger(id)) {
    return res.status(404).json({ message: 'Competição não encontrada.' })
  }

  try {
    const ranking = await getCompetitionRanking(id)
    res.status(200).json(ranking)
  } catch (err) {
    res.status(404).json({ message: 'Competição não encontrada.' })
    console.log(err)
  }
})

router.post('/:id/donations', async (req, res, next) => {
  try {
    const googleRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: 'POST',
        body: `secret=${process.env.SECRET_KEY}&response=${req.body['g-recaptcha-response']}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    )
    const googleResJson = await googleRes.json()
    if (!googleResJson['success']) {
      console.log(
        `Captcha inválido: ${
          req.body['g-recaptcha-response']
        } - error: ${JSON.stringify(googleResJson)}`
      )
      return res
        .status(403)
        .json({ message: 'Erro de captcha. Você é um robô?' })
    }
  } catch (err) {
    console.log(`Erro [${err}] ao verificar captcha.`)
    return res.status(500).json({ message: 'Ocorreu um erro inesperado.' })
  }

  const competitionId = parseInt(req.params.id)
  if (!Number.isInteger(competitionId)) {
    return res.status(404).json({ message: 'Competição não encontrada.' })
  }

  const { user_name, user_email, competitionTeamId } = req.body

  try {
    const competition = await getCompetition(competitionId)
    if (competition === null) {
      return res.status(404).json({ message: 'Competição não encontrada.' })
    }
    // else if (competition.getDataValue.status != 2) {
    //   return res.status(422).json({
    //     message:
    //       'Esta competição não está disponível para registro de doações.',
    //   })
    // }
    else {
      try {
        const donation = await registerDonation(
          competitionId,
          competitionTeamId,
          user_name,
          user_email
        )
        return res.status(201).json(donation)
      } catch (err) {
        console.log(`Erro [${err}] quando registrando doação.`)
        return res
          .status(500)
          .json({ message: 'Erro ao tentar registrar a doação.' })
      }
    }
  } catch (err) {
    console.log(`Erro [${err}] quando registrando doação.`)
    return res
      .status(500)
      .json({ message: 'Erro ao tentar registrar a doação.' })
  }
})

export default { url: '/competitions', router }
