import { USER, ALL, TAGS, CATEGORY } from '../constants'
import FirebaseDao from '../FirebaseDao'
import config from '../config'
const dao = new FirebaseDao(config);

export function userArticles() {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles,{type:USER})));
  };
}

export function tagArticles(tag) {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles,{type:TAGS,tag:tag})));
  };
}

export function loadArticles() {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles)));
  }
}

export function searchArticles(category) {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles,{type:CATEGORY,category:category})));
  };
}


/*
* 여기부터
*/
export function getArticles(articles,action){
  var items = [];
  articles.forEach(function(article){
    var item = article.val();
    item['key'] = article.key;
    items.push(item);
  })

  if(items && items.length>0){
    if(action && action.type === USER) {
      console.log(items);
      return{
        type : USER,
        articles : items.reverse()
      }
    }
    else if(action && action.type === TAGS) {
      console.log(items);
      return{
        type : TAGS,
        tag : action.tag,
        articles : items.reverse()
      }
    }
    else if(action && action.type===CATEGORY){
    console.log(items);
    return{
      type:CATEGORY,
      category: action.category,
      articles : items.reverse()
    }
  }
    console.log("ALL action");
    return{
      type : ALL,
      articles : items.reverse()
    }
  }
}

export function updateArticle(postData){
  return (dispatch) => {
    dao.update(dao.newKey(),postData);
  };
}
