const jwt = require('jsonwebtoken')
const { secret } = require('../config.js')

module.exports = (roles) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'User are not authorized' })
    }
    const { role: userRole } = jwt.verify(token, secret)
    if (roles !== userRole) {
      return res.status(403).json({ message: 'Access forbidden' })
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: 'User are not authorized' })
  }
}
