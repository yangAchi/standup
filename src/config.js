// var config = {
//  	apiKey: "AIzaSyCtcnPAt0yNRnoHoYa7wP7GmPX96TePzgk",
//     authDomain: "standup-3e243.firebaseapp.com",
//     databaseURL: "https://standup-3e243.firebaseio.com",
//     storageBucket: "standup-3e243.appspot.com",
//     messagingSenderId: "63317005145"
// }
// export var embedlyKey = "174f4e0d28944403a43a58017d1643bd"
// export default config;

var config = {
 apiKey: process.env.REACT_APP_FIREBASE_KEY,
 authDomain: process.env.REACT_APP_AUTH_DOMAIN,
 databaseURL: process.env.REACT_APP_DB_URL,
 storageBucket: process.env.REACT_APP_STRG_BKT,
 messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
 embedlyKey: process.env.REACT_APP_EMBEDLY_KEY,
 fcmServerKey: process.env.REACT_APP_FCM_SERVER_KEY
}
export default config;
