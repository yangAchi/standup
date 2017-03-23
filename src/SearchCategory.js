import React ,{Component} from 'react';
import {searchArticles} from './actions/Article';
import {connect} from 'react-redux';
import Dropdown from 'react-drop-down';
import FirebaseDao from './FirebaseDao'
import config from './config'
import { slide as Menu } from 'react-burger-menu'
import './BurgerMenu.css';
let Items=[];

class SearchCategory extends Component{
  constructor(){
    super();
    this.state={
      value : 'untitled'
    };

    this.submitItems = this.submitItems.bind(this);
    this.dao = new FirebaseDao(config);
  }

  componentWillMount() {
    this.dao.list2(50).on('value',(dataSnapshots)=>{
      var items = [];
      dataSnapshots.forEach(function(dataSnapshot){
        var item = dataSnapshot.val();
        console.log(dataSnapshot.val());
        items.push(item);
      })
      items.reverse();
      this.setState({value: items[0]});
      this.submitItems(items);
    });
  }
  componentWillUnmount(){
    this.dao.off();
  }

  //AddCategory.js
  submitItems(categoryItems){
    Items=categoryItems;
    this.forceUpdate();  //re-rendering?
  }

  handleChange(e) {
    this.setState({value: e});
    const {dispatch} = this.props;
    dispatch(searchArticles(e));
  }

  render(){
    return(
      <div className="searchCategory">
        <Menu>
             <a href="#" onClick={()=>this.handleChange(Items[0])}>{Items[0]}</a>
             <a href="#" onClick={()=>this.handleChange(Items[1])}>{Items[1]}</a>
        </Menu>

        <Dropdown value={this.state.value}
          onChange={this.handleChange.bind(this)}
          options={Items} />
      </div>
      );
  }
}
export default connect()(SearchCategory)
