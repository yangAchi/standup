import React, { Component } from 'react';
import logo from './img/stand_up_logo.png';
import './App.css';
import Editor from './Editor';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {updateArticle, loadArticles} from './actions/Article'
import Search from './Search'
import SearchCategory from './SearchCategory'



/*
* App Component
*/
class App extends Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
  }
  submit(article){
    if(article){
      const {dispatch} = this.props;
      dispatch(updateArticle(article));

      dispatch(loadArticles());
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Category">
           <SearchCategory />
          </div>
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <Editor submit={this.submit}/>
        <Search />
        {this.props.children}
      </div>
    );
  }
}
export default connect()(App);
