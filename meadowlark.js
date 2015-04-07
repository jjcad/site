var express = require('express');
var app = express();

//Setup for handlebars
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Setup delivery port
app.set('port', process.env.PORT || 3000);

//Static Middleware declaration
app.use(express.static(__dirname + '/public'));

//Fortune definition
var fortunes = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple."
];

//Home page
app.get('/', function(req, res){
	res.render('home');
});

//About page
app.get('/about', function(req, res){
	var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
	res.render('about', {fortune: randomFortune});
});

//404 page
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

//500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//Logging
app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:'+app.get('port')+';\nPress Ctrl+c to terminate.');
});
