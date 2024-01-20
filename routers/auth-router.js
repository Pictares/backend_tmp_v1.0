const Router = require('express')
const authController = require('../controllers/auth-controller.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const roleMiddleware = require('../middleware/roleMiddleware.js')

const router = new Router()

router.post('/registration', authController.registration)
router.post('/auth/login', authController.login)
router.get('/auth/me', authController.authMe)
router.patch(
  '/add_moder',
  roleMiddleware('admin'),
  authController.addModeratorRole
)

module.exports = router
