const Product = require('../models/Product');

module.exports = {
    login : async (req, res, next)=> {
        try{
            res.render('pages/login',{layout:''});
        }catch(err){
            console.log(err);
            next();
        }
    
    },
    auth : async(req, res, next)=>{
        try {
            res.render('pages/category',{products:products});
        } catch (error) {
             console.log(error);
             next();   
        }
    },
    signup: async(req, res, next)=>{
        res.render('pages/signup',{layout:false});
    },
    register: async(req, res,next)=>{
        res.render('pages/signup');
    }

}
