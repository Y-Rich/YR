const mongoose = require('mongoose');
const blogSchema = require('./sample_mongo_schema');
const Blog = mongoose.model('Blog', blogSchema);

const collections = {};

collections.Blog = Blog;

module.exports = collections;
