// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron,Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';


import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Like from './Like'
import Post from './Post'

import './Loading.css'
import { allpostsFun,myfriendsFun,likeFun } from '../functions/funtions'

class ErrorComponent extends React.Component {
  constructor(props){
    super(props)
    
    this.state={}
    
    
    
  }
  




  componentDidMount(){}


  

  

  render() {
    
      return(
          <div className="container" style={{height:"60%",width:'80%'}}>
              <Jumbotron>
                <h1 className="font-weight-bolder font-italic">Error</h1>
                <br></br>
                <p style={{width:"35%"}} className="container">
                  <h2>It is probably due to:</h2>
                  <ul>
                    <li>Email verification proccess incomplete</li>
                    <li>No Internet Connection</li>
                    <li>Unauthorized Access</li>
                    <li>Wrong Information</li>
                    <li>Token has expired.Login again</li>
                  </ul>
                </p>
                <p>
                  <Button variant="primary">ok</Button>
                </p>
              </Jumbotron>              
          </div>
      )
  }
}

export default ErrorComponent


