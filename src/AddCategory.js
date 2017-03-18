import React ,{Component} from 'react';
import {connect} from 'react-redux';
import './AddCategory.css'
import FirebaseDao from './FirebaseDao'
import config from './config'

let items=[];

class AddCategory extends Component{
  constructor(){
    super();
    this.dao = new FirebaseDao(config);
    this.addCategory = this.addCategory.bind(this);
    this.loadCategory = this.loadCategory.bind(this);
  }

  addCategory() {
    let categoryItem = {};
    categoryItem = this.refs.myText.textContent;
    if(categoryItem){
          let key = this.dao.newKey();
          this.dao.update2( key, categoryItem);
    }

    this.loadCategory();
  }

  loadCategory(){
      console.log('loadCategory');
      //items.push(this.refs.myText.textContent);
      //items.push('koo');
      this.props.submitItems(items);
      //console.log(items);
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
