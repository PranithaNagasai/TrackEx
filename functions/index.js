const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/onetime', (req, res) => {
	res.render('onetime');
});

app.get('/mob_login', (req, res) => {
	res.render('mob_login');
});

app.get('/email_login', (req, res) => {
	res.render('email_login');
});

app.get('/mob_config', (req, res) => {
	res.render('pwd');
});

app.get('/email_config', (req, res) => {
	res.render('dash');
});

app.get('/dash', (req, res) => {
	res.render('dash');
});

app.get('/profile', (req, res) => {
	res.render('profile');
});

app.get('/pwd', (req, res) => {
	res.render('pwd');
});

app.get('/setting', (req, res) => {
	var i = 0,j=0,obj1,
		obj,
		school = new Array(),
		fields = new Array();
		var user = req.query.qwe;
		//console.log("\n\n\n\n", user)
	db.collection('sign').doc(user).collection('categories')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(childSnapshot => {
				school[i] = childSnapshot.id;
				fields[i] = childSnapshot.data();
				i++;
			});
			obj = Object.assign({}, school);
			obj1 = Object.assign({}, fields);
			res.render('setting', { obj, obj1 });
			//return;		

		})
		.catch(err => {
			console.log(err);
		});
	
});

app.get('/send', (req, res) => {
	//var schoolName = "Pranitha";
	var usingname = req.query.uname;
	var sch = db.collection('sign').doc(usingname);
	sch.get()
		.then(doc => {
			if (doc.exists) {
				console.warn(usingname + ' already exists.');
				return;
			} else {
				var ob = {
					name: req.query.fname,
					addr: req.query.addr,
					phone: req.query.num,
					dob: req.query.dob,
					username: req.query.uname,
					password: req.query.pass
				};
				db.collection('sign')
					.doc(usingname)
					.set(ob);
				console.log(ob.name);
				//res.redirect('/login'); .update()
				//document.getElementById('uname').value
				return;
			}
		})
		.catch(err => {
			console.log(err);
		});
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);
