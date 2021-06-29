const {createUser, loginUser, logoutUser, currentUser, authorization} = require('./users.controller')
const {Router} = require('express') ;
const userRouter = Router();

userRouter.post('/user', createUser);
userRouter.put('/user', loginUser);
userRouter.patch('/user', logoutUser);
userRouter.get('/user', authorization, currentUser)

module.exports = userRouter ;


