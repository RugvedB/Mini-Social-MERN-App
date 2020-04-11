import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Tooltip,OverlayTrigger,Form,Row,Col, Container,Modal,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';






import { login } from '../functions/funtions' 

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    

  }
  
  async handleSubmit(e){
    
    // const response=await axios
    // .post('http://localhost:5000/users/login',{
    //   email:this.state.username,
    //   password:this.state.password
    // })

    let data={
      email:this.state.email,
      password:this.state.password
    }
    const response=await login(data)
    //console.log("Login:login: status :"+response.data.status)
    if(response.data.status=="fail"){
      console.log('response.data.Data : '+response.data.Data)
      this.props.history.push(`/error`)
    }
    this.props.history.push(`/home`)
    
    

    // console.log(response.data.token)
    // localStorage.setItem('usertoken',response.data.token)
    
    // this.props.history.push(`/home`)
  }
  
  
  handleChange(e){
    this.setState({
        [e.target.name] : e.target.value
    })
  }

  render() {
    
    return (
      <>


<Form onSubmit={this.handleSubmit} style={{width:"60%"}} className="container text-left mt-2">

<Form.Group >
    <Form.Label className="text-left">Email</Form.Label>
    <Form.Control required name="email" onChange={this.handleChange} type="text" placeholder="Enter email" />
    
  </Form.Group>

  

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
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

export default Login