import Blog from '../models/Blog.js';

export const getAllBlogs = async (req, res) => {
  console.log('Fetching all blog posts');
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    console.log('Blogs fetched:', blogs.length);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching all blogs:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  console.log('Creating new blog post:', { title, author });

  try {
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();
    console.log('New blog post created:', newBlog._id);
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating new blog post:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  console.log('Fetching blog post by ID:', req.params.id);
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      console.log('Blog post not found:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log('Blog post fetched:', blog._id);
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  console.log('Updating blog post by ID:', req.params.id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      console.log('Blog post not found for update:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log('Blog post updated:', updatedBlog._id);
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog post:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  console.log('Deleting blog post by ID:', req.params.id);
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      console.log('Blog post not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Blog post not found' });
    }
    console.log('Blog post deleted:', req.params.id);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    console.error('Error deleting blog post:', error.message);
    res.status(500).json({ message: error.message });
  }
};
