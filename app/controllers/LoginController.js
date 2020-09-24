const Product = require('../models/User');
const bodyParser = require('body-parser');
const User = require('../models/User');
const validationResult = require('express-validator').validationResult;
module.exports = {
    login : async (req, res, next)=> {
        try{
            //console.log( req.flash('authError')[0]);
            res.render('pages/login',{layout:false,authError:req.flash('authError')[0],isUser:req.session.userId});
        }catch(err){
            console.log(err);
            next();
        }
    
    },
    auth : async(req, res, next)=>{
        try {
            let data =  await  User.auth(req.body.email,req.body.password,req);
            user = data.user;
            if (user != undefined) {
                req.session.userId = user._id;
                res.redirect('/');
            } else {
                req.flash('authError',data.err.message);
                res.redirect('/login');
            }
        } catch (error) {
             req.flash('authError',data.err.message);
             //console.log(error);
        }
    },
    logout: async(req, res, next)=>{
        await req.session.destroy();
        res.redirect('/login');
    },
    signup: async(req, res, next)=>{

        res.render('pages/signup',{layout:false,
            authError: req.flash('authError')[0],
            validationErrors: req.flash('validationErrors')
            ,isUser:req.session.userId
        });
    },
    register: async(req, res,next)=>{
        if(!validationResult(req).isEmpty()){
            req.flash('validationErrors',validationResult(req).array());
            res.redirect('/signup');
        }else{
            let user =  await  User.createUser(req.body.username,req.body.email,req.body.password);
            if(user){
                res.redirect('/login');
            }else{
                //req.flash('authErr',err.message);
                res.redirect('signup');
            }
        }
    }

}
