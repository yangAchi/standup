import React, { Component } from 'react';
import { searchArticles } from './actions/Article';
import { connect } from 'react-redux';
import FirebaseDao from './FirebaseDao'
import config from './config'
import { push as Menu } from 'react-burger-menu'
import './BurgerMenu.css';
import burgerIcon from './img/burgerIcon.png';

let Items=[];

class SearchCategory extends Component {
  constructor(){
    super();
    this.state={
      value : 'untitled'
    };

    this.submitItems = this.submitItems.bind(this);
    this.dao = new FirebaseDao(config);
  }

  componentWillMount() {
    this.dao.listCategory(50).on('value',(dataSnapshots)=>{
      var items = [];
      dataSnapshots.forEach(function(dataSnapshot){
        var item = dataSnapshot.val();
        // console.log(dataSnapshot.val());
        items.push(item);
      })
      items.reverse();
      this.setState({value: items[0]});
      this.submitItems(items);
    });
  }

  componentWillUnmount() {
    this.dao.off();
  }

  //AddCategory.js
  submitItems(categoryItems) {
    Items=categoryItems;
    this.forceUpdate();  //re-rendering?
  }

  handleChange(e) {
    this.setState({value: e});
    const {dispatch} = this.props;
    dispatch(searchArticles(e));
    // <Menu isOpen={ false }/>;
  }

  render() {
    return(
      <div className="searchCategory">
        <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } customBurgerIcon={ <img src={burgerIcon} alt="burger"/> } noOverlay>
            <a href="#" onClick={()=>this.handleChange(Items[0])}>{Items[0]}</a>
            <a onClick={()=>this.handleChange(Items[1])}>{Items[1]}</a>
            <a onClick={()=>this.handleChange(Items[2])}>{Items[2]}</a>
            <a onClick={()=>this.handleChange(Items[3])}>{Items[3]}</a>
            <a onClick={()=>this.handleChange(Items[4])}>{Items[4]}</a>
            <a onClick={()=>this.handleChange(Items[5])}>{Items[5]}</a>
            <a onClick={()=>this.handleChange(Items[6])}>{Items[6]}</a>
            <a onClick={()=>this.handleChange(Items[7])}>{Items[7]}</a>
            <a onClick={()=>this.handleChange(Items[8])}>{Items[8]}</a>
            <a onClick={()=>this.handleChange(Items[9])}>{Items[9]}</a>
            <a onClick={()=>this.handleChange(Items[10])}>{Items[10]}</a>
            <a onClick={()=>this.handleChange(Items[11])}>{Items[11]}</a>
            <a onClick={()=>this.handleChange(Items[12])}>{Items[12]}</a>
            <a onClick={()=>this.handleChange(Items[13])}>{Items[13]}</a>
            <a onClick={()=>this.handleChange(Items[14])}>{Items[14]}</a>
            <a onClick={()=>this.handleChange(Items[15])}>{Items[15]}</a>
            <a onClick={()=>this.handleChange(Items[16])}>{Items[16]}</a>
            <a onClick={()=>this.handleChange(Items[17])}>{Items[17]}</a>
            <a onClick={()=>this.handleChange(Items[18])}>{Items[18]}</a>
            <a onClick={()=>this.handleChange(Items[19])}>{Items[19]}</a>
            <a onClick={()=>this.handleChange(Items[20])}>{Items[20]}</a>
            <a onClick={()=>this.handleChange(Items[21])}>{Items[21]}</a>
            <a onClick={()=>this.handleChange(Items[22])}>{Items[22]}</a>
            <a onClick={()=>this.handleChange(Items[23])}>{Items[23]}</a>
            <a onClick={()=>this.handleChange(Items[24])}>{Items[24]}</a>
            <a onClick={()=>this.handleChange(Items[25])}>{Items[25]}</a>
            <a onClick={()=>this.handleChange(Items[26])}>{Items[26]}</a>
            <a onClick={()=>this.handleChange(Items[27])}>{Items[27]}</a>
            <a onClick={()=>this.handleChange(Items[28])}>{Items[28]}</a>
            <a onClick={()=>this.handleChange(Items[29])}>{Items[29]}</a>
            <a onClick={()=>this.handleChange(Items[30])}>{Items[30]}</a>
            <a onClick={()=>this.handleChange(Items[31])}>{Items[31]}</a>
            <a onClick={()=>this.handleChange(Items[32])}>{Items[32]}</a>
            <a onClick={()=>this.handleChange(Items[33])}>{Items[33]}</a>
            <a onClick={()=>this.handleChange(Items[34])}>{Items[34]}</a>
            <a onClick={()=>this.handleChange(Items[35])}>{Items[35]}</a>
            <a onClick={()=>this.handleChange(Items[36])}>{Items[36]}</a>
            <a onClick={()=>this.handleChange(Items[37])}>{Items[37]}</a>
            <a onClick={()=>this.handleChange(Items[38])}>{Items[38]}</a>
            <a onClick={()=>this.handleChange(Items[39])}>{Items[39]}</a>
            <a onClick={()=>this.handleChange(Items[40])}>{Items[40]}</a>
            <a onClick={()=>this.handleChange(Items[41])}>{Items[41]}</a>
            <a onClick={()=>this.handleChange(Items[42])}>{Items[42]}</a>
            <a onClick={()=>this.handleChange(Items[43])}>{Items[43]}</a>
            <a onClick={()=>this.handleChange(Items[44])}>{Items[44]}</a>
            <a onClick={()=>this.handleChange(Items[45])}>{Items[45]}</a>
            <a onClick={()=>this.handleChange(Items[46])}>{Items[46]}</a>
            <a onClick={()=>this.handleChange(Items[47])}>{Items[47]}</a>
            <a onClick={()=>this.handleChange(Items[48])}>{Items[48]}</a>
            <a onClick={()=>this.handleChange(Items[49])}>{Items[49]}</a>
        </Menu>
      </div>
      );
  }
}
export default connect()(SearchCategory)
