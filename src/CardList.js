import React, { Component } from 'react';
import Card from './Card'
import './CardList.css'
import {connect} from 'react-redux'
import {loadArticles} from './actions/Article'

class CardList extends Component {

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(loadArticles());
  }

  createCard(item,index){
    var tagList = [];
    var tagList2 = "";
    if(item.tags) {
      tagList = item.tags.map(function(tag){
                return "#"+tag.text+" ";
              })
      tagList2 = item.tags.map(function(tag,index){
                return <li className="tag_list" key={index}>
                  <pre className="tagList">
                    {tag.text}
                  </pre>
                </li>;
                })
    }

    return(<li className="list_row" key={item.key}>
              <pre className="common_margin grey_text">{item.content}</pre>
              {
                (item.cardInfo)?<Card cardInfo={item.cardInfo}/>:""
              }
              <ul>
                {tagList2}
              </ul>
              <pre className="tagList">
                {tagList}
              </pre>
            </li>);
  }
  render() {
    if(this.props.articles && this.props.articles.length>0)
      return <ul>{ this.props.articles.map(this.createCard) }</ul>;
    else return <div key="015b"/>
  }
}
export default connect(
  (state)=>({articles:state.default.articles})
)(CardList);
