var config = {
  apiKey: "AIzaSyAvKatY68glJNhvQPejQkJTdBUm0T0nS0k",
  authDomain: "track-exproject.firebaseapp.com",
  databaseURL: "https://track-exproject.firebaseio.com",
  storageBucket: "track-exproject.appspot.com",
};
firebase.initializeApp(config);

// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID = 'YOUR_OAUTH_CLIENT_ID';
