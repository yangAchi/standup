import React, { Component } from 'react';
import logo from './stand_up_logo.png';
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
