import Blog from "../../models/Blog";

// get all blogs data
const getAllBlogs = async (req, res, next) => {
  let blogs;

  // get blog from db
  try {
    blogs = await Blog.find();
  } catch (error) {
    // return error when error getting blog data
    return res.status(500).json({ message: "Error while fetching blog data" }); 
  }

  // return error when no blogs are found
  if (!blogs) {
    console.log("No blog in db");
    return res.status(404).json({ message: "No blogs found" });
  }

  // return success response if blogs are found
  return res.status(200).json({blogs});
}

const addBlog = async (req, res, next) => {
  const { title, description, image, username: user } = req.body;

  const blogPost = new Blog({
    title,
    description,
    image: "xxxx",
    user
  });

  try {
    await blogPost.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while creating new blog"});
  }

  // return success response if no errors
  return res.status(201).json({ message: "User registered successfully", blogPost});
}

const updateBlogData = async (req, res, next) => {
  const { title, description, image } = req.body;
  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image: 'XXXX'
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while updating the blog data." });
  }

  if(!blog) {
    return res.status(404).json({ message: "No such blog exist"});
  }

  return res.status(201).json({ message: "Blog updated successfully", blog});
}

const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;
  
  let blog;
  try {
    blog = await Blog.findById(blogId)
  } catch (error) {
    return res.status(500).json({ message: "Error while getting the blog data." });
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog data found" });
  }

  return res.status(200).json({ blog });
}

export{
  getAllBlogs,
  addBlog,
  updateBlogData,
  getBlogById
}