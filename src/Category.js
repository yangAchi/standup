import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import {categoryView} from './actions/Article';
import {connect} from 'react-redux';
import './Category.css'

class Category extends Component {
	constructor(props){
	    super(props);
	    // this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
	    // this.view = this.view.bind(this);
	    this.state = {
	    	sidebarOpen: false, 
	    	sidebarDocked: false
	    };
	    this.view = this.view.bind(this);
	}
	componentWillMount() {
		var mql = window.matchMedia(`(min-width: 800px)`);
		mql.addListener(this.mediaQueryChanged);
		this.setState({mql: mql, sidebarDocked: mql.matches});
	}

	componentWillUnmount(){
		this.state.mql.removeListener(this.mediaQueryChanged);
	}
	view() {
		console.log("view");
	}

	view(category) {
		const {dispatch} = this.props;
    	dispatch(categoryView(category));
		console.log("view");
	}

	render() {
		var sidebarContent = <b>Sidebar content</b>;
	    return (
	      <ul>
	      <li className="list_row" >
	      	<pre className="tagList" onClick={this.view}>
               도서
            </pre>
          </li>
          <li className="list_row">
            <pre className="tagList" onClick={this.view}>
               운동
            </pre>
          </li>
          <li className="list_row">
            <pre className="tagList" onClick={this.view}>
               음악
            </pre>
          </li>
          <li className="list_row">
            <pre className="tagList" onClick={this.view}>
               개발
            </pre>
          </li>
	      </ul>
	    );
	}
}
export default connect()(Category);