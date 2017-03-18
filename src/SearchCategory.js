import React ,{Component} from 'react';
import {searchArticles} from './actions/Article';
import {connect} from 'react-redux';
import Dropdown from 'react-drop-down';


class SearchCategory extends Component{
  constructor(){
    super();
    this.state={
      value : 'untitiled'
    };
    this.searchCategory = this.searchCategory.bind(this);
  }

  searchCategory(e) {
    const {dispatch} = this.props;
    dispatch(searchArticles(e));
  }

  render(){
    return(
      <div className="searchCategory">
        <Dropdown value={this.state.value}
          onChange={this.searchCategory.bind(this)}
          options={['[SELECT]', 'aaa', 'bbb', 'ccc', 'ddd' ]} />
      </div>
      );
  }
}
export default connect()(SearchCategory)
