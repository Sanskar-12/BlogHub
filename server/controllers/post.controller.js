import { Post } from "../models/post.model.js";
import ErrorHandler from "../utils/error.js";

// slug for 10 Things To Eat
// 10-things-to-eat
// slug helps blogs to have a better SEO

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new ErrorHandler("You are not allowed to create a post", 400));
  }

  if (!req.body.title || !req.body.content) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      category: req.body.category,
      slug,
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "Post created Successfully",
      post,
    });
  } catch (error) {
    console.log("CREATE POST ERROR", error);
    return next(new ErrorHandler(error, 400));
  }
};
