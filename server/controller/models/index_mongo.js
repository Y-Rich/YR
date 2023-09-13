const mongoose = require('mongoose');
//sample schema and model
const blogSchema = require('./sample_mongo_schema');
const Blog = mongoose.model('Blog', blogSchema);

//schema and model
const ProductSchema = require('./mongo_productschema');
const Products = mongoose.model('Products', ProductSchema);
// Edukit1
const Edukit1Schema = require('./mongo_edukit1schema');
const Edukit1 = mongoose.model('Edukit1', Edukit1Schema);
const Edukit1SensorSchema = require('./mongo_edukit1SensorSchema');
const Edukit1Sensor = mongoose.model('Edukit1Sensor', Edukit1SensorSchema);

//Edukit2
const Edukit2Schema = require('./mongo_edukit2schema');
const Edukit2 = mongoose.model('Edukit2', Edukit2Schema);
const Edukit2SensorSchema = require('./mongo_edukit2SensorSchema');
const Edukit2Sensor = mongoose.model('Edukit2Sensor', Edukit2SensorSchema);

//컬렉션정의
const collections = {};

collections.Blog = Blog;
collections.Products = Products;
collections.Edukit1 = Edukit1;
collections.Edukit1Sensor = Edukit1Sensor;
collections.Edukit2 = Edukit2;
collections.Edukit2Sensor = Edukit2Sensor;

module.exports = collections;
