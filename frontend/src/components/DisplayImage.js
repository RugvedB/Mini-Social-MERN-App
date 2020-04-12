// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';

import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Like from './Like'
import Post from './Post'
import ErrorComponent from './ErrorComponent'

import './Loading.css'
import { getAllPostForProfileFun,checktoken,allpostsFun,myfriendsFun,likeFun,myallpostsFun,getAllPostByMyFriendsFun,createCommentFun } from '../functions/funtions'

class DisplayImage extends React.Component {
  constructor(props){
    super(props)
    
    this.state={
      
      
      
     
    }
  
    
    
  }

  

  
  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
 
    if (!localStorage.usertoken || localStorage.usertoken=="undefined"){
      return <Redirect
          to="/error"
          />;
    }
     
    
    return (
      
      <>
        <Container>
            
          
          
          <Row>

            


            {/* right side */}


            <Col className="border border-primary" sm={12}>

              
            
            <div className="p-5">

            {this.props.images.reverse().map((post,index)=>{
                

                
                  return (

<div>                
              <Card className="mb-2 p-3 text-left"  style={{ width: '100%',height:'auto' }}>
                <Card.Img variant="top" style={{height:"60vh"}} src={post} />
                
                
                

                

                <Card.Body>
              
              
              
              
              
              
              
              
              
                </Card.Body>
                                    
              </Card>



</div>
                    

                  )
                
              })}
            
              


            </div>

            </Col>
          </Row>

        </Container>




      
      </>



    
    ) 
  }
}

export default DisplayImage


