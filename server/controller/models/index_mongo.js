const mongoose = require('mongoose');
//sample schema and model
const blogSchema = require('./sample_mongo_schema');
const Blog = mongoose.model('Blog', blogSchema);

//Edukit1 schema and model
const Edukit1Schema = require('./edukit1schema');
// const Edukit1 = mongoose.model('Edukit1', Edukit1Schema);
const Edukit1 = mongoose.model('Edukit_test', Edukit1Schema);
const Edukit1SensorSchema = require('./edukit1_sensor_schema');
const Edukit1Sensor = mongoose.model('Edukit1Sensor', Edukit1SensorSchema);

//Edukit2 schema and model -> 작성필요

const collections = {};

collections.Blog = Blog;
// collections.Edukit1 = Edukit1;
collections.Edukit_test = Edukit1;
collections.Edukit1Sensor = Edukit1Sensor;

module.exports = collections;
