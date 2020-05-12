const Route = require('express').Router();
const { HomeController } = require('../app/controllers/HomeController');

Route.get('/', HomeController.home);