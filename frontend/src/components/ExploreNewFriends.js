import React from 'react';
import ReactDOM from 'react-dom';
import { Toast,Card,Button,Form,Row,Col, Container,Image,Tabs,Tab,Badge,Alert,Accordion,InputGroup,FormControl } from 'react-bootstrap';
import { BrowserRouter as Router, Route,Switch,Redirect } from 'react-router-dom'

import { sendFriendRequestFun,allusersFun,checktoken, allusersmyfriendsFun,addFriendFun,removeFriendFun } from '../functions/funtions'

class ExploreNewFriend extends React.Component {
  constructor(props){
    super(props)
    this.state={
        myDisplayList:[],
        myCompleteList:[],
        myfriends:[],
        Loading:true,
    }
    this.handleAdd=this.handleAdd.bind(this)
    this.handleRemove=this.handleRemove.bind(this)
  }

  async componentDidMount() {
    if(!checktoken()){
      return
    }


  const allusers=await allusersFun()
  

  

  const myfriends=await allusersmyfriendsFun()
  
  
  if(myfriends.data.status=="success"){
  }
  else{
  }

    
    this.setState({
        myCompleteList:allusers.data.Data,
        myDisplayList:allusers.data.Data,
        myfriends:myfriends.data.Data,
        Loading:false
    })
    
  }
  async handleAdd(e){

    // for(var i=0;i<this.state.myfriends.length;i++){
    //   console.log("#myfrinds :"+this.state.myfriends[i]._id)
    // }
    // for(var i=0;i<this.state.myCompleteList.length;i++){
    //   console.log("#myCompleteList :"+this.state.myCompleteList[i]._id)
    // }
    let x=e.target.id 
    const bodyParameters = {
      friendThisUserId: x
    };
    

    const response=await addFriendFun(bodyParameters)
    //console.log("ExploreNewFriends:addFriendFun: status :"+response.data.status)
   
    // const response=await sendFriendRequestFun(bodyParameters)

    this.setState({ Loading:true })
  const allusers=await allusersFun()
  
  //console.log("ExploreNewFriends:allusersFun: status :"+allusers.data.status)



  const myfriends=await allusersmyfriendsFun()
  //console.log("ExploreNewFriends:allusersmyfriendsFun: status :"+myfriends.data.status)

    //console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:allusers.data.Data,
        myDisplayList:allusers.data.Data,
        myfriends:myfriends.data.Data,
        Loading:false
    })
    this.props.handleToast("Added to friends Successfully")


  }


  async handleRemove(e){
    let x=e.target.id 
    const bodyParameters = {
      friendThisUserId: x
    };
    

    this.setState({ Loading:true })
    const response=await removeFriendFun(bodyParameters)
    //console.log("ExploreNewFriends:removeFriendFun: status :"+response.data.status)
    //console.log(response.data)

  const allusers=await allusersFun()
  //console.log("ExploreNewFriends:allusersFun: status :"+allusers.data.status)


  const myfriends=await allusersmyfriendsFun()
  //console.log("ExploreNewFriends:allusersmyfriendsFun: status :"+myfriends.data.status)

    //console.log("myfriends : "+myfriends.data)
    this.setState({
        myCompleteList:allusers.data.Data,
        myDisplayList:allusers.data.Data,
        myfriends:myfriends.data.Data,
        Loading:false
    })
    this.props.handleToast("Removed from friends Successfully")


  }

  filterList = (event) => {
    this.setState({ Loading:true })
    let myDisplayList = this.state.myCompleteList.filter((item) => {
      if(item.email.toLowerCase().search(event.target.value.toLowerCase()) !== -1){
        //console.log('filterhere :'+item.email)
        return item
      }
        
    });
      
          this.setState({myDisplayList: myDisplayList,Loading:false});

    
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
    
    if(this.props.typeTab=="ExploreNewFriends"){
      return (
        <>
        

                <InputGroup style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                    <FormControl
                    
                    onChange={this.filterList}
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    
                    />
                
                </InputGroup>  
        
        {this.state.myDisplayList.map(n=>{
          //console.log("myDisplayList ::" +n._id)
            return <Row style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                <Col sm={2} >
                    <Image style={{height:'100px',width:'100%',margin:'0.5rem'}} src={n.profile_pic[n.profile_pic.length-1]} roundedCircle />
                </Col>
                <Col sm={8} >
                    <Card style={{margin:'0.5rem',textAlign:'left'}}>
                        <Card.Body><a href={'/profile/'+n.email}>{n.email}</a></Card.Body>
                    </Card>
                </Col>
                <Col sm={2}>
                    
                    {this.state.myfriends.some(f=>f._id ===n._id)==1? <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>:<Button onClick={this.handleAdd} id={n._id} className="text-center" variant="primary">Add Friend</Button>}
                    
                </Col>
                
            </Row>      
        })}  
        </>
    
    )
    }





    else{
      return (
        <>
        

                <InputGroup style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                    <FormControl
                    
                    onChange={this.filterList}
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    
                    />
                
                </InputGroup>  
        
        {this.state.myDisplayList.map(n=>{
          //console.log("myDisplayList ::" +n._id)
          if(this.state.myfriends.some(f=>f._id ===n._id)==1){
            return <Row style={{display: 'flex',alignItems: 'center',overflow:'hidden'}} className="border border-primary m-2">
                <Col sm={2} >
                    <Image style={{height:'100px',width:'100%',margin:'0.5rem'}} src={n.profile_pic[n.profile_pic.length-1]} roundedCircle />
                </Col>
                <Col sm={8} >
                    <Card style={{margin:'0.5rem',textAlign:'left'}}>
                        <Card.Body>{n.email}</Card.Body>
                    </Card>
                </Col>
                <Col sm={2}>
                    
                    
                    {/* {this.state.myfriends.some(f=>f._id ===n._id)==1 && <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>} */}
                    <Button onClick={this.handleRemove} id={n._id} className="text-center" variant="primary">Remove Friend</Button>
                </Col>
                
            </Row>
          }      

        })}  
        </>
    
    )
    }
     
  }
}

export default ExploreNewFriend