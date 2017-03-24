import React, { Component } from 'react'
import { Router } from 'react-router'

export default class NotFound extends Component {
  constructor(props){
    super(props);
    Router.browserHistory.push('/');
  }
}
