// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Like from './Like'
import Post from './Post'
import { getUserByGmail,verifyChange,currentUserFun,changeProfilePicFun,changeCoverPicFun,createStatusPostFun,updateProfileFun } from '../functions/funtions'
import './Loading.css'
import { allpostsFun,myfriendsFun,likeFun } from '../functions/funtions'

class Verify extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
      isVerified:false,
      Loading:true,
      redirectTo:''
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    
    
  }

  async componentDidMount(){
    const currentUser=await currentUserFun()
    //console.log("home:currentUserFun: status4 :"+currentUser.data.status)
    this.setState({
      
      
      email: currentUser.data.Data.email,
      isVerified: currentUser.data.Data.isVerified,
      Loading:false
      
    })
      
  }

  async handleSubmit(e){
    console.log(this.state.email+"  --  "+this.state.password)

    // const data={
    //     email:this.state.email
    // }
    
    // let currentUser=await getUserByGmail(data)
    //console.log('currentUser.data.Data.email '+currentUser.data.Data.email)

    let data={
      email:this.state.email,
      password:this.state.password
    }
    const r=await verifyChange(data)
    if(r.data.status=="fail"){
        this.setState({
          redirectTo:'error'
        })
        return 
    }
    else if(r.data.status=="success"){
      // this.setState({
      //   redirectTo:'home'
      // })
      this.props.parent.changeVerifyState()
      return
    }  

    // if(this.props.currentUser.verificationCode==this.state.password){
    //     console.log("verified")
       
    //     this.props.history.push(`/login`)
    // }
    // else{
    //     this.props.history.push(`/error`)
    // }
  
      
    
    
    
    
    // if(response.data.status=="fail"){
    //   this.props.history.push(`/error`)
    //   return 
    // }
    
    // this.props.history.push(`/verify`)
    
  }

  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
  }
  




  

  

  render() {
    if(this.state.Loading){
      return(
          <div class="loader"></div>
      )
    }
    if (!this.state.redirectTo==""){
      return <Redirect
          to={"/"+this.state.redirectTo}
          />;
    }
    return (
      
        <>


        <Form onSubmit={this.handleSubmit} style={{width:"60%"}} className="container text-left mt-2">
        
        <Form.Group >
            <Form.Label className="text-left">Email</Form.Label>
            <Form.Control required name="email" type="text" value={this.state.email} />
            
          </Form.Group>
        
          
        
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Verification Code (sent to you on your registered mail id)</Form.Label>
            <Form.Control required name="password" onChange={this.handleChange} type="password" placeholder="Password" />
          </Form.Group>
         
        
          <Button onClick={this.handleSubmit} variant="primary">
            Submit
          </Button>
        </Form>      
              </>



    
    ) 
  }
}

export default Verify


