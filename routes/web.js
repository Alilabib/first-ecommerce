const express = require('express');
const Router = require('express-promise-router')();
const HomeController  = require('../app/controllers/HomeController');
const LoginController = require('../app/controllers/LoginController');
const check = require('express-validator').check;
const {isAuth}  = require('./../config/auth'); 
Router.route('/').get(isAuth,HomeController.home);
Router.route('/category/').get(HomeController.category);
Router.route('/login').get(LoginController.login)
.post(LoginController.auth);
Router.route('/signup').get(LoginController.signup)
.post(
    check('name').not().isEmpty().withMessage('name is required'),
    check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('Check valid Email'),
    check('password').isLength({min:6}).withMessage('password must at least 6'),
    check('confirm_password').custom((value,{req})=>{
        if(value === req.body.password) return true
        else throw 'password dont equal'
    })
,LoginController.register);
Router.route('/logout').get(LoginController.logout);
module.exports = Router;