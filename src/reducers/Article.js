/*global firebaseui,firebase*/
import {USER,GROUP,TAGS,CATEGORY} from '../constants';
import firebase from 'firebase';
export default function getArticles(state,action){

  if(action.type === USER){
    console.log("USER");
    console.log(action.articles);
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
  else if(action.type === GROUP){
    //some code would be here
    return Object.assign({},state,action);
  }
  else if(action.type === TAGS){
    console.log("TAGS");
    console.log(action.tag);
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
  // else if(action.type === CATEGORY){
  //   console.log("CATEGORY");

  //   let articles_of_tag = [];
  //   // let cUser = firebase.auth().currentUser;
  //   action.articles.forEach(function(article){
  //     if(article.tags) {
  //       article.tags.forEach(function(tag){
  //       if(tag.text && action.tag && (tag.text === action.tag)){
  //         articles_of_tag.push(article);
  //         return;
  //       }
  //     });
  //     }
  //   });
  //   return Object.assign({},state,{articles:articles_of_tag});
  // }
  console.log("ALL");
  console.log(action);
  return Object.assign({},state,action);
}