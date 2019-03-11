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

app.get('/showana', (req, res) => {
	res.render('showanalysis');
});

app.get('/analysis', (req, res) => {
	var i = 0,
		j = 0,
		obj1,
		obj,
		school = new Array(),
		fields = new Array();
	var user = req.query.qwe;
	//console.log("\n\n\n\n", user)
	db.collection('sign')
		.doc(user)
		.collection('categories')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(childSnapshot => {
				school[i] = childSnapshot.id;
				fields[i] = childSnapshot.data();
				console.log(
					'\ndate\n',
					childSnapshot.data().date.substring(4, 7)
				);
				i++;
			});
			obj = Object.assign({}, school);
			obj1 = Object.assign({}, fields);
			console.log('\n\n\n', obj1);
			res.render('analysis', { obj, obj1 });

			//return;
		})
		.catch(err => {
			console.log(err);
		});
});

app.get('/month', (req, res) => {
	var mymon = req.query.mon;
	console.log('\nmymon\n', mymon);
	var i = 0,
		j = 0,
		obj1,
		obj,
		school = new Array(),
		fields = new Array();
	var user = req.query.qwenew;
	//console.log("\n\n\n\n", user)
	db.collection('sign')
		.doc(user)
		.collection('categories')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(childSnapshot => {
				if (childSnapshot.data().date.substring(4, 7) == mymon) {
					console.log('\n\nhere');
					school[i] = childSnapshot.id;
					fields[i] = childSnapshot.data();
					//console.log("\ndate\n",childSnapshot.data().date.substring(4,7))
					i++;
				}
			});
			obj = Object.assign({}, school);
			obj1 = Object.assign({}, fields);
			console.log('\n\n\n', obj1);
			res.render('analysis', { obj, obj1 });

			//return;
		})
		.catch(err => {
			console.log(err);
		});
});

app.get('/graph', (req, res) => {
	// var i = 0,j=0,
	// 	obj,
	// 	school = new Array();
	// 	fields = new Array();
	// 	var user = req.query.qwe;
	// 	//console.log("\n\n\n\n", user)
	// db.collection('sign').doc(user).collection('categories')
	// 	.get()
	// 	.then(querySnapshot => {
	// 		querySnapshot.forEach(childSnapshot => {
	// 			school[i] = childSnapshot.id;
	// 			fields[i] = childSnapshot.data();
	// 			i++;
	// 		});
	// 		obj = Object.assign({}, school);
	// 		obj1 = Object.assign({}, fields);
	// 		res.render('graph',{ obj, obj1 });
	// 		//return;

	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	res.render('graph');
});

app.get('/transaction', (req, res) => {
	var i = 0,
		obj, obj1,
		categories = new Array(),
		transactions = new Array();
	db.collection('sign').doc(req.query.qwe).collection('transaction')
		.get()
		.then(querySnapshot => {
			//console.log("\nquerysnap ",querySnapshot);
			querySnapshot.forEach(childSnapshot => {
				var tran = 'tran' + i;
				console.log('\n\n\n', tran);
				categories[i] = childSnapshot.id;
				transactions[i] = childSnapshot.data()[tran];
				i++;
			});
			obj = Object.assign({}, categories);
			obj1 = Object.assign({}, transactions);
			console.log('\n\nobj is', obj);
			console.log('\n\nobj1 is', obj1);
			res.render('transaction',{ obj, obj1 });
		})
		.catch(err => {
			console.log(err);
		});
});

app.get('/setting', (req, res) => {
	var i = 0,
		j = 0,
		obj1,
		k = 0,
		obj,
		school = new Array(),
		fields = new Array();
	var user = req.query.qwe;
	//console.log("\n\n\n\n", user)
	db.collection('sign')
		.doc(user)
		.collection('categories')
		.get()
		.then(querySnapshot => {
			querySnapshot.forEach(childSnapshot => {
				school[i] = childSnapshot.id;
				if (childSnapshot.data() != 'undefined') {
					fields[i] = childSnapshot.data();
				}
				i++;
			});
			obj = Object.assign({}, school);
			obj1 = Object.assign({}, fields);
			//console.log("\n\nobj1\n",obj1);
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
