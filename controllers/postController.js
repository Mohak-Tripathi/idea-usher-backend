// posts.controller.js
const Post = require('../models/postModel');
const Tag = require('../models/tagModel');

const APIFeatures = require('../utils/apiFeatures')

exports.getAllPosts = async (req, res) => {
  // Implement filter, sort, and pagination logic
  
  const resPerPage = 4;
  const postsCount = await Post.countDocuments() // useful in frontend side not in backend. //Will Show total
  
      // console.log(req.query, "check") 
      const apiFeatures = new APIFeatures(Post.find(), req.query)
      .search()
      .sort()
      .filterByDate()
      .pagination(resPerPage) 
  
      // console.log(apiFeatures)
  
      const posts = await apiFeatures.query; // why query?
  
      res.status(200).json({
          success: true,
          count: posts.length, 
          postsCount, //Will showtotal products
          posts,
          resPerPage
      })

};

exports.createPost = async (req, res) => {
  // Use req.file.location for the image URL if using AWS S3
  const { title, description, tags } = req.body;
//   const image = req.file.location;
  
  try {
    const post = await Post.create({ title, description, tags });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.searchPosts = async (req, res) => {
  // Implemented keyword search logic in title and description
  // Used req.query to get the search keywords
  // Sent the response with the matching posts

    
        // console.log(req.query, "check") 
        const apiFeatures = new APIFeatures(Post.find(), req.query)
        .search()
    
        // console.log(apiFeatures)
    
        const posts = await apiFeatures.query; // why query?
    
        res.status(200).json({
            success: true,
            count: posts.length, 
            posts
        })
  
};




 // Implement filtering logic based on tags
  // Use req.query to get the tags
  // Send the response with the filtered posts
exports.filterPostsByTags = async (req, res) => {
    try {
      // Retrieve tags from the request query parameters
      const { tags } = req.query;
  
      console.log(tags, "tags")
      // Check if tags parameter is provided
      if (!tags) {
        return res.status(400).json({ error: 'Tags parameter is required' });
      }
  
      // Convert the comma-separated string of tag IDs to an array
      const tagIds = tags.split(',');

      console.log(tagIds, "tagsid")
  
      // Use $all to find posts that have all specified tags
      const filteredPosts = await Post.find({ tags: { $all: tagIds } }).populate("tags");
  
      res.status(200).json(filteredPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };