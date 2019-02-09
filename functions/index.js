const functions = require('firebase-functions'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
	res.render('index');
});

app.get("/login", (req, res) => {
	res.render('login');
});

app.get("/dash", (req, res) => {
	res.render('dash');
});

app.get("/home", (req, res) => {
	var a= req.query.fusername;
	var b= req.query.pass;
	var query= {'username':req.query.fusername,
				 'password':req.query.pass,
			}
	console.log(a);
	console.log(b);
	console.log(query.username);
	var us=db.collection('sign').doc(a);
	var pw=db.collection('sign').doc(b);
			//var getDoc = pri.where("username", "==",req.query.fusername).get()
			us.get()
			  .then((doc) => {
				if (!doc.exists) {
				  res.redirect('main');
				} else {
				  //alert('Document data:', doc.data());
				  checkpwd();
				 // res.redirect('dash');
				}
			  })
			  .catch(err => {
				console.log('Error getting document', err);
			  });

     function checkpwd(){
		 pw.get().then((doc1)=>{
				if(doc1.exists){
					res.redirect('dash');
					return doc1;
				}
				else{
					res.render('logintrack');
				}
		 }).catch((err) => {
			console.error(err);
		});
	 }	
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
			console.log(ob.name);
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