const mongoose = require('mongoose');
//sample schema and model
const blogSchema = require('./sample_mongo_schema');
const Blog = mongoose.model('Blog', blogSchema);

//Edukit1 schema and model
const Edukit1Schema = require('./edukit1schema');
const Edukit1 = mongoose.model('Edukit1', Edukit1Schema);

const collections = {};

collections.Blog = Blog;
collections.Edukit1 = Edukit1;

module.exports = collections;
