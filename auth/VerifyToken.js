const jwt = require('jsonwebtoken')

/**
 * Middleware to verify token for requests
 * expects a token from header
 * passes user data saved in token to controller
 */
// https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.secret, (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ error: 'failed to authenticate token' })
      }
      let user_id = (req.params.user_id ? parseInt(req.params.user_id) : undefined)
      if(user_id === user.id || user_id === undefined ) {
        req.user = user
        next()
      }else {
        return res.status(401).json({error: 'user not authorized to access other user data'})
      }
    })
  } else {
    res.sendStatus(401).json({ error: 'No token provided' })
  }
}

module.exports = verifyToken
