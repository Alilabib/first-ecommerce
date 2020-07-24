const Route = require('express').Router();
const  HomeController  = require('../app/controllers/HomeController');

Route.get('/', HomeController.home);
Route.get('/category/',HomeController.category);

module.exports = Route;