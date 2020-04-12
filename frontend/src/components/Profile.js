import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Carousel,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
import TimelineInsideProfile from './TimelineInsideProfile'
import CarouselComponent from './CarouselComponent'


import CreatePost from './CreatePost'
import ExploreNewFriends from './ExploreNewFriends'
import ErrorComponent from './ErrorComponent'
import './Home.css'
import './Loading.css'

import { getAllPostForProfileFun,getUserByGmail,checktoken,currentUserFun,changeProfilePicFun,changeCoverPicFun,createStatusPostFun,updateProfileFun } from '../functions/funtions'
import Verify from './Verify';
import DisplayImage from './DisplayImage'

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state={
      comment_content:'',
      show:false,
      showModal:false,
      showModalUpdate:false,
      

      first_name: '',
      last_name:'',
      email: '',
      ID:'',
      profile_pic:'',
      bio:'',

      currentTab:'',

      currentUser:null,
      profilePicArray:[],
      coverPicArray:[],

      status:'',

      temp_first_name: '',
      temp_last_name:'',
      temp_bio:'',

      showToast:false,
      ToastContent:'',
      redirect:false,
      Loading:true,
      isFriend:false
      

    }
    this.handleComment=this.handleComment.bind(this)
    
    
    


    
    this.handleToast=this.handleToast.bind(this)
    
    

  }
//done
  async componentDidMount() {
    try{
    if(!checktoken()){
      return
    }
    
    let email=this.props.history.location.pathname.split('/')[2]
    
    // let currentUser=await currentUserFun()
    let data={
      email:email
    }
    let currentUser=await getUserByGmail(data)
    


    
    
    if(!currentUser.data.status=="success"){
      this.setState({ redirect:true })
    }
    console.log('currentUser.data.isFriend:'+currentUser.data.isFriend)

    this.setState({
      profilePicArray:currentUser.data.Data.profile_pic,
      coverPicArray:currentUser.data.Data.cover_pic,

      show_profile_pic_moodle:false,
      profile_image_file:'',

      show_cover_pic_moodle:false,
      cover_image_file:'',

      email: currentUser.data.Data.email,
      ID:currentUser.data.Data._id,
      profile_pic:currentUser.data.Data.profile_pic[currentUser.data.Data.profile_pic.length-1],
      cover_pic:currentUser.data.Data.cover_pic[currentUser.data.Data.cover_pic.length-1],
      bio:currentUser.data.Data.bio,
      first_name:currentUser.data.Data.first_name,
      last_name:currentUser.data.Data.last_name,
      currentUser:currentUser.data.Data,
      Loading:false,
      isFriend:currentUser.data.isFriend
      
      
    })
    //this.state.currentUser.profile_pic
  }
  catch(err){
    this.props.history.push(`/error`)
  }
    
  }



  

  handleToast(text){
    this.setState({
      ToastContent:text,
      showToast:true
    })
  }
  
  
//Done
  
  


  
  
  
  
  

  ///


  handleComment(e){
    
    this.setState({
      ToastContent:this.state.ToastContent,
      show:true
    })
  }

  

  

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

        <Container style={{marginBottom:"70px"}}>
          
          <Row >
                <Col sm={12}>
                    
                  <Image  style={{height:'300px',width:'100%'}} src={this.state.cover_pic} fluid thumbnail/>
        
                  <Image  style={{height:'200px',width:'200px',position:'absolute',top:'230px',left:'30px',zIndex:'999'}} src={this.state.profile_pic} roundedCircle fluid thumbnail/>
      
                </Col>
                
          </Row>
          
          
          <Row className="mt-3">

            {/* left side */}
            

            <Col  className="border border-dark rounded" sm={3}>
            
              
              {/* row1 of left side */}
              <div style={{marginTop:"150px"}}>
              <Row  className="mt-2">
                <Col>
                  
                  <Card style={{ width: '100%',height:'auto' }}>
                    
                    {/* <Image style={{height:'auto',width:'100%'}} src={nature} roundedCircle fluid thumbnail/> */}
                    <Card.Body className="text-center">
  <Card.Title  className="text-center"><kbd>{this.state.first_name} {this.state.last_name}</kbd></Card.Title>
                      <Card.Text>
                        <pre>{this.state.email}</pre>
                        <p>{this.state.bio}</p>
                      </Card.Text>
                      {/* {this.state.isFriend && <Button>
                        Remove Friend
                      </Button>}
                      {!this.state.isFriend && <Button>
                        Add Friend
                      </Button>} */}
                                                 

                    </Card.Body>
                  </Card>   
                </Col>
              </Row>
              </div>

              {/* Column2 of left side ...consists of 2x2 grid of photos*/}
              <Row>
                <Col>
                  <Container style={{maxHeight:"250px",overflowY:'scroll',padding:"5px"}} className="border border-dark rounded mt-2">
                  <h2>Profile Pics</h2>
                    {this.state.profilePicArray.map((p,index)=>{
                      
                      if(index%2 ==0){
                        return(
                          <Row>
                            <Col  sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profilePicArray[index]} fluid thumbnail/></Col>
                            <Col  sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.profilePicArray[index+1]} fluid thumbnail/></Col> 
                          </Row>
                        )
                      }
                      
                    })}

                    
                  </Container>
                  <Container style={{maxHeight:"250px",overflowY:'scroll',padding:"5px"}} className="border border-dark rounded mt-2">
                    <h2>Cover Pics</h2>
                    {this.state.coverPicArray.map((p,index)=>{
                      
                      if(index%2 ==0){
                        return(
                          <Row>
                            <Col  sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.coverPicArray[index]} fluid thumbnail/></Col>
                            <Col  sm={6}><Image style={{height:'auto',width:'100%'}} src={this.state.coverPicArray[index+1]} fluid thumbnail/></Col> 
                          </Row>
                        )
                      }
                      
                    })}

                    
                  </Container>                  
                   
                </Col>
              </Row>
                           
            </Col>


            
            
            
            
            
            {/* right side */}


            <Col className="border border-dark rounded" sm={9}>

{/* Tab layout */}

<Tabs 
className="m-2"
// style={{backgroundColor:"#a8bee0",color:"#FFFFFF"}}
defaultActiveKey="MyTimeline" 
id="uncontrolled-tab-example"
unmountOnExit="true"
onSelect={(k)=>{  this.setState({currentTab:k})}}
>
  
  <Tab eventKey="MyTimeline" title="MyTimeline">
  
  <TimelineInsideProfile handleToast={this.handleToast} name="Profile" onStatusChnage={this.onStatusChnage} parent={this} />

  </Tab>
  
  <Tab eventKey="Profile pics" title="Profile pics">
  
          <DisplayImage images={this.state.profilePicArray} />
  </Tab>

  <Tab eventKey="Cover pics" title="Cover pics">
  
          <DisplayImage images={this.state.coverPicArray} />
  </Tab>
  

  
  
</Tabs>    

{/* Tab layout end */}
            
            

            </Col>
          </Row>

        </Container>
{/* Toast */}
<div style={{marginBottom:"60px"}} class="demo bottomright">
   
        <Toast onClose={() => this.setState({ showToast:false })} show={this.state.showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Message</strong>
            <small>1 sec ago</small>
          </Toast.Header>
          <Toast.Body>{this.state.ToastContent}</Toast.Body>
        </Toast>
      
</div>                    


      
      </>



    
    ) 
  }
}

export default Profile