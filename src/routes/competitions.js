const express = require("express");
const router = express.Router();
const { getRanking } = require('../services/competitionTeamsService')
const NotFoundError = require('../errors/NotFoundError');

router.get("/competitions/:id/rankings", async(req, res, next) => {
    const id = parseInt(req.params.id);
    const { by } = req.query;
    if (!Number.isInteger(id))
        return next(new NotFoundError("Competition not Found!"));

    const result = await getRanking(id, by);
    res.status(200).json(result);
});

module.exports = { url: "/v1", router };
