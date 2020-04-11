import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';

import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import nature from '../images/nature.jpeg'


class Comment extends React.Component {
  constructor(props){
    super(props)
  }
  // shouldComponentUpdate(nextProps) {
  //   if((this.props.createdBy!=nextProps.createdBy)||(this.props.content!=nextProps.content)){
  //     console.log("ummm(cmt) :"+this.props.content+"  "+nextProps.content)  
  //   }
  //   console.log("ummm(cmt)123 :"+this.props.content+"  "+nextProps.content)  
  //   // return true
  //   return ((this.props.createdBy!=nextProps.createdBy)||(this.props.content!=nextProps.content))
      
      
  // }
  
 
  render() {
    if (!localStorage.usertoken || localStorage.usertoken=="undefined"){
      return <Redirect
          to="/error"
          />;
    }
    return (
        <>
        
        
            <Row style={{backgroundColor:"#d3d3d3"}} className="border border-primary p-2 m-2">
                <Col sm={3} >
                    
                        <Image className="border border-dark" style={{maxHeight:'100px',width:'100%'}} src={this.props.profile_pic} roundedCircle />
                    
                    
                    

                </Col>
                <Col sm={9} >
                    <div style={{overflowY:"scroll",height:"100px",paddingTop:'4px'}}>
                        {/* <h2 className="font-weight-bold text-light rounded border border-dark" style={{backgroundColor:"#d3d3d3",display:'inline',padding:'2px'}}>{this.props.createdBy}</h2> */}
                        <p><h2 className="font-weight-bold text-light rounded border border-dark" style={{backgroundColor:"#000000",display:'inline',padding:'2px'}}>{this.props.createdBy}</h2> commented on {this.props.comment.date}</p>
                        <p style={{backgroundColor:"#d3d3d3",marginTop:"4px"}} className="border border-black">{this.props.content}</p>
                    </div>
                </Col>
            
            </Row> 
        
                   
        </>
    
        
        


    
    ) 
  }
}

export default Comment