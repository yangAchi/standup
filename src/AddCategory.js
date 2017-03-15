/*global firebase*/
import React ,{Component} from 'react';
// import './PopCard.css';
import {loadCategory} from './actions/Article';
import {connect} from 'react-redux';
import './AddCategory.css'
import FirebaseDao from './FirebaseDao'
import config from './config'

class AddCategory extends Component{
  constructor(){
    super();
    this.dao = new FirebaseDao(config);

    this.state={
      category : undefined
    };
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory() {
    let article = {};
    article.categoryItem = this.refs.myText.textContent;
    if(article){
          let key = this.dao.newKey();
          let updated = this.dao.update2( key, article );

    }

    const {dispatch} = this.props;
    dispatch(loadCategory());

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
