import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Modal,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

import NotificationItem from './NotifcationItem'
import axios from 'axios';
import { checktoken,myNotificationsFun,deleteNotifFun } from '../functions/funtions';
import './Home.css'

class Notifications extends React.Component {
  constructor(props){
    super(props)
    
    this.state={
      comment_content:'',
      show:true,
      myNotifications:[],
      Loading:true
    }
    this.deleteNotif=this.deleteNotif.bind(this)
   
  }
  async componentDidMount(){
    // console.log("notiff "+checktoken())
    if(!checktoken()){
      // console.log("notiff "+checktoken())
      return
    }
    const myNotifications=await myNotificationsFun() 
    // console.log("Notifications:myNotificationsFun: status :"+myNotifications.data.status)

    // console.log(myNotifications)
    this.setState({
      myNotifications:myNotifications.data.Data,
      Loading:false
    })
    
  }

  async deleteNotif(e){
    const id=e.target.id
    // console.log(id)

    this.setState({ Loading:true })
    const response=await deleteNotifFun({notifId:id}) 
    // console.log("Notifications:deleteNotifFun: status :"+response.data.status)
    

    
    /////Component did mount
    const myNotifications=await myNotificationsFun() 
    // console.log("Notifications:myNotificationsFun: status :"+myNotifications.data.status)

    // console.log(myNotifications)
    this.setState({
      myNotifications:myNotifications.data.Data,
      Loading:false
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
        
    <Modal dialogClassName="my-modal"  show={this.state.show} onHide={()=>{this.props.history.push(`/home`)}}>
        <Modal.Header closeButton>
          <Modal.Title>MyNotifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        {this.state.myNotifications.map((n)=>{
          return (
            <>
              <NotificationItem deleteNotif={this.deleteNotif} notif={n} />
            </>
            
          )
        })}


        </Modal.Body>
        
      </Modal>          
        
      </div>
      




    
    ) 
  }
}

export default Notifications