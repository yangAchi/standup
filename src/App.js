import React, { Component } from 'react';
import logo from './img/stand_up_logo2.png';
import './App.css';
import Editor from './Editor';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {updateArticle} from './actions/Article'
import Search from './Search'
import Profile from './Profile';
/*
* App Component*/
class App extends Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
    this.state = {
      opened : true,
      sidebarOpen: false, 
      sidebarDocked: false
    };
  }
  submit(article){
    if(article){
      const {dispatch} = this.props;
      dispatch(updateArticle(article));
      this.forceUpdate();
    }
  }
  // componentWillUpdate() {
  //   console.log("App componentWillUpdate");
  //   const {dispatch} = this.props;
  //   dispatch(loadArticles());
  // }
  render() {
    return (
      <div className="App">
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
    );
  }
}
export default connect()(App);
