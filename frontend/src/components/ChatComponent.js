import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { currentUserFun,getUserByGmail } from '../functions/funtions'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ScrollToBottom,{ useScrollToBottom,useSticky } from 'react-scroll-to-bottom';

import io from 'socket.io-client'

let socket;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: "100%",
        margin:"10vh 50vh 0vh 50vh",
        height: "60vh",
        
      },
    },
    chip:{
        margin:"10px",
        height:"50px",
        
    },
    flex:{
        display:'flex',
        alignItems:'center'
    },
    scroll:{
        height:'50vh',
        width:'100%'
    },
  }));


const ChatComponent = () => {
    const classes = useStyles();
    const [currentUser,setCurrentUser] = useState(null)
    const [frn,setFrn] = useState(null)
    const [roomName,setRoomName] = useState('')
    const [msgArray,setMsgArray] = useState([])
    // const ENDPOINT = 'http://localhost:5000/';
    const ENDPOINT = 'https://mini-social-react-app.herokuapp.com/';
    

    const [msg,setMsg] = useState('')

    useEffect(()=>{
        if(!socket){
            socket=io(ENDPOINT)
            console.log('Socket created!')
            console.log(socket)

            // socket.on('message',(data)=>{
            //     const chatArrayInitialize = data.chatArray
            //     const arrivalMsg = data.text
            //     console.log(data)
            //     setMsgArray(chatArrayInitialize)
            // })

            socket.on('chatData',(data)=>{
                const chatArrayInitialize = data.chatArray
                
                console.log('chatData')
                console.log(data)
                setMsgArray(chatArrayInitialize)
            })

           
        }
    },[])

    useEffect(async ()=>{
        let url = window.location.href
        try{
            let currentUser_var=await currentUserFun()
            currentUser_var = currentUser_var.data.Data
            setCurrentUser(currentUser_var)

            url = url.split('/chat/')[1]
            //let me_url_mail = url.split('/')[0]
            let friend_url_mail = url.split('/')[0]
            
            const resp_frn = await getUserByGmail({email:friend_url_mail})
            //const resp_me = await getUserByGmail({email:me_url_mail})
            if(resp_frn.data.status == "success"){
                console.log(resp_frn.data.Data)
                // console.log(resp_me.data.Data)
                setFrn(resp_frn.data.Data)
                
                console.log('currentUser_var.email +"-"+ resp_frn.data.Data.email')
                console.log(currentUser_var.email +"-"+ resp_frn.data.Data.email)
                //Now as both are authorized ...get the messages
                const comp = currentUser_var.email.localeCompare(resp_frn.data.Data.email)
                let roomName = ""
                if(comp == -1){
                    roomName = currentUser_var.email +"-"+ resp_frn.data.Data.email
                }
                else if(comp == 0){
                    roomName = currentUser_var.email +"-"+ resp_frn.data.Data.email
                }
                else{
                    roomName = resp_frn.data.Data.email +"-"+ currentUser_var.email
                }
                setRoomName(roomName)
                socket.emit('sendInfoToServer',{currentUser:currentUser_var,frn:resp_frn.data.Data,roomName:roomName})
                

                socket.on('newMessageIncoming',(data)=>{
                    const sender = data.sender
                    const content =  data.content
                    const receiver = data.receiver
                    
                    let newMsg =    
                        {
                            sender:sender.email,
                            receiver:currentUser_var.email,
                            content:content
                        }
                    
                    setMsgArray(msgArray => [...msgArray,newMsg])
                })

            }
            else{
                console.log('Unauthorized user')
            }
            
            
        }
        catch(err){}
        
    },[])
    
    
   

    function handleSend(){
        console.log("Btn: "+msg)
        let newMsg=
            {
                sender:currentUser._id,
                receiver:frn._id,
                content:msg
            }


        socket.emit('newMessage',{currentUser:currentUser,frn:frn,roomName:roomName,content:msg})
        
        setMsgArray(msgArray => [...msgArray,newMsg])
        
    }
    
    

    
    
    
    if(currentUser && frn && msgArray.length>=0){
        console.log(msgArray)
        return (
            
                <div className={classes.root}>
                    <Paper elevation={3} >
                        <ScrollToBottom className={classes.scroll}>
                            {msgArray.map((data,index)=>{
                                
                                if(data.sender == currentUser._id){
                                    console.log(data.sender +" == "+ currentUser._id)
                                    return(
                                        <div style={{float:"right",clear:"both"}} className="row ml-1 mr-1 mt-1">
                                            <Chip
                                                avatar={<Avatar alt="Natacha" src={currentUser.profile_pic[currentUser.profile_pic.length-1]} />}
                                                label={data.content}
                                                clickable
                                                color="primary"
                                                className={classes.chip}
                                            />
                                        </div>
                                        )
                                }
                                else{
                                    console.log(data.sender +" != "+ currentUser._id)
                                    return(
                                        <div style={{float:"left",clear:"both"}} className="row ml-1 mr-1 mt-1">
                                            <Chip
                                                avatar={<Avatar alt="Natacha" src={frn.profile_pic[frn.profile_pic.length-1]} />}
                                                label={data.content}
                                                clickable
                                                color="primary"
                                                className={classes.chip}
                                            />
                                        </div>
                                        )
                                }
                                    
                            })}
                        </ScrollToBottom>
                        
                        
                        


                        {/* chat end */}
                        
                        <div style={{clear:"both",padding:"10px"}}>
                            <div className="row">
                                <div className="col-10">
                                    <TextField onChange={(e) => setMsg(e.target.value)} id="standard-basic" label="Send Message" style={{width:"100%"}} />
                                </div>
                                <div className="col-2">
                                    <Button onClick={(e) => handleSend()} variant="contained" color="primary" style={{width:"100%"}}>Send</Button>
                                </div>
                            </div>
                        </div>    
                                                
                    </Paper>
                    
                </div>
                
            
        );
    }
    else{
        return (
            <div className="container-fluid">
                Loading...
            </div>
        );
    }
};

export default ChatComponent;