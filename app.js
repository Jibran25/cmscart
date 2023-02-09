var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator= require('express-validator');


mongoose.set('strictQuery', false);
mongoose.connect(config.databae);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    //we are connected
    console.log('connection to MongoDB ');
});

var app = express();

app.set('views', path.join(__dirname,'views'));

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname,'public')));
process.env.errors = null;
//body-parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));

 //express validator mniddleware
 
 app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;
    
            while (namespace.length) {
                formParam += '{' + namespace.shift() + '}';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
var adminPages = require('./routes/admin_pages.js');
var pages = require('./routes/pages.js');

app.use('/admin/pages', adminPages);
app.use('/', pages);

var port = 3000;

app.listen(port, function(){
    console.log('Server started at port No '+ port);
}); 
