let express = require('express')
const userController = require('../controller/UserCtrl')
const isAuthenticated = require('../middlewares/isAuth')
let router = express.Router()

router.post('/api/users/register',userController.register)
router.post('/api/users/login',userController.login)
router.get('/api/users/profile',isAuthenticated,userController.profile)

module.exports = router