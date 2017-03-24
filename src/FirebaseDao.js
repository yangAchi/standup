import firebase from 'firebase';
import firebaseui from 'firebaseui';
import fcmpush from 'fcm-push';

// 준영 : https://www.npmjs.com/package/fcm-push를 참고하였음.

export default class FirebaseDao {
  constructor(config){
    if(firebase.apps && firebase.apps.length>0){
      this.firebaseApp = firebase.apps[0];
    } else {
      this.firebaseApp = firebase.initializeApp(config);
      console.log(config.fcmServerKey);
      this.fcm = new fcmpush(config.fcmServerKey);
    }
    this.sendPushNotification = this.sendPushNotification.bind(this);
  }

  getFirebaseApp() {
    return this.firebaseApp;
  }

  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }

  sendPushNotification(postData) {
    var message = {
      to: '/topics/allDevice',
      notification: {
        title : 'New Uploads from "' + postData.user.displayName + '"!',
        body : postData.content
      }
    };
    this.fcm.send(message, function(err, response) {
      if(err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Push Success : ", response);
      }
    })
  }

  update(key,postData){
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/'+ postData.user.displayName +'/' + key] = postData;
    this.sendPushNotification(postData);
    return firebase.database().ref().update(updates);
  }

  // 카테고리를 위한 저장소
  updateCategory(key,postData){
    console.log("update");
    console.log(postData);
    var updates = {};
    updates['/category/' + key] = postData;
    return firebase.database().ref().update(updates);
  }

  remove(key){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/').child(key).remove();
      firebase.database().ref('/user-posts/genji/').child(key).remove();
      resolve(key);
    });
  }

  off(){
    return firebase.database().ref().off();
  }

  newKey(){
    return firebase.database().ref().child('posts').push().key;
  }
  
  /**
  * Promise를 호출하게 되면 이벤트가 등록된 부분이 사라기제 된다.
  */
  list(pagesize,callback){
    // return new Promise(resolve=>{
      firebase.database().ref('posts')
              .orderByKey().limitToLast(pagesize)
              .on('value',(articles)=>{
                callback(articles);
              })
    // });
  }

  listCategory(pagesize){
   return firebase.database().ref('/category/')
           .orderByKey().limitToLast(pagesize);
  }

  getArticle(key){
    return new Promise(resolve=>{
      firebase.database().ref('/posts/'+key)
              .on('value',(articles)=>{
                resolve(articles);
              })
    });
  }

  getUI(){
    return new firebaseui.auth.AuthUI(firebase.auth());
  }

  logout(){
    return firebase.auth().signOut();
  }
}
