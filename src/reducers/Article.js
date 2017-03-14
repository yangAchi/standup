/*global firebaseui,firebase*/
import {USER,TAGS,CATEGORY} from '../constants';
import firebase from 'firebase';
export default function getArticles(state,action){

  if(action.type === USER){
    console.log("USER Reducer");
    let articles_of_mine = [];
    let cUser = firebase.auth().currentUser;

    action.articles.forEach(function(article){
      if( article.user.uid && cUser && (article.user.uid ===  cUser.uid)){
        articles_of_mine.push(article);
      }
    });
    console.log(articles_of_mine);
    return Object.assign({},state,{articles:articles_of_mine});
  }
  else if(action.type === TAGS){
    console.log("TAGS Reducer");
    let articles_of_tag = [];
    // let cUser = firebase.auth().currentUser;
    action.articles.forEach(function(article){
      if(article.tags) {
        article.tags.forEach(function(tag){
        if(tag.text && action.tag && (tag.text === action.tag)){
          articles_of_tag.push(article);
          return;
        }
      });
      }
    });
    console.log(articles_of_tag);
    return Object.assign({},state,{articles:articles_of_tag});
  }
  else if(action.type === CATEGORY){
    console.log("koo");

    //console.log("TAGS Reducer");
    let articles_of_tag = [];
    // let cUser = firebase.auth().currentUser;
    action.articles.forEach(function(article){
      if(article.value==action.category) {
          articles_of_tag.push(article);
          return;
      }
      
    });
    console.log(articles_of_tag);
    return Object.assign({},state,{articles:articles_of_tag});

  }
  console.log("ALL Reducer");
  console.log(action);
  return Object.assign({},state,action);
}
