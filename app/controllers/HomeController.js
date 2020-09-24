const Product = require('../models/Product');

module.exports = {
    home : async (req, res, next)=> {
        try{
            //console.log(req.session.userId); 
            let products = await Product.getAllProducts();
            //console.log(products);
            res.render('pages/index',{products1:products,isUser:req.session.userId});
        }catch(err){
            console.log(err);
            next();
        }
    
    },
    category : async(req, res, next)=>{
        try {
            let category = req.query.category;
            let products = await Product.getProductByCategory(category);
            console.log(products);
            res.render('pages/category',{products:products,isUser:req.session.userId});
        } catch (error) {
             console.log(error);
             next();   
        }
    }    
}
