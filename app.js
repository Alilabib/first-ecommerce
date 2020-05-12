const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage')));
app.set('view engine', 'ejs');


app.listen(port, () => console.log(`Example app listening on port ${port} !`))