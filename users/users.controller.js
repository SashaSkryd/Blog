const User = require("./Users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

class UserController {
  async createUser(req, res) {
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
    // await unlink(ava.destinationPath)

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

    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.JWT_SECRET,
    );

    const userNew = await User.findByIdAndUpdate(
      user._id,
      { $set: { token } },
      {
        new: true,
      },
    );

    const data = {
      id: user.id,
      email: user.email,
      name: user.name,
      token: userNew.token,
    };

    res.status(201).json({
      ...data,
    });
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Not autorized" });
    }

    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.JWT_SECRET,
    );

    const userNew = await User.findOneAndUpdate(
      { email },
      { $set: { token } },
      {
        new: true,
      },
    );

    return res
      .status(201)
      .json({ name: userNew.name, email: userNew.email, token: userNew.token });
  }

  async logoutUser(req, res) {
    const {
      body: { email },
    } = req;
    const token = "";
    await User.findOneAndUpdate({ email }, { $set: { token } }, { new: true });

    return res.status(200).send("OK");
  }

  async currentUser(req, res) {
    const { name } = req.user;
    return res.json({ name }).status(200);
  }

  async authorization(req, res, next) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res.status(401);
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userID } = payload;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(401);
    }

    req.user = user;

    next();
  }
}

module.exports = new UserController();
