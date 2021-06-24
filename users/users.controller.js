const User = require('./Users');

class UserController {

    async createUser(req,res){
        try {
            const {body}=req;
            const user = await User.create({...body});
            res.json(user)   
        }
        catch(error){
            res.send(error.message)
        }
    }

}

module.exports = new UserController;
