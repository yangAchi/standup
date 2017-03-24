import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddCategory.css'
import FirebaseDao from './FirebaseDao'
import config from './config'

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
          this.dao.updateCategory( key, categoryItem);
    }
    this.refs.myText.textContent = "";
    this.forceUpdate();  //re-rendering?
    this.loadCategory();
  }

  loadCategory(){
      console.log('loadCategory');
      this.dao.list2(50).on('value',(dataSnapshots)=>{
      var items = [];
       dataSnapshots.forEach(function(dataSnapshot){
         var item = dataSnapshot.val();
         console.log(dataSnapshot.val());
         items.push(item);
       })
       items.reverse();
       this.props.submitItems(items);
     });
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
