const sequelize = require('sequelize');
const { QueryTypes } = require('@sequelize/core');

// status 2 = ativo, 1 = upcoming, 0 = finalizado
const getCompetitions = () => {
  return new Promise((resolve, reject) => {
    const competitions = sequelize.query(`
      SELECT
        name,
        start_at,
        end_at
        CASE
          WHEN CURRENT_TIMESTAMP > end_at THEN 0
          WHEN CURRENT_TIMESTAMP < start_at THEN 1
          ELSE 2
        END AS status
      FROM competitions
      ORDER BY CASE
        WHEN CURRENT_TIMESTAMP > end_at THEN 0
        WHEN CURRENT_TIMESTAMP < start_at THEN 1
        ELSE 2
      END DESC, start_at DESC
      `, { type: QueryTypes.SELECT })
  })
}

module.exports = { getCompetitions }
