/*global firebase*/
import React ,{Component} from 'react';
// import './PopCard.css';
import {searchArticles} from './actions/Article';
import {connect} from 'react-redux';
import Dropdown from 'react-drop-down';


class SearchCategory extends Component{
  constructor(props){
    super(props);
    this.state={
      value : undefined
    };
    this.searchCategory = this.searchCategory.bind(this);
  }

  searchCategory(e) {
    const {dispatch} = this.props;
    dispatch(searchArticles(e));
    //console.log(e);
  }

  render(){
    return(
      <div>
        <Dropdown value={this.state.value}
          onChange={this.searchCategory.bind(this)}
          options={['[SELECT]', 'aaa', 'bbb', 'ccc', 'ddd' ]} />
      </div>
      );
  }
}
export default connect()(SearchCategory)
