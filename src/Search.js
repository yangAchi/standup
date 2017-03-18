/*global firebase*/
import React ,{Component} from 'react';
// import './PopCard.css';
import {tagArticles} from './actions/Article';
import {connect} from 'react-redux';
import './Search.css'

class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      tag : undefined
    };
    this.searchTag = this.searchTag.bind(this);
  }

  searchTag() {
    const {dispatch} = this.props;
    dispatch(tagArticles(this.refs.myText.textContent));
    this.refs.myText.textContent = "";
  }

  render(){
    return(
      <div className="tagEdit">
        <div className="innerTagEdit"
              contentEditable="true"
              placeholder="Search"
              ref="myText"></div>
        <button className="tagButton"
          onClick={this.searchTag}>
          <span>검색</span>
        </button>
      </div>
      );
  }
}
export default connect()(Search)
