/*global firebaseui,firebase*/
/*
*  initializeFirebaseApp
*/
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default class FirebaseDao {
  constructor(config){
    if(firebase.apps&&firebase.apps.length>0){
      this.firebaseApp = firebase.apps[0];
      console.log(firebase.apps.length);
    }else{
      this.firebaseApp = firebase.initializeApp(config);
    }
  }
  getFirebaseApp(){
    return this.firebaseApp;
  }

  insert(postData){
    return firebase.database().ref().child('posts').push(postData);
  }
  update(key,postData){
    console.log("update");
    console.log(postData);
    var updates = {};
    updates['/posts/' + key] = postData;
    updates['/user-posts/genji/' + key] = postData;
    return firebase.database().ref().update(updates);
  }
  // 카테고리를 위한 저장소
  update2(key,postData){
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

  list2(pagesize,callback){
    console.log("callback33");
    // return new Promise(resolve=>{
      firebase.database().ref('category')
              .orderByKey().limitToLast(pagesize)
              .on('value',(articles)=>{
                callback(articles);
              })

    // });
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
