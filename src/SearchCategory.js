import React ,{Component} from 'react';
import {searchArticles, loadArticles} from './actions/Article';
import {connect} from 'react-redux';
import Dropdown from 'react-drop-down';


class SearchCategory extends Component{
  constructor(){
    super();
    this.state={
      value : 'untitled'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {dispatch} = this.props;
    dispatch(searchArticles(e));
  }

  render(){
    return(
      <div className="searchCategory">
        <Dropdown value={this.state.value}
          onChange={this.handleChange.bind(this)}
          options={['[SELECT]', 'aaa', 'bbb', 'ccc', 'ddd' ]} />
      </div>
      );
  }
}
export default connect()(SearchCategory)
