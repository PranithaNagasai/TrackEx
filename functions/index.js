const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
	res.render('main');
});

app.get("/login", (req, res) => {
	res.render('logintrack');
});

app.get("/home", (req, res) => {
	res.render('dash');
});

app.get("/sign", (req, res) => {
	res.render('sign');
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);