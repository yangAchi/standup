import { USER,GROUP,ALL,TAGS } from '../constants'
import FirebaseDao from '../FirebaseDao'
import config from '../config'
const dao = new FirebaseDao(config);
 
export function userArticles() {
  // loadArticles() {
  //   const {dispatch} = this.props;
  //   return () => dispatch(userArticles());
  //     // dao.list(25,(articles)=>dispatch(getArticles(articles)));
  // }

  // return {
  //   type: USER
  // };
  
  return (dispatch) => {
    // let action = {};
    // action.type = USER;
    dao.list(25,(articles)=>dispatch(getArticles(articles,{type:USER})));
  };
}

export function tagArticles(tag) {

  return {
    type: TAGS,
    tag : tag
  }
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
  console.log(items);
  if(items && items.length>0){
    if(action && action.type === USER) {
      return{
        type : USER,
        articles : items.reverse()
      }
    }
    return{
      type : ALL,
      articles : items.reverse()
    }
  }
}
export function loadArticles() {
  return (dispatch) => {
    dao.list(25,(articles)=>dispatch(getArticles(articles)));
  };
}
export function updateArticle(postData){
  return (dispatch) => {
    dao.update(dao.newKey(),postData);
  };
}
export function groupArticles(articles) {
  return {
    type: GROUP,
    articles: articles
  }
}
