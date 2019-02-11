const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	admin = require('firebase-admin');

app.use(bodyParser.json());
app.use(express.static('public/css'));
// app.use(express.static('public/img'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.set('view engine', 'ejs');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

app.get("/", (req, res) => {
	res.render('main');
});

app.get("/login", (req, res) => {
	res.render('login');
});
app.get("/loginOTP", (req, res) => {
	res.render('loginOTP');
});






app.get("/home", (req, res) => {
 
	var a= req.query.fusername;
	var b= req.query.pass;
	var query= {'username':req.query.fusername,
				 'password':req.query.pass
			};
			

    var db= FirebaseFirestore.getInstance();
			        db.collection(sign)
						.whereEqualTo(username, a)
						.get()
						.addOnCompleteListener(task => {
							if (task.isSuccessful()) {
								if (task.getResult().getDocuments().size() > 0)
						    }
						});
	res.render('dash');
});

app.get("/sign", (req, res) => {
	res.render('sign');
});

app.get('/send', (req, res) => {
	//var schoolName = "Pranitha";
	var usingname= req.query.uname;
	var sch = db.collection("sign").doc(usingname);
	sch.get().then((doc) => {
		if (doc.exists) {
			console.warn(usingname + " already exists.");
			return;
		} else {
			var ob = {
				'name': req.query.fname,
				'addr':req.query.addr,
				'phone':req.query.num,
				'dob':req.query.dob,
				'username':req.query.uname,
				'password':req.query.pass
			};
			db.collection("sign").doc(usingname).set(ob);

			return;
		}
	}).catch((err) => {
		console.log(err);
	});
	res.redirect('/login');
});

app.use((req, res, next) => {
	res.status(404).render('404');
});

exports.app = functions.https.onRequest(app);