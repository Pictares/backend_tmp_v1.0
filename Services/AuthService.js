const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connectDB = require('../db.js')
const { procRawData } = require('../utils/utils.js')
const { generateAccessToken } = require('../utils/utils.js')

class AuthService {
  async registration(user) {
    const query = `INSERT IGNORE INTO users (email, password, name) VALUES ('${user.email}', '${user.hashPassword}', '${user.name}')`
    const result = await connectDB(query)
    return result
  }

  async addModeratorRole(id, role) {
    const query = `UPDATE users SET role='${role}' WHERE id='${id}'`
    const result = await connectDB(query)
    return result
  }

  async login(email, password) {
    const query = `SELECT * FROM users WHERE email='${email}'`
    const result = await connectDB(query)
    return result
  }
}

module.exports = new AuthService()
