import React, { Component } from 'react';
import Card from './Card'
import './CardList.css'
import { connect } from 'react-redux'
import { loadArticles, tagArticles } from './actions/Article'

class CardList extends Component {

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadArticles());
  }

  createCard(item,index){
    const {dispatch} = this.props;
    var tagList = "";
    if(item.tags) {
      tagList = item.tags.map(function(tag,index){
                return <li className="tag_list" key={index}>
                  <a href="#" className="tagList" onClick={()=>dispatch(tagArticles(tag.text))}>
                    {"#"+tag.text}
                  </a>
                </li>;
                })
    }

    var categoryItem="";
    if(item.value){
      categoryItem="["+item.value+"]";
    }

    var date="";
    if(item.date){
      date=item.date;
    }

    return(<li className="list_row" key={item.key}>
              <ul>
                {categoryItem}     {date}
              </ul>
              <div className="common_margin">
              <pre className="common_margin grey_text card_content">{item.content}</pre>
              {
                (item.cardInfo)?<Card cardInfo={item.cardInfo}/>:""
              }
              <ul>
                {tagList}
              </ul>
              </div>
            </li>
            );
  }

  render() {
    if(this.props.articles && this.props.articles.length>0)
      return <ul>{ this.props.articles.map(this.createCard,this) }</ul>;
    else return <div key="015b"/>
  }
}
export default connect(
  (state)=>({articles:state.default.articles})
)(CardList);
