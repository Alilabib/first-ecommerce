const express = require('express')
const app = express()
const path = require('path');
const web  = require('./routes/web');
const mongoose = require('mongoose');
const expressLayout  = require('express-ejs-layouts'); 
const {dbconfig} = require('./config/dbconfig');
const port = process.env.PORT || 3001;
// mongoose.connect(dbconfig.db_connection.DB_URL,dbconfig.db_connection.DB_OPTIONS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(expressLayout);
app.set('view engine', 'ejs');

app.use('/',web);
app.listen(port, () => console.log(`Example app listening on port ${port} !`))