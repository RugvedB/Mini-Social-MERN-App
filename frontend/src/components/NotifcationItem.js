import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';



class NotifcationItem extends React.Component {
  constructor(props){
    super(props)
  }
 
  render() {
    return (
        <>
        


            <Row style={{backgroundColor:"#d3d3d3"}} className="border border-primary m-2">
                <Col sm={2} >
                   
                        <Image className="border border-dark" style={{height:'100px',width:'100%'}} src={this.props.notif.sentBy.profile_pic[this.props.notif.sentBy.profile_pic.length-1]} roundedCircle />
                   
                    

                </Col>
                <Col sm={9} >
                    <div style={{overflowY:"scroll",height:"100px",paddingTop:'4px'}}>
                        {/* <h2 className="font-weight-bold text-light rounded border border-dark" style={{backgroundColor:"#d3d3d3",display:'inline',padding:'2px'}}>{this.props.createdBy}</h2> */}
                        <h2 className="font-weight-bold text-light rounded border border-dark" style={{backgroundColor:"#000000",display:'inline',padding:'2px'}}><a href={this.props.notif.link}>{this.props.notif.sentBy.first_name}</a></h2>
                        <p style={{backgroundColor:"#d3d3d3",marginTop:"4px"}} className="border border-black">{this.props.notif.content}</p>
                        
                        
                    </div>
                </Col>
                <Col sm={1}>
                <Button id={this.props.notif._id} onClick={this.props.deleteNotif} style={{verticalAlign:'middle'}} variant="danger">
                        X
                </Button>
                </Col>
                
            
            </Row> 
        
                   
        </>
    
        
        


    
    ) 
  }
}

export default NotifcationItem