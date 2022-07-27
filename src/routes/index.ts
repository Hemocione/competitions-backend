import express from 'express'
import { NotFoundError, Unexpected } from '../errors'
import funcWrapper from '../helpers/funcWrapper'
import {
  getCompetitions,
  getCompetition,
  getCompetitionRanking,
} from '../services/competitionService'
import { registerDonation } from '../services/donationService'
import axios from "axios";
const router = express.Router()

router.get(
  '/',
  funcWrapper(async (context) => {
    const competitions = await getCompetitions()
    return competitions
  })
)

router.get(
  '/:id/ranking',
  funcWrapper(async (context) => {
    const id = parseInt(context.req.params.id)
    if (!Number.isInteger(id)) {
      throw new NotFoundError('Competição não encontrada.')
    }

    const ranking = await getCompetitionRanking(id)
    return ranking
  })
)

router.post(
  '/:id/donations',
  funcWrapper(async (context) => {
    const { data: googleResJson } = await axios.post(`https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
          secret: process.env.SECRET_KEY,
          response: context.req.body['g-recaptcha-response']
        }
      }
    )
    if (!googleResJson['success']) {
      console.log(
        `Captcha inválido: ${
          context.req.body['g-recaptcha-response']
        } - error: ${JSON.stringify(googleResJson)}`
      )
      throw new Unexpected('Erro de captcha. Você é um robô?')
    }

    const competitionId = parseInt(context.req.params.id)
    if (!Number.isInteger(competitionId)) {
      throw new NotFoundError('Competição não encontrada.')
    }

    const { user_name, user_email, competitionTeamId } = context.req.body

    try {
      const competition = await getCompetition(competitionId)
      if (competition === null) {
        throw new NotFoundError('Competição não encontrada.')
      } else {
        try {
          const donation = await registerDonation(
            competitionId,
            competitionTeamId,
            user_name,
            user_email
          )
          return donation
        } catch (err) {
          console.log(`Erro [${err}] quando registrando doação.`)
          throw new Unexpected('Erro ao tentar registrar a doação.')
        }
      }
    } catch (err) {
      console.log(`Erro [${err}] quando registrando doação.`)
      throw new Unexpected('Erro ao tentar registrar a doação.')
    }
  })
)

export default { url: '/competitions', router }
