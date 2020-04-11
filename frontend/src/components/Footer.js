// #only this timeline file is important
import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';




import './Home.css'
import { allpostsFun,myfriendsFun,likeFun } from '../functions/funtions'

class MyTimeline extends React.Component {
  constructor(props){
    super(props)
  }
  


  render() {
    
    return (
      
      <>
        
        {/* <h1 style={{margin:"50px",position: "fixed",bottom:"0px",textAlign:"center"}} ><b>Developed with ❤️ by <a href="https://github.com/RugvedB">Rugved Bongale</a></b></h1> */}

        <h3 class="footer" id="footer"><b>Developed with ❤️ by <a href="https://github.com/RugvedB">Rugved Bongale</a></b></h3>


      
      </>



    
    ) 
  }
}

export default MyTimeline


