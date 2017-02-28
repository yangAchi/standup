import React, { Component } from 'react';
import logo from './stand_up_logo.png';
import './App.css';
import Editor from './Editor';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {updateArticle} from './actions/Article'
import Search from './Search'
import Category from './Category'
import Sidebar from 'react-sidebar';
// import Category from './SideBar'
// import Sidebar from 'react-side-bar';

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

  // menu
  onSetSidebarOpen(open) {
      this.setState({sidebarOpen: open});
    }

  componentWillMount() {
    var mql = window.matchMedia(`(min-width: 800px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount(){
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged(){
    this.setState({sidebarDocked: this.state.mql.matches});
  }

  // <div className="category">
  //         <SideBar/>
  //       </div>
  render() {
    // const sidebarProps = {
    //     bar: (<div>Amazing Sidebar</div>),
    //     opened: this.state.opened,
    //     onClose: () => {
    //         this.setState({ opened: false })
    //     },
    //     onOpen: () => {
    //         this.setState({ opened: true })
    //     },
    //     size: 200
    // };
// <Sidebar {... sidebarProps}>
//             <div className='topBar'>SIDEBAR</div>
//             <div className='main'>Main</div>
//           </Sidebar>
    // var sidebarContent = {
    //   <b>Sidebar content</b>
    //   <Category/>
    // };

    return (
      <div className="App">
        <div className="category">
          <Sidebar sidebar={<Category/>}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>
          <div className="App-main">
            <div className="App-header">
              <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
            </div>
            <Editor submit={this.submit}/>
            <Search />
            {this.props.children}
          </div>
          </Sidebar>
        </div>
      </div>
    );
  }
}
export default connect()(App);


      // <div className="App">
      //   <div className="category">
      //     <Category/>
      //   </div>
      //   <div className="App-main">
      //     <div className="App-header">
      //       <Link to="/">
      //         <img src={logo} className="App-logo" alt="logo" />
      //       </Link>
      //     </div>
      //     <Editor submit={this.submit}/>
      //     <Search />
      //     {this.props.children}
      //   </div>
      // </div>
