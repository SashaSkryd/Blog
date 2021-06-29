const User = require('./Users');
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

class UserController {

    async createUser(req,res){
        // try {
        //     const {body}=req;
        //     const user = await User.create({...body});
        //     res.json(user)   
        // }
        // catch(error){
        //     res.send(error.message)
        // }
    

// ========================================================================

    const { body } = req;

    const hashedPassword = await bcrypt.hash(body.password, 14);
    const tokenToVerify = await uuidv4();
  
    const isEmailExist = await User.findOne({
      email: body.email,
    });
    if (isEmailExist) {
      return res.status(409).send({ message: "Email in use" });
    }
    // const avatarTitle = Date.now();
    // const avatar = Avatar.builder(
    //   Avatar.Image.margin(Avatar.Image.circleMask(Avatar.Image.identicon())),
    //   128,
    //   128,
    //   {
    //     cache: Avatar.Cache.lru(),
    //   },
    // )
    //   .create(body)
    //   .then((buffer) => fs.writeFileSync(`tmp/${avatarTitle}.png`, buffer));
  
    // const files = await minifyImage([`tmp/${avatarTitle}.png`], {
    //   destination: "public/images",
    //   plugins: [
    //     imageminPngquant({
    //       quality: [0.6, 0.8],
    //     }),
    //   ],
    // });
  
    // const [ava] = files;
  
    // let avatarURL = "";
    // await cloudinary.uploader.upload(
    //   ava.destinationPath,
    //   function (error, result) {
    //     avatarURL = result.secure_url;
    //   },
    // );
  
    // await unlink(`tmp/${avatarTitle}.png`);
    // await unlink(ava.destinationPath);
  
    const user = await User.create({
      ...body,
    //   avatarURL,
      password: hashedPassword,
      verificationToken: tokenToVerify,
    });
  
    if (!user) {
      return res.status(500).send({ message: "Something went wrong" });
    }
    // TODO: SEND VERIFICATION ROUTE//
    // await sendVerificationEmail(body.email, tokenToVerify);
    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
    };
    res.status(201).json({
      ...data,
    });
    };

}

module.exports = new UserController;
