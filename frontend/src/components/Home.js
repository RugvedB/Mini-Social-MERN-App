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

import { checktoken,currentUserFun,changeProfilePicFun,changeCoverPicFun,createStatusPostFun,updateProfileFun } from '../functions/funtions'
import Verify from './Verify';

class Home extends React.Component {
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
      

    }
    this.handleComment=this.handleComment.bind(this)
    this.toggleShow=this.toggleShow.bind(this)
    this.showModalFun=this.showModalFun.bind(this)
    

    this.profile_image_click=this.profile_image_click.bind(this)
    this.cover_image_click=this.cover_image_click.bind(this)
    
    this.handleSubmitProfileFile = this.handleSubmitProfileFile.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)

    this.handleSubmitCoverFile = this.handleSubmitCoverFile.bind(this)
    this.handleImagePreviewCover = this.handleImagePreviewCover.bind(this)
    this.handleCreateStatusPost=this.handleCreateStatusPost.bind(this)
    this.onStatusChnage=this.onStatusChnage.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.handleToast=this.handleToast.bind(this)
    this.changeVerifyState=this.changeVerifyState.bind(this)
    

  }
//done
  async componentDidMount() {
    
    if(!checktoken()){
      return
    }
    
    let currentUser=await currentUserFun()
    // console.log("home:currentUserFun: status :"+currentUser.data.status)
    
    if(!currentUser.data.status=="success"){
      this.setState({ redirect:true })
    }

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
      Loading:false
      
      
    })
    //this.state.currentUser.profile_pic
    
  }

  async changeVerifyState(){
    let currentUser=await currentUserFun()
    this.setState({
      currentUser:currentUser
    })
  }

  profile_image_click(e){
    this.setState({
      show_profile_pic_moodle:true
    })
  }
  cover_image_click(e){
    this.setState({
      show_cover_pic_moodle:true
    })
  }

  handleToast(text){
    this.setState({
      ToastContent:text,
      showToast:true
    })
  }
  
  
