const express = require("express");
const router = express.Router();
const { getCompetitions, getCompetition, getCompetitionRanking } = require('../services/competitionService')
const NotFoundError = require('../errors/NotFoundError');

router.get("/competitions/:id/rankings", async(req, res, next) => {
    //const id = parseInt(req.params.id);
    next(new NotFoundError("Competition not Found!"));
});

module.exports = { url: "/v1", router };