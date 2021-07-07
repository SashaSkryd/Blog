const { all } = require("../users/users.routes");
const Post = require("./Post");

class PostController {
  async createPost(req, res) {
    const { body } = req;
    const { user } = req;

    if (body.author !== user._id) {
      res.status(403);
    }
    try {
      const post = await Post.create({ ...body, author: user._id, authorName: user.name });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send("error");
    }
  }

  async updatePost(req, res) {
    const { body } = req;
    const {
      params: { postId },
    } = req;
    const { user } = req;

    if (body.author !== user.id) {
      res.status(403);
    }

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $set: { text: body.text } },
        { new: true },
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAllPosts(req, res) {
    const allPosts = await Post.find({});

    res.json(allPosts).status(200);
  }

  async getPostAuthor(req, res) {
    const postAuthor = req.params.postAuthor;
    const getposts = await Post.find({});
    const posts = getposts.filter((el) => el.author === postAuthor);
    res.json(posts).status(200);
  }

  async deletePost(req, res) {
    const {
      params: { postId },
      user: {name,id}
    } = req;
    const post = await Post.findById(postId);
    const authorId = post.author;

    if (id !== authorId) {
      return res.status(403).send("Not available!");
    }

    const deletePost = await Post.findByIdAndRemove(postId);

    const getposts = await Post.find({});
    const posts = getposts.filter((el) => el.author === id);

    res.json(posts).status(200);
  }
}

module.exports = new PostController();
