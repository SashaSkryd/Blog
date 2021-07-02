const Post = require("./Post");

class PostController {
  async createPost(req, res) {
    const { body } = req;
    const { user } = req;

    if (body.author !== user.name) {
      res.status(403);
    }

    try {
      const post = await Post.create({ ...body });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send("error");
    }
  }

  async updatePost(req, res) {
    const {
      body: { text },
    } = req;
    const { user } = req;

    if (body.author !== user.name) {
      res.status(403);
    }

    try {
      const post = await Post.findOneAndUpdate(
        { name: user.name },
        { $set: { text } },
        { new: true },
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default new PostController();
