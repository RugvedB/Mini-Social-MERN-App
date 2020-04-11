import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';


import axios from 'axios'

import { register } from '../functions/funtions' 

class Register extends React.Component {
  constructor(props){
    super(props)
    this.state={
      firstname:'',
      lastname:'',
      password:'',
      confirm_password:'',
      email:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    

  }
  
  async handleSubmit(e){
    
    
    let data={
      first_name:this.state.firstname,
      last_name:this.state.lastname,
      email:this.state.email,
      password:this.state.password
    }
    const response=await register(data)
    // console.log("Register:register: status :"+response.data.status)
    
    if(response.data.status=="success"){
      this.props.history.push(`/login`)
      
      return 
    }
    this.props.history.push(`/error`)
    // this.props.history.push(`/verify`)
    
  }
  
  
  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
    //console.log(this.state.firstname +"  "+this.state.email +"  "+this.state.password +"  "+this.state.confirm_password)
  }

  render() {
    
    return (
      <>


<Form onSubmit={this.handleSubmit} style={{width:"60%"}} className="container text-left mt-2">

<Form.Group >
    <Form.Label   className="text-left">First Name</Form.Label>
    <Form.Control required name="firstname" onChange={this.handleChange} type="text" placeholder="Enter username" />
    
  </Form.Group>

  <Form.Group >
    <Form.Label  className="text-left">Last Name</Form.Label>
    <Form.Control required name="lastname" onChange={this.handleChange} type="text" placeholder="Enter username" />
    
  </Form.Group>

  <Form.Group  controlId="formBasicEmail">
    <Form.Label   className="text-left">Email</Form.Label>
    <Form.Control required name="email" onChange={this.handleChange} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      Verification code will be sent on this email id 
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control required required name="password" onChange={this.handleChange} type="password" placeholder="Password" />
  </Form.Group>
  {/* <a href="/verify">Already registered but not verified your mail? Click here</a> */}
  <br></br>

  

  <Button onClick={this.handleSubmit} variant="primary">
    Submit
  </Button>
</Form>      
      </>






    
    ) 
  }
}

export default Register