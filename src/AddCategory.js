/*global firebase*/
import React ,{Component} from 'react';
// import './PopCard.css';
import {tagArticles} from './actions/Article';
import {connect} from 'react-redux';
import './AddCategory.css'

class AddCategory extends Component{
  constructor(props){
    super(props);
    this.state={
      category : undefined
    };
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory() {
    console.log(this.refs.myText.textContent);
    this.refs.myText.textContent = "";
  }

  render(){
    return(
      <div className="categoryEdit">
        <div className="innerCategoryEdit"
              contentEditable="true"
              placeholder="Add category item"
              ref="myText"></div>
        <button className="categoryButton"
          onClick={this.addCategory}>
          <span>ADD</span>
        </button>
      </div>
      );
  }
}
export default connect()(AddCategory)
