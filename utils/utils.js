const jwt = require('jsonwebtoken')
const { secret } = require('../config.js')

const func = {
  procRawData: (rawData) => {
    const result = []
    rawData.forEach((element) => {
      const item = {}
      Object.keys(element).forEach((key) => {
        item[key] = element[key]
      })
      result.push(item)
    })
    return result
  },

  generateAccessToken: (id, name, role) => {
    const payload = {
      id,
      name,
      role,
    }
    return jwt.sign(payload, secret, { expiresIn: '1h' })
  },
}

module.exports = func
