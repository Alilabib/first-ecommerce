const Product = require('../models/Product');

module.exports = {
    home : async (req, res, next)=> {
        try{
            let products = await Product.getAllProducts();
            console.log(products);
            res.render('pages/index',{products1:products});
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
            res.render('pages/category',{products:products});
        } catch (error) {
             console.log(error);
             next();   
        }
    }    
}
