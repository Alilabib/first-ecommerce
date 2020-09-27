const express = require('express');
const Router = require('express-promise-router')();
const jwt =require('jsonwebtoken');


Router.route('/',(req,res,next)=>{
    jwt.sign({
        name:'ali',
        age: 27
    }, )
});