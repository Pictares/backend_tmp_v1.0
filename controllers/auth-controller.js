const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const connectDB = require('../db.js')
const { procRawData } = require('../utils/utils.js')
const { generateAccessToken } = require('../utils/utils.js')
const AuthService = require('../Services/AuthService.js')

class AuthController {
  async registration(req, res) {
    try {
      const { email, password, name } = req.body
      const hashPassword = bcrypt.hashSync(password, 7)
      const user = { email, hashPassword, name }
      const result = await AuthService.registration(user)
      if (result.affectedRows == 0) {
        return res
          .status(400)
          .json({ statusCode: 0, message: 'User already exists' })
      }
      res.json({ statusCode: 1, userId: `${result.insertId}` })
    } catch (error) {
      console.log(error)
      res.status(500).json({ statusCode: 0, message: 'Registration error' })
    }
  }

  async addModeratorRole(req, res) {
    try {
      const { id, role } = req.body
      const result = await AuthService.addModeratorRole(id, role)
      res.json({ status: 1, message: 'Add moderator role ok' })
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ statusCode: 0, message: 'Add moderator role error' })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await AuthService.login(email, password)
      const data = procRawData(result)
      if (!data.length) {
        return res.status(400).json({ statusCode: 0, message: 'Invalid email' })
      }
      const validPassword = bcrypt.compareSync(password, data[0].password)
      if (!validPassword) {
        return res
          .status(400)
          .json({ statusCode: 0, message: 'Invalid password' })
      }
      const user = data[0]
      const token = generateAccessToken(user.id, user.name, user.role)
      res.json({
        statusCode: 1,
        userData: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
        token,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ statusCode: 0, message: 'Login error' })
    }
  }

  async authMe(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res
          .status(403)
          .json({ statusCode: 0, message: 'User are not authorized' })
      }

      const data = jwt.decode(token)

      var dateNow = new Date()

      // if token expired
      if (data.exp < dateNow.getTime() / 1000) {
        return res.status(403).json({ statusCode: 0, message: 'Token expired' })
      }

      res.json({ statusCode: 1, userData: data })
    } catch (error) {
      console.log(error)
      res.status(500).json({ statusCode: 0, message: 'Auth me error' })
    }
  }
}

module.exports = new AuthController()
