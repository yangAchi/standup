import React, { Component } from 'react';
import logo from './img/logo.png';
import './App.css';
import Editor from './Editor';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { updateArticle, loadArticles } from './actions/Article'
import Search from './Search'
import Profile from './Profile';
import SearchCategory from './SearchCategory'

/*
* App Component*/
class App extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.state = {
      opened : true,
      sidebarOpen: false,
      sidebarDocked: false
    };
  }
  submit(article) {
    if(article) {
      const {dispatch} = this.props;
      dispatch(updateArticle(article));

      dispatch(loadArticles());
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="App" id="outer-container">
        <SearchCategory />
        <div id="page-wrap">
          <div className="App-header">
            <Link to="/" className="App-logo-link">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Profile/>
          </div>
          <Search />
          <Editor submit={this.submit}/>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default connect()(App);
