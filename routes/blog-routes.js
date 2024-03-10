import express from 'express';
import { addBlog, getAllBlogs, getBlogById, updateBlogData } from '../controllers/blog/blog-controller';

const blogRouter = express.Router();

// get all blog api call
blogRouter.get("/", getAllBlogs);
// add new blog api call
blogRouter.post("/add", addBlog);
// update existing blog only
blogRouter.put("/update/:id", updateBlogData);
// get blog by id
blogRouter.get("/:id", getBlogById);

export default blogRouter;