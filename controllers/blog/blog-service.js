import Blog from "../../models/Blog";

// get blog data from db
const getExisitingBlogData = async ({id}) => {
  try {
    const exisitingBlog = await Blog.findById(id);

    return exisitingBlog;
  } catch (error) {
    throw new Error(error)
  }
}

export {
  getExisitingBlogData,
}