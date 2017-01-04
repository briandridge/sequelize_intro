// setup //
var express = require('express');
var app = express();
var port    = process.env.PORT || 3000;
// var routes = require('./config/routes');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://briandridge@localhost:5432/test_sequelize');
// console.log(sequelize);


// dependencies //
var cors = require('cors');
var bodyParser = require('body-parser');
// var path = require('path');
// var logger = require('morgan');


// middleware //
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(routes); 
// app.use(express.static(__dirname + '/public'));
app.use(express.static('index.html'));
// app.use(logger('dev'));

// start server //
app.listen(port, function() {
	console.log("listening on " + port);
});

// models //
var User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  saying: {
    type: Sequelize.STRING
  }
});

User.sync({force: true}).then(function () {
  return User.create({
    name: 'Brian',
    saying: 'HELLO!!!!!!!!'
  });
});

var Book = sequelize.define('book', {
	title: {
		type: Sequelize.STRING
	},
	author: {
		type: Sequelize.STRING
	}
});

Book.sync({force: true}).then(function () {
	return Book.create({
		title: 'Kafka on the Shore',
		author: 'Murakami'
	});
});

// routes //
var router = express.Router();

app.get('/', function (req, res) {
   // res.sendFile(__dirname + '/index.html');

   User.findOne().then(function (user) {
   Book.findOne().then(function (book) {
   	res.json({name: user.name, saying: user.saying, title: book.title, author: book.author});
   });
   });
});


