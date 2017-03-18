import React ,{Component} from 'react';
import {connect} from 'react-redux';
import './AddCategory.css'
import FirebaseDao from './FirebaseDao'
import config from './config'

class AddCategory extends Component{
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory() {
    let categoryItem = {};
    categoryItem = this.refs.myText.textContent;
    if(categoryItem){
          let key = this.dao.newKey();
          this.dao.update2( key, categoryItem);
    }
  }

  render(){
    return(
      <div className="categoryEdit">
        <div className="innerCategoryEdit"
              contentEditable="true"
              placeholder="Add category item"
              ref="myText">
        </div>

        <button className="categoryButton"
          onClick={this.addCategory}>
          <span>ADD</span>
        </button>
      </div>
      );
  }
}
export default connect()(AddCategory)
