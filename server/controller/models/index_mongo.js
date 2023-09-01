const mongoose = require('mongoose');
const blogSchema = require('./mongo_schema');
const Blog = mongoose.model('Blog', blogSchema);

const collections = {};

collections.Blog = Blog;

module.exports = collections;
