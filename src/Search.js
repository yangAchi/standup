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
  }

  render(){
    const {dispatch} = this.props;
    return(
      <div className="tagEdit">
        <div className="innerTagEdit"
              contentEditable="true"
              placeholder="글쓰기..."
              ref="myText"></div>
        <button className="tagButton"
          // disabled={!this.hasValue(this.state.tag)}
          onClick={()=>dispatch(tagArticles(this.refs.myText.textContent))}>
          <span>검색</span>
        </button>
      </div>
      );
  }
}
export default connect()(Search)
