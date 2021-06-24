const {createUser} = require('./users.controller')
const {Router} = require('express') ;
const userRouter = Router();


userRouter.post('/user', createUser)

module.exports = userRouter ;


