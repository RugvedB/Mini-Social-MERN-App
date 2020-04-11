// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Carousel,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import './Loading.css'
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

class CarouselComponent extends React.Component {
  constructor(props){
    super(props)
    
    this.state={}
    
    
    
  }
  




  componentDidMount(){}


  

  

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


<Carousel>
  
  {this.props.picArray.map((data,index)=>{
    return <Carousel.Item>
    <img
      className="d-block w-100"
      src={data}
      alt="First slide"
    />
  <Carousel.Caption>
    
    <p>{index}</p>
  </Carousel.Caption>
  </Carousel.Item>
  
    })}
    
</Carousel>      
        




      
      </>



    
    ) 
  }
}

export default CarouselComponent


