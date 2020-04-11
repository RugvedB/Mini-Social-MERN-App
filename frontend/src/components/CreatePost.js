import React, { Component } from 'react'
import { Toast,Card,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

import { createPostFun } from '../functions/funtions'
import './Home.css'

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {},
      profileData:'abc',
      
      image_file: null,
      image_preview:'',
      caption:'',
      Loading:false
      
    }
    this.handleSubmitFile = this.handleSubmitFile.bind(this)
    this.handleImagePreview = this.handleImagePreview.bind(this)
    this.captionChange=this.captionChange.bind(this)
  }

 

captionChange(e) {
  this.setState({ caption: e.target.value })
}

async handleSubmitFile (){
  this.setState({
    Loading:true
  })
  
  const data = new FormData() 
  data.append('image', this.state.image_file)
  data.append('caption',this.state.caption)
   
  
  const res=await createPostFun(data)
  // console.log("createPost:createPostFun: status :"+res.data.status)


  this.setState({
    Loading:false
  })
  this.props.handleToast("Post created successfully")

  
}

handleImagePreview = (e) => {
  let image_as_base64 = URL.createObjectURL(e.target.files[0])
  let image_as_files = e.target.files[0];

  
  this.setState({
      image_preview: image_as_base64,
      image_file: image_as_files,
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
      
      <div>
        
        
        
<Form onSubmit={this.handleSubmitFile}  className="text-left">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Enter Caption</Form.Label>
    <Form.Control required value={this.state.caption} name="caption" onChange={this.captionChange} type="text" placeholder="Enter caption" />
    
  </Form.Group>

  
    
{/* <form class="custom-file" onSubmit={this.handleSubmitFile}> */}
<div class="custom-file">
    <input required onChange={this.handleImagePreview} type="file" class="custom-file-input" id="customFile" />
    <label class="custom-file-label" for="customFile">Choose file</label>
</div>
<Button  type="submit" className="mt-2"  value="Submit" variant="primary">
    Submit
</Button>
{/* </form> */}


  
 
       


        {/* image preview */}
        
            <br></br>
       
            
            
  
  
</Form> 
        
      </div>
    )
  }
}

export default CreatePost