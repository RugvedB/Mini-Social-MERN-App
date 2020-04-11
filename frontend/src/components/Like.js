import React,{Component} from 'react'
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'
class Like extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    shouldComponentUpdate(nextProps) {
        if(!localStorage.usertoken){
            return
        }
        //console.log("shouldComponentUpdate called"+nextProps.id)
        // return true
        //console.log("shouldC0mponentUpdate : "+this.props.post.Likes.length +" ? "+ nextProps.post.Likes.length)
        return (this.props.post.Likes.length !== nextProps.post.Likes.length);
    }

    render(){
        return(
            <Button  value="Liked" id={this.props.post._id} onClick={this.props.handleLike} variant="primary">Likes123 <Badge variant="light">{this.props.post.Likes.length}</Badge></Button>
        )
    }

}

export default Like