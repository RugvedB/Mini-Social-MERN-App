import axios from 'axios'

export const login = async(data)=> {

    const result=await axios
    .post('/users/login',{
      email:data.email,
      password:data.password
    })

    localStorage.setItem('usertoken',result.data.token)
    logUserOut()

    return result
  }




export const logUserOut = token =>{
  
    setTimeout(()=> localStorage.removeItem('usertoken'), 1000*60*60)
}

export const register = async(data)=> {
  try{
    const result=await axios
    .post('/users/register',{
      first_name:data.first_name,
      last_name:data.last_name,
      email:data.email,
      password:data.password
    })
    return result
  }
  catch(err){
    const response={
      data:{
      status:'fail'
    }}
    return response
  }

    
}

export const verifyChange = async(data)=> {
  try{
    const result=await axios
    .post('/users/verifyChange',{
      email:data.email,
      password:data.password
    })
    return result
  }
  catch(err){
    const result={
      data:{
        status:'fail'
      }
    }
    return result
  }

    
}

export const currentUserFun=async()=>{
  try{  
  const result=await axios.post('/users/currentUser',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    })
    return result
  }
  catch(err){
    const result={
      data:{
        status:'fail'
      }
    }
    return result
  }
    
}

export const getUserByGmail=async(data)=>{
  try{  
  const result=await axios.post('/users/getUserByGmail',{email:data.email},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        
      }
    })
    return result
  }
  catch(err){
    const result={
      data:{
        status:'fail'
      }
    }
    return result
  }
    
}

export const getAllPostForProfileFun=async(data)=>{
  
  try{
  const result=await axios.post('/users/getAllPostForProfile',{id:data.id},
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      // "Content-type": "multipart/form-data",
    }
  }
  )
  console.log('result : '+result)
  return result
}
catch(err){
  const result={
    networkError:true
  }
  return result
}
} 


export const changeProfilePicFun=async(data)=>{
    const result=await axios.post("/users/changeProfilePic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
}

export const changeCoverPicFun=async(data)=>{
    const result=await axios.post("/users/changeCoverPic", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
}

export const allpostsFun=async()=>{
    const result=await axios.post('/users/allposts',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )
    return result
}

export const myfriendsFun=async()=>{
    const result=await axios.post('/users/myfriends',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        "Content-type": "multipart/form-data",
      }
    }
    )
    return result
}

export const likeFun=async(bodyParameters)=>{
    const result=await axios.post('/users/like',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
}



export const createPostFun=async(data)=>{
    const result=await axios.post("/users/createPost", data, 
    {
      headers: {
          "Authorization": "Bearer "+localStorage.usertoken,
          "Content-type": "multipart/form-data",
      },                    
    })
    return result
} 

export const myNotificationsFun=async(data)=>{
    const result=await axios.post('/users/myNotifications',{},
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken
      }
    })
    
    return result
} 

export const deleteNotifFun=async(data)=>{
    const result=await axios.post('/users/deleteNotif',{
        notifId:data.notifId
      },
      {
        headers:{
          'authorization':'Bearer '+localStorage.usertoken
        }
      })
    return result
} 

export const allusersmyfriendsFun=async(data)=>{
    const result=await axios.post('/users/allusersmyfriends',{},
    {
    headers: {
        "Authorization": "Bearer "+localStorage.usertoken,
        "Content-type": "multipart/form-data",
    },                    
  })
    return result
} 

export const removeFriendFun=async(bodyParameters)=>{
    const result=await axios.post('/users/removeFriend',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
} 

export const allusersFun=async()=>{
    const result=await axios.post('/users/allusers',{},
    {
    headers: {
        "Authorization": "Bearer "+localStorage.usertoken,
        "Content-type": "multipart/form-data",
    },                    
  })
    return result
} 

export const addFriendFun=async(bodyParameters)=>{
    const result=await axios.post('/users/addFriend',bodyParameters,
    {
      headers:{
        'authorization':'Bearer '+localStorage.usertoken,
        'Content-Type': 'application/json',
      }
    }
    )
    return result
} 

export const createStatusPostFun=async(data)=>{
  const result=await axios.post('/users/createStatusPost',data,
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      'Content-Type': 'application/json',
    }
  }
  )
  return result
} 

export const updateProfileFun=async(data)=>{
  const result=await axios.post('/users/updateProfile',data,
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      'Content-Type': 'application/json',
    }
  }
  )
  return result
}
export const myallpostsFun=async()=>{
  const result=await axios.post('/users/myallposts',{},
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      "Content-type": "multipart/form-data",
    }
  }
)
  return result
} 

export const getAllPostByMyFriendsFun=async()=>{
  try{
  const result=await axios.post('/users/getAllPostByMyFriends',{},
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      "Content-type": "multipart/form-data",
    }
  }
  )
  return result
}
catch(err){
  const result={
    networkError:true
  }
  return result
}
} 

export const createCommentFun=async(bodyParameters)=>{
  const result=await axios.post('/users/createComment',bodyParameters,
  {
    headers:{
      'authorization':'Bearer '+localStorage.usertoken,
      'Content-Type': 'application/json',
    }
  }
  )
  return result
}

export const checktoken=()=>{
  if(!localStorage.usertoken || localStorage.usertoken=="undefined"){
      
    return false
  }
  else{
    return true
  }
}