const express = require('express');
const Router = require('express-promise-router')();
const jwt =require('jsonwebtoken');

const JWT_SECRET = 'this is jsonwebtoken secret from my app';

Router.route('/').get((req,res,next)=>{
    let token =  jwt.sign({
        name:'ali',
        age: 27
    },JWT_SECRET,{
        expiresIn:'1h'
    });

    res.json({
        token: token
    });
}).post((req, res, next)=>{
    let tokenString = req.header('Authorization');
    let token = tokenString.slice(7,-1); 
    console.log(token);
    //jwt.verify(token,JWT_SECRET);
    res.json({
        'message':'done'
    })
});

module.exports = Router;