const mongoose = require('mongoose');
const {dbconfig} = require('../../config/dbconfig');

const productSchema =  mongoose.Schema({
    name:String,
    image:String,
    price:Number,
    description:String,
    category:String,
},{timestamps:{created_at:'created_at'}},{collection:'products'});


const Product = mongoose.model('Product',productSchema);


// module.exports.Product = Product;

module.exports = {
    Product,
    getAllProducts : async() =>{    
        try{
         await  mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS);
         let products = await Product.find({});
         await mongoose.disconnect();
         return products;
        }catch(err){
            console.log(err);
        }
      
    },
    getProductByCategory : async(category)=>{
        try{
           await  mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS);
           let products = await Product.find({category:category});
           await mongoose.disconnect();
           return products;
          }catch(err){
            await mongoose.disconnect();
            console.log(err);
          }
    }
};
 