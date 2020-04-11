// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';


import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Like from './Like'
import Post from './Post'

import './Loading.css'
import { allpostsFun,myfriendsFun,likeFun } from '../functions/funtions'

class MyTimeline extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state={}
    
    
    
  }
  




  componentDidMount(){}


  

  

  render() {
    if(this.state.Loading){
      return(
          <div class="loader"></div>
      )
    }
    return (
      
      <>
        




      
      </>



    
    ) 
  }
}

export default MyTimeline


