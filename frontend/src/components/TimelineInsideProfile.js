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

class MyTimeline extends React.Component {
  constructor(props){
    super(props)
    
    this.state={
      comment_content:'',
      show:false,
      allposts:[],//allposts by me(current user)
      // myfriends:[],
      myID:'',
      Loading:true,
      redirect:false

     
    }
    this.handleComment=this.handleComment.bind(this)
    this.handleCommentChange=this.handleCommentChange.bind(this)
    
    this.handleLike=this.handleLike.bind(this)
    
    
  }
  // setLoadingFalse(){
  //   this.setState({ Loading:false })
  // }
  // setLoadingTrue(){
  //   this.setState({ Loading:true })
  // }




  async componentDidMount(){
    if(!checktoken()){
      return
    }
    
    console.log('this.props.parent.state.currentUser.email: '+this.props.parent.state.currentUser._id)

    let allposts
    if(this.props.name=="MyTimeline"){
      allposts=await myallpostsFun()
    }
    else if(this.props.name=="Profile"){
      console.log('this.props.parent.state.currentUser.email: '+this.props.parent.state.currentUser.email)
      let data={
        id:this.props.parent.state.currentUser._id
      }
      allposts=await getAllPostForProfileFun(data)
      console.log('allposts.data.Data.length: '+allposts.data.Data.length)
    }
    
    else{
      allposts=await getAllPostByMyFriendsFun()
      
    }
    
    
    
    

    if(!localStorage.usertoken){
      this.props.history.push(`/login`)
      return
    }
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    

    
    
    
    
    
    this.setState({
      allposts:allposts.data.Data,
      myID:decoded._id,
      Loading:false
    })
  }


  handleCommentChange(e){
    
    this.setState({
      comment_content:e.target.value
    })
  }


  async handleLike(e){
    
    let x=e.target.id
    
    let index=e.target.attributes.getNamedItem('index').value;
    

    const bodyParameters = {
      postId: x
    };
    

   
    this.setState({ Loading:true })
    

    const result=await likeFun(bodyParameters)
    

  

    if(result.data.status=='success'){
      let temp_allposts=this.state.allposts
      temp_allposts[index]=result.data.post
      
      
      this.setState({
        allposts:temp_allposts,
        Loading:false
      })
      this.props.handleToast("Like Successful")
    }

    
  }
  

  async handleComment(e){
    
    
    
    let y=this.state.comment_content
    let x=e.target.id
    let index=e.target.attributes.getNamedItem('index').value;


    const bodyParameters = {
      content: y,
      postId:x
    };
    
    this.setState({ Loading:true })
    const result=await createCommentFun(bodyParameters)
    

    let temp_allposts=this.state.allposts
    if(result.data.status=='success'){
      temp_allposts[index]=result.data.post
      
    }

    this.setState({
      allposts:temp_allposts,
      Loading:false
    })
    this.props.handleToast("Comment Successful")


  }
  //////////////////////////////////////////////////////////////////////////////////////////////
  render() {
 
    if (!localStorage.usertoken || localStorage.usertoken=="undefined"){
      return <Redirect
          to="/error"
          />;
    }
     if(this.state.Loading){
      return(
          <div class="loader"></div>
      )
    }
    
    return (
      
      <>
        {/* <Container style={{ overflowY:'scroll',maxHeight:'2000px' }}> */}
        <Container>
        
{this.props.name=="Timeline" && <Form  className="text-left">

<Form.Group  controlId="exampleForm.ControlTextarea1">
    
    <Form.Control onChange={this.props.onStatusChnage}  placeholder="What's on your mind" as="textarea" rows="3" />
    <Button onClick={this.props.parent.showModalFun} className="justify-content-end mt-2" variant="primary" >
        Submit
    </Button>
</Form.Group>                
</Form>}
            
          
          
          <Row>

            


            {/* right side */}


            <Col className="border border-primary" sm={12}>

              
            
            <div className="p-5">

            {this.state.allposts.map((post,index)=>{
                

                // if(this.state.myID===post.createdBy._id){
                  return (

                      <Post index={index} post={post} parent={this} />
                  )
                // }
              })}
            
              


            </div>

            </Col>
          </Row>

        </Container>




      
      </>



    
    ) 
  }
}

export default MyTimeline


