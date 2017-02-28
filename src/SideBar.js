import React, { Component } from 'react';
// import {Menu} from 'react-side-menu';
import Sidebar from 'react-side-bar';

// var Menu = require('react-side-menu').nameOfAnimation;

class Category extends Component {
	constructor(props){
	    super(props);
	    this.state={
	      opened : true
	    };
	}

	render() {
		const sidebarProps = {
		    bar: (<div>Amazing Sidebar</div>),
		    opened: this.state.opened,
		    onClose: () => {
		        this.setState({ opened: false })
		    },
		    onOpen: () => {
		        this.setState({ opened: true })
		    },
		    size: 200
		};

	    return (
	      <Sidebar {... sidebarProps}>
            <div className='topBar'>Category</div>
            <div className='Main'>도서</div>
            <div className='Main'>음악</div>
            <div className='Main'>운동</div>
            <div className='Main'>개발자</div>
          </Sidebar>
	    );
	}
}
export default Category;