//Done
  async handleSubmitProfileFile(e){
    e.preventDefault()
    this.setState({
      Loading:true
    })
    
    if(this.state.profile_image_file===""){
      //console.log("this.state.profile_image_file :"+this.state.profile_image_file+"123")
      this.setState({
        ToastContent:"Upload Fail",
        showToast:true,
        Loading:false
      })
      return
    }
    const data = new FormData() 
    data.append('image', this.state.profile_image_file)
    
     
    // for (var [key, value] of data.entries()) { 
    //   console.log(key, value);
    // }
  
    const res=await changeProfilePicFun(data)
    //console.log("home:changeProfilePicFun: status(currentUser) :"+res.data.status)

    

        
          //console.log(res.data.profile_image_url)
          
          this.setState({
            profile_pic:res.data.profile_image_url,
            ToastContent:"Profile pic updated",
            showToast:true,
            Loading:false,
            show_profile_pic_moodle:false
          })

    

        const currentUser=await currentUserFun()
        //console.log("home:currentUserFun: status2 :"+currentUser.data.status)
    
        if(!currentUser.data.status=="success"){
          this.setState({ redirect:true })
        }
        
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
          currentUser:currentUser.data.Data
          
        })


            
  }
  async handleSubmitCoverFile(e){
    e.preventDefault()
    this.setState({
      Loading:true
    })
    
    const data = new FormData() 
    data.append('image', this.state.cover_image_file)
    
    if(this.state.cover_image_file===""){
      //console.log("this.state.profile_image_file :"+this.state.profile_image_file+"123")
      this.setState({
        ToastContent:"Upload Fail",
        showToast:true,
        Loading:false,
        show_cover_pic_moodle:false
      })
      return
    }
     
    

    const res=await changeCoverPicFun(data)
    //console.log("home:changeCoverPicFun: status :"+res.data.status)

        
          
          
          this.setState({
            cover_pic:res.data.cover_image_url,
            ToastContent:"Cover pic updated",
            showToast:true,
            Loading:false
          })

        



    const currentUser=await currentUserFun()
    //console.log("home:currentUserFun: status3 :"+currentUser.data.status)
    
        
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
          currentUser:currentUser.data.Data
          
        })


            
  }

  handleImagePreview = (e) => {
    
    let image_as_files = e.target.files[0];
    
    this.setState({
       profile_image_file: image_as_files,
    })
    
  }
  handleImagePreviewCover = (e) => {
    
    let image_as_files = e.target.files[0];
    
    this.setState({
       cover_image_file: image_as_files,
    })
    
  }


  toggleShow(e){
    let x=e.target.value
    
    this.setState((prevState) => ({
      show: !prevState.show,
      ToastContent:x
    }));
    
  }
  
  
  showModalFun(e){
    this.setState((prevState) => ({
      showModal: true
    }));
    //console.log(this.state.show)
  }
  ///status------
  async handleCreateStatusPost(e){
    this.setState({
      Loading:true
    })
    const data={
      content:this.state.status
    }
    let cont="Blank"
    if(this.state.status==""){
      cont='Status cannot be empty.'
    }
    else{
      const result=await createStatusPostFun(data)
      cont='Status updated successfully.'
    }
    
    
    
    //console.log("home:createStatusPostFun: status :"+result.data.status)
    
    //Component did mound copy paste
    const currentUser=await currentUserFun()
    //console.log("home:currentUserFun: status4 :"+currentUser.data.status)
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
      currentUser:currentUser.data.Data,
      
      ToastContent:cont,
      showToast:true,
      Loading:false,
      showModal:false
      
    })
    
  }


  onStatusChnage(e){
    this.setState({
      status:e.target.value
      
    })
    //console.log(this.state.status)
  }

  handleChange(e){
    //console.log(e.target.name +"  "+ e.target.value)
    this.setState({
        [e.target.name] : e.target.value
    })
  }

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

    if(this.state.currentUser.isVerified==false)
    {
      return(
        <Verify parent={this}/>
      )
    }
  
  

    return (
      <>


<Modal dialogClassName="my-modal" show={this.state.show_profile_pic_moodle} onHide={()=>{this.setState({ show_profile_pic_moodle:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Photo</Modal.Title>
        </Modal.Header>



        <Modal.Body>
          
               

            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" >
                    <Tab eventKey="home" title="Home">
                      <Form className="text-left">
                                <div class="custom-file">
                                    <input required onChange={this.handleImagePreview} type="file" class="custom-file-input" id="customFile" />
                                    <label class="custom-file-label" for="customFile">Choose file</label>
                                </div>   
                          <Button onClick={this.handleSubmitProfileFile} className="mt-2" variant="primary"  onHide={()=>{this.setState({ show_profile_pic_moodle:false })}}>
                            Save Changes
                          </Button>             
                      </Form> 
                      
                    </Tab>

                    <Tab eventKey="profile" title="Profile Photos">
                          <CarouselComponent picArray={this.state.profilePicArray} />
                    </Tab>

                    <Tab eventKey="contact" title="Cover Photos">
                          <CarouselComponent picArray={this.state.coverPicArray} />
                    </Tab>
            </Tabs>


        </Modal.Body>
        <Modal.Footer>
          
          
        </Modal.Footer>
      </Modal>
{/* end Modal for profile pic */}

{/* Modal for cover pic */}
<Modal dialogClassName="my-modal" show={this.state.show_cover_pic_moodle} onHide={()=>{this.setState({ show_cover_pic_moodle:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Select Photo</Modal.Title>
        </Modal.Header>



        <Modal.Body>
          
          <Form className="text-left" >
              <div class="custom-file">
                  <input required onChange={this.handleImagePreviewCover} type="file" class="custom-file-input" id="customFile" />
                  <label class="custom-file-label" for="customFile">Choose file</label>
              </div>  
              <Button  onClick={this.handleSubmitCoverFile} className="mt-2" variant="primary"  onHide={()=>{this.setState({ show_cover_pic_moodle:false })}}>
                        Save Changes
              </Button>              
          </Form>       
          
        </Modal.Body>
        <Modal.Footer>
        
          
        </Modal.Footer>
      </Modal>
{/* end Modal for Cover pic */}


{/* Modal for status */}
<Modal show={this.state.showModal} onHide={()=>{this.setState({ showModal:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Status Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to upload the status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ showModal:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCreateStatusPost}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
{/* Modal end */}


{/* Modal for update profile */}

<Modal dialogClassName="my-modal" show={this.state.showModalUpdate} onHide={()=>{this.setState({ showModalUpdate:false })}}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
         
<div class="form-group">
    <label for="exampleInputPassword1">First Name</label>
    <input required type="text" onChange={this.handleChange} name="temp_first_name" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Last Name</label>
    <input required type="text" onChange={this.handleChange} name="temp_last_name"  class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>
<div class="form-group">
    <label for="exampleInputPassword1">Bio</label>
    <input required type="text" onChange={this.handleChange} name="temp_bio" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>             
              
              
            
                    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.setState({ showModalUpdate:false })}}>
            Close
          </Button>
          <Button variant="primary" onClick={async()=>{
            
            
            const data={
              
                first_name:this.state.temp_first_name,
                last_name:this.state.temp_last_name,
                bio:this.state.temp_bio
              
            }
            
          
          const result=await updateProfileFun(data)
          
          if(result.data.status=='success'){
            this.setState({
              first_name:result.data.user.first_name,
              last_name:result.data.user.last_name,
              bio:result.data.user.bio,
              
            })
          }
          

          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
{/* Modal end */}





        <Container style={{marginBottom:"70px"}}>
          
          <Row >
                <Col sm={12}>
      <OverlayTrigger
        key="right"
        placement="auto"
        overlay={
          <Tooltip id={`tooltip-right`}>
            Click Me!
          </Tooltip>
        }
      >                  
                  <Image onClick={this.cover_image_click} style={{height:'300px',width:'100%'}} src={this.state.cover_pic} fluid thumbnail/>
      </OverlayTrigger>
      <OverlayTrigger
        key="right"
        placement="right"
        overlay={
          <Tooltip id={`tooltip-right`}>
            Click Me!
          </Tooltip>
        }
      >   
                  <Image onClick={this.profile_image_click} style={{height:'200px',width:'200px',position:'absolute',top:'230px',left:'30px',zIndex:'999'}} src={this.state.profile_pic} roundedCircle fluid thumbnail/>
      </OverlayTrigger>
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
                            <button type="button" onClick={()=>{ this.setState({ showModalUpdate:true }) }} class="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
                              Update Profile
                            </button>                      

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
defaultActiveKey="Timeline" 
id="uncontrolled-tab-example"
unmountOnExit="true"
onSelect={(k)=>{  this.setState({currentTab:k})}}
>
  <Tab style={{color:"#"}} eventKey="Timeline" title="Timeline">
  <TimelineInsideProfile handleToast={this.handleToast} name="Timeline" onStatusChnage={this.onStatusChnage} parent={this} />
  
  </Tab>
  <Tab eventKey="MyTimeline" title="MyTimeline">
  {/* <MyTimelineInsideProfile name="MyTimeline" onStatusChnage={this.onStatusChnage} TimelineType="MyTimeLine" parent={this} /> */}
  <TimelineInsideProfile handleToast={this.handleToast} name="MyTimeline" onStatusChnage={this.onStatusChnage} parent={this} />

  </Tab>
  
  <Tab eventKey="Friends" title="Friends">
    {/* <Friend/> */}
    <ExploreNewFriends handleToast={this.handleToast} name="Friends" typeTab={this.state.currentTab} />
  </Tab>
  <Tab eventKey="ExploreNewFriends" title="ExploreNewFriends">
  <ExploreNewFriends handleToast={this.handleToast} name="ExploreNewFriends" typeTab={this.state.currentTab} />
  </Tab>

  <Tab eventKey="CreatePost" title="CreatePost">
    <CreatePost handleToast={this.handleToast}/>
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

export default Home