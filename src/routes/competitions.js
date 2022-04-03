const express = require("express");
const router = express.Router();
const { getRankingByCompetitionId } = require('../services/institutionService')
const NotFoundError = require('../errors/NotFoundError');

router.get("/competitions/:id/rankings", async(req, res, next) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id))
        return next(new NotFoundError("Competition not Found!"));

    const result = await getRankingByCompetitionId(id);
    res.status(200).json(result);
});

module.exports = { url: "/v1", router };