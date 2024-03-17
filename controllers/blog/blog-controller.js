import Blog from "../../models/Blog";
import { getExisitingUserDataById } from "../user/user-service";
import { getExisitingBlogData } from './blog-service'
import mongoose from 'mongoose'

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

// add blog to database
const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await getExisitingUserDataById({id: user})

    if (!existingUser) {
      return res.status(400).json({ message: "No user found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while fetching data" });
  }

  const blogPost = new Blog({
    title,
    description,
    image: "xxxx",
    user
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blogPost.save({session});
    existingUser.blogs.push(blogPost);
    await existingUser.save({session});
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: "Error while creating blog in DB"});
  }

  // return success response if no errors
  return res.status(201).json({ message: "User registered successfully", blogPost});
}

// update existing blog post
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
    return res.status(500).json({ message: "Error connecting to DB" });
  }

  if(!blog) {
    return res.status(404).json({ message: "No such blog exist"});
  }

  return res.status(201).json({ message: "Blog updated successfully", blog});
}

// get blog post by id
const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;
  
  let blog;
  try {
    blog = await Blog.findById(blogId)
  } catch (error) {
    return res.status(500).json({ message: "Error connecting to DB" });
  }

  if (!blog) {
    return res.status(404).json({ message: "No blog data found" });
  }

  return res.status(200).json({ blog });
}

// delete blog by id
const deleteBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;

  // check if blog data exist or not
  try {
    blog = await getExisitingBlogData({id});

    if (!blog) {
      return res.status(404).json({message:"No blog exists"});
    }
  } catch (error) {
    return res.status(500).json({message:"Error connecting to DB while fetching"});
  }

  try {
    // get blog and user data from collection for that user
    blog = await Blog.findByIdAndRemove(id).populate('user');

    // remove blog data from user
    await blog.user.blogs.pull(blog);

    // save user data after deleting the blog attached to user
    await blog.user.save();
  } catch (error) {
    return res.status(500).json({message:"Error connecting to DB while deleting"});
  }

  return res.status(200).json({ message: "Blog deleted successfully", blog })
}

export{
  getAllBlogs,
  addBlog,
  updateBlogData,
  getBlogById,
  deleteBlogById,
}