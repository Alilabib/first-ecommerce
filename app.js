const express = require('express')
const app = express()
const path = require('path');
const web  = require('./routes/web');
const api  = require('./routes/api'); 
const mongoose = require('mongoose');
const expressLayout  = require('express-ejs-layouts'); 
const {dbconfig} = require('./config/dbconfig');
const bodyParser = require('body-parser');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(flash());
let STORE = new SessionStore({
    uri: dbconfig.db_connection.DB_URL,
    collection:'sessions'
});

app.use(session({
    secret:'this is my secret to hash express sessions ...',
    saveUninitialized:false,
    resave:true,
    store:STORE
}))

app.use(expressLayout);
app.set('view engine', 'ejs');

app.use('/',web);
app.use('/api',api);
app.listen(port, () => console.log(`Example app listening on port ${port} !`))