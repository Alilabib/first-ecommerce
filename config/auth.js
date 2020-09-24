const e = require("express");

module.exports = { 
    isAuth : async(req, res, next) => {
        if (req.session.userId) {
            next();
        }else{
            res.redirect('/login');
        }
    }
}


