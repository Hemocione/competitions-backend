import express from "express";
import { NotFoundError, Unauthorized } from "../errors";
import funcWrapper from "../helpers/funcWrapper";
import {
  getCompetitions,
  getCompetition,
  getCompetitionRanking,
} from "../services/competitionService";
import { registerDonation } from "../services/donationService";
import axios from "axios";
const router = express.Router();

router.get(
  "/",
  funcWrapper(async (context) => {
    const includeUnpublished = context.req.query.includeUnpublished === "true";
    return await getCompetitions(includeUnpublished);
  })
);

router.get(
  "/:id/ranking",
  funcWrapper(async (context) => {
    const id = parseInt(context.req.params.id);
    if (!Number.isInteger(id)) {
      throw new NotFoundError("Competição não encontrada.");
    }

    return await getCompetitionRanking(id);
  })
);

router.post(
  "/:id/donations",
  funcWrapper(async (context) => {
    const { data: googleResJson } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          secret: process.env.SECRET_RECAPTCHA_KEY,
          response: context.req.body["g-recaptcha-response"],
        },
      }
    );
    if (!googleResJson["success"]) {
      console.log(
        `Captcha inválido: ${
          context.req.body["g-recaptcha-response"]
        } - error: ${JSON.stringify(googleResJson)}`
      );
      throw new Unauthorized("Erro de captcha. Você é um robô?");
    }

    const competitionId = parseInt(context.req.params.id);
    if (!Number.isInteger(competitionId)) {
      throw new NotFoundError("Competição não encontrada.");
    }

    const { user_name, user_email, competitionTeamId } = context.req.body;

    const competition = await getCompetition(competitionId);
    if (!competition) throw new NotFoundError("Competição não encontrada.");

    return await registerDonation(
      competitionId,
      competitionTeamId,
      user_name,
      user_email
    );
  })
);

export default { url: "/competitions", router };
