const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const mainRouter = require('./routes/main');

//config
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: false,
}))
//config ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

//rutas
app.use("/", mainRouter);

app.listen(3000, ()=> {
    console.log('Success!')
})