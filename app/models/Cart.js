const mongoose = require('mongoose');
const {dbconfig} = require('../../config/dbconfig');

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
},{timestamps:{created_at:'created_at'}},{collection:'products'});

const Cart = mongoose.model('carts',cartSchema);

module.exports = {
    Cart,
    addNewItem : async(data)=>{
        try {
            await  mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS);
            let cart = await new Cart(data);
            return cart.save();
        } catch (error) {
            await mongoose.connection.close();
            console.log(err)
        }

    }
}