import React, { Component } from 'react';
import logo from './stand_up_logo.png';
import './App.css';
import Editor from './Editor';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {updateArticle, loadArticles} from './actions/Article'
import Search from './Search'
import SearchCategory from './SearchCategory'
import FirebaseDao from './FirebaseDao'
import config from './config'

/*
* App Component
*/
class App extends Component {
  constructor(){
    super();

    this.dao = new FirebaseDao(config);
    this.submit = this.submit.bind(this);
    this.state = {
      articles:[]
    }
  }
  submit(article){
    if(article){
      const {dispatch} = this.props;
      dispatch(updateArticle(article));
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
