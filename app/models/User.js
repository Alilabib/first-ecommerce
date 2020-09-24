const mongoose = require('mongoose');
const {dbconfig} = require('../../config/dbconfig');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    createUser : async(username, email, password)=>{
        //check if email exists
        // yes => error 
        // no  => create new account 
        try{
            await mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS);
            let oldUser = await User.findOne({email:email});
            if(oldUser){
                return new Error('email is used');
            }
            let hashedPassword = await bcrypt.hash(password,10); 
            let newUser  = new User({username:username,email:email,password:hashedPassword});
            let user     = newUser.save();
            return user; 
        }catch(err){
            await mongoose.connection.close();
            console.log(err)
        }
    },
    auth: async(email, password,req)=>{
        try{
          data = {};
          await mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS);
          let oldUser = await User.findOne({email:email});
          if (!oldUser) {
            throw  new Error('Invalid email');
          }else{
           let check  = await bcrypt.compareSync(password, oldUser.password);
           if(!check){
               mongoose.disconnect();
               throw new Error('password is incorrect');
           }
           data.user = oldUser;
           return data;
          }

        }catch(err){
            await mongoose.connection.close();
            data.err = err;
            return data;
        }
    },

}
