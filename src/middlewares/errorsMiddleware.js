function errorsMiddleware(err, req, res, _) {
  res.header('Content-Type', 'application/json')
  res.status(err.statusCode || 500).send(JSON.stringify(err, null, 4)) // pretty print
}

function notFoundRoute(req, res, _) {
  res.status(404).json({ error: 'Route NOT FOUND' })
}

module.exports = { errorsMiddleware, notFoundRoute }
