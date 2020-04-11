const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const checkAuth=require('./check-auth')

var nodemailer = require('nodemailer');

const User = require('../models/Users')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const Notification=require('../models/Notification')
const MyFriendList=require('../models/MyFriendList')
const Like=require('../models/Like')

users.use(cors())

//process.env.SECRET_KEY = 'secretkey'


users.post('/currentUser',checkAuth,async(req,res,next)=>{
  try{
    const user=await User.findById(req.decoded._id)
    return res.json({Data:user,status:'success'})
  }
  catch(err){
    const user=await User.findById(req.decoded._id)
    return res.json({Data:err,status:'fail'})
  }
  
})
users.post('/getUserByGmail',async(req,res,next)=>{
  try{
    const user=await User.findOne({email:req.body.email})
    return res.json({Data:user,status:'success'})
  }
  catch(err){
    const user=await User.findById(req.decoded._id)
    return res.json({Data:err,status:'fail'})
  }
  
})

users.post('/getAllPostByMyFriends',checkAuth,async(req,res)=>{

  try{

  const u=await User.findById(req.decoded._id)
  li=u.MyFriends
  

  Post.find()
  .where('createdBy')
  .in(li)
  .sort('-date')
  // .populate('Likes Comments createdBy')

  .populate(
    [
      { path:'Likes' },
      { path:'createdBy'},
      {
        path:'Comments',
        populate:{
          path:'createdBy',
          select:'_id first_name profile_pic date'
          // populate:'profile_pic'
        }
      }
    ]
  )


  .exec(function (err, records) {
    

    return res.json({Data:records,status:'success'})
  });
  
}
catch(err){
  return res.json({Data:err,status:'fail'})
}
  // return res.json(alldata.friends)
  
})


users.post('/getAllPostForProfile',checkAuth,async(req,res)=>{

  try{

  const u=await User.findById(req.body.id)
  li=[req.body.id]
  

  Post.find()
  .where('createdBy')
  .in(li)
  .sort('-date')
  // .populate('Likes Comments createdBy')

  .populate(
    [
      { path:'Likes' },
      { path:'createdBy'},
      {
        path:'Comments',
        populate:{
          path:'createdBy',
          select:'_id first_name profile_pic date'
          // populate:'profile_pic'
        }
      }
    ]
  )


  .exec(function (err, records) {
    

    return res.json({Data:records,status:'success'})
  });
  
}
catch(err){
  return res.json({Data:err,status:'fail'})
}
  // return res.json(alldata.friends)
  
})

users.post('/allposts',checkAuth,async(req,res)=>{
  try{
  decoded=req.decoded


  allposts=await Post.find().sort('-date').populate('Comments Likes createdBy').exec()
  

  return res.json({Data:allposts,status:'success'})
  }
  catch(err){
    return res.json({Data:err,status:'fail'})
  }
})

// users.post('/myfriends',checkAuth,async(req,res)=>{
//   decoded=req.decoded
//   const myfriends=await User.findById(decoded._id).select('MyFriends')
//   return res.json(myfriends)
// })

users.post('/myallposts',checkAuth,async(req,res)=>{
  decoded=req.decoded

  try{
  allposts=await Post.find({ createdBy:decoded._id }).sort('-date')
  // .populate('Comments Likes createdBy')
  .populate(
    [
      { path:'Likes' },
      { path:'createdBy'},
      {
        path:'Comments',
        populate:{
          path:'createdBy',
          select:'_id first_name profile_pic'
          // populate:'profile_pic'
        }
      }
    ]
  )
  .exec()
  
  return res.json({Data:allposts,status:'success'})
  }
  catch(err){
    return res.json({Data:err,status:'fail'})
  }
  
  
})

users.post('/myNotifications',checkAuth,async(req,res)=>{
  try{
  decoded=req.decoded

  allNotifications=await Notification.find({ sentTo:decoded._id })
  .sort('-date')
  .populate(
    'sentBy'
  )
  .exec()
  
  return res.json({Data:allNotifications,status:'success'})
  }
  catch(err){
    return res.json({Data:err,status:'fail'})
  }
})

users.post('/allusers',checkAuth,async(req,res)=>{
  try{
  
  allusers=await User.find()
  
  
  return res.json({Data:allusers,status:'success'})
  }
  catch(err){
    return res.json({Data:err,status:'fail'})
  }
})

users.post('/allusersmyfriends',checkAuth,async(req,res)=>{
  
try{
  const user=await User.findById(req.decoded._id)
  let li=user.MyFriends
  
  

  User.find()
  .where('_id')
  .in(li)
  .exec(function (err, records) {

    return res.json({Data:records,status:'success'})
  });

}
catch(err){
  return res.json({Data:err,status:'fail'})
}

})

users.post('/verifyChange',async(req,res)=>{
  const user= await User.findOne({
    email: req.body.email
  })
  if(user && user.verificationCode==req.body.password){
    
    user.isVerified=true
    await user.save()
    return res.json({ status:'success',Data: user.email + ' verified!' })
  }
  else{
    return res.json({ error: 'User already exists',Data:'User already exists or wrong code',status:'fail' })
  }
})

users.post('/register',async (req, res) => {
    const today = new Date()

    var minm = 100000; 
            var maxm = 999999; 
            var key= Math.floor(Math.random() * (maxm - minm + 1)) + minm; 

    const userData ={
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today,
      profile_pic:['https://res.cloudinary.com/dn5lfusbo/image/upload/v1586080921/defaultprofile_d1vts9.png'],
      cover_pic:['https://res.cloudinary.com/dn5lfusbo/image/upload/v1586081021/cover-default_etu8dn.jpg'],
      verificationCode:key
    }

    const user= await User.findOne({
        email: req.body.email
      })
      
        if (!user) {
            bcrypt.hash(req.body.password, 10,async (err, hash) => {
              userData.password = hash
              
              try{

                
                


                const u=await User.create(userData)
                

                
                const myfriendlistData =new MyFriendList ({
                    user: u._id,
                    friends:[]
                })
                
                await myfriendlistData.save()
            
            //send verification mail
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: process.env.admin_mail,
                pass: process.env.admin_password
              }
            });
            
            
            var mailOptions = {
              from: process.env.admin_mail,
              to: req.body.email,
              subject: 'Verification',
              text: 'Verification code : '+key
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                return res.json({Data:err,status:'fail' })
              } else {
                console.log('Email sent: ' + info.response);
                return res.json({ status:'success',Data: 'Mail sent successfully' })
              }
            });

            //end


                
                
                //
                return res.json({ status:'success',Data: userData.email + ' Registered!' })
              }
              catch(err){
                return res.json({Data:err,status:'fail' })
              }
            } 
            )
            
            
            


        }
        else {
            return res.json({ error: 'User already exists',Data:'User already exists',status:'fail' })
        }
        
        
    })



    users.post('/login',async (req, res) => {
        const user=await User.findOne({
          email: req.body.email
        })
        
            if (user) {
              // if(user.isVerified==false){
              //   return res.json({status:'fail',Data:'Email Not Verified.'})
              // }
              if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
		              bio:user.bio,
                  profile_pic:user.profile_pic[user.profile_pic.length-1],
                  cover_pic:user.cover_pic[user.cover_pic.length-1]
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: '1h'
                })
                return res.json({token:token,status:'success'})
              } else {
                // Passwords don't match
                
                return res.json({status:'fail',Data:'Password doesnt match'})
              }
            } else {
              
              return res.json({status:'fail',Data:'User does not exist'})
            }
    })
          
      



const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    
    cb(null, file.originalname)
  }
})

users.post('/createPost',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.json({status:'fail',Data:err})
      }
      
      

      if (!req.file || req.file=="undefined") {
        return res.json({status:'fail',Data:'File not present'})
      }

      
      const filetype=req.file.mimetype.split('/')[0]
      
      

      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()

      
      
      
      if(filetype=='image'){
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          
        //   res.json(image)
            
        try{
            const postData =new Post ({
                caption: req.body.caption,
                image_url: image.url,
                createdBy:user._id,
                Likes:[],
                Comments:[]
            })
            
                const p=await postData.save()
                //Now also update user's array of MyPost
                const postlist=user.MyPosts
                
                postlist.push(p._id)
                
                user.MyPosts=postlist
                await user.save()

                return res.json({status:'success'})
            }
            catch(err){
              return res.json({status:'fail',Data:err})
            }


        }
      )
      }
      else if(filetype=="video"){
        //Not an image...most probably a video
        cloudinary.uploader.upload(path, 
          { resource_type: "video", 
            public_id: `blog/videos/${uniqueFilename}`,
            chunk_size: 6000000,
            eager: [
              { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
              { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
            eager_async: true,
            eager_notification_url: "https://mysite.example.com/notify_endpoint" },
          
            async function(err, image) {////////////////Here image is just for name sake....its actually holding data about video
              if (err) return res.send(err)
              
              // remove file from server
              const fs = require('fs')
              fs.unlinkSync(path)
              // return image details
              
            //   res.json(image)
                
            try{
                const postData =new Post ({
                    caption: req.body.caption,
                    image_url: image.url,
                    createdBy:user._id,
                    Likes:[],
                    Comments:[],
                    postType:"video"
                })
                
                    const p=await postData.save()
                    //Now also update user's array of MyPost
                    const postlist=user.MyPosts
                    
                    postlist.push(p._id)
                    
                    user.MyPosts=postlist
                    await user.save()
    
                    return res.json({status:'success'})
                }
                catch(err){
                  return res.json({status:'fail',Data:err})
                }
    
    
            }
          )



      }    






    })
  


        }catch(err){
          return res.json({status:'fail',Data:err})
        }
    }
    else{
      return res.json({status:'fail',Data:'No User'})
    }

    
})

users.post('/createStatusPost',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    
            const postData =new Post ({
                caption: req.body.content,
                image_url: '',
                createdBy:user._id,
                Likes:[],
                Comments:[]
            })
            
                const p=await postData.save()
                //Now also update user's array of MyPost
                const postlist=user.MyPosts
            
                postlist.push(p._id)
            
                user.MyPosts=postlist
                const u=await user.save()
            

                res.json({status:'success'})
            }
            catch(err){
              return res.json({status:'fail',Data:err})
            }


        }
      
    
  

    
    else{
      return res.json({status:'fail',Data:'No User'})
    }

    
})

users.post('/createComment',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })

    const post=await Post.findOne({_id:req.body.postId})
    
    

    const commentData =new Comment ({
      content: req.body.content,
      createdBy:user._id,
      postId:post._id
    })
    
      const cmt=await commentData.save()
      
      await post.Comments.push(cmt)
      const p=await post.save()

      //Create Notif about the comment
      const notificationData =new Notification ({
        content: decoded.email +" comented ' "+ req.body.content +" ' on post with caption ' "+post.caption+" '",
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:3,//3->comment
        postId:post._id
      })
      
        await notificationData.save()


        ////get updated post it......dont populate it before saving....because the lastest saved wont be pulated den
        const postfinal=await Post.findOne({_id:req.body.postId})
        // .populate('Likes createdBy Comments')
        .populate(
          [
            { path:'Likes' },
            { path:'createdBy'},
            {
              path:'Comments',
              populate:{
                path:'createdBy',
                select:'_id first_name profile_pic'
                // populate:'profile_pic'
              }
            }
          ]
        )
        .exec()
      

      return res.json({status:'success',post:postfinal,Data:postfinal})
    
  
      
  })

  users.post('/createNotification',checkAuth,async (req, res) => {
  
    decoded=req.decoded
    const user=await User.findOne({
      _id: decoded._id
    })
    
    if(user){
        try{
      
        
              const notificationData =new Notification ({
                  content: req.body.content,
                  sentBy:req.body.sentBy,
                  sentTo:req.body.sentTo,
                  notificationType:req.body.notificationType
              })
              
                  await notificationData.save()
                  res.json({'status':'success'})
              
              
        
    
  
  
        }catch(err){
          return res.json({status:'fail',Data:err})
        }
      }
      else{
        return res.json({status:'fail',Data:'No User'})
      }
  
      
  })

users.post('/addFriend',checkAuth, (req, res) => {
//pass it without bearer in this case.....jwt.verify takes token without keyword 'Bearer '
decoded=req.decoded
User.findOne({
_id: decoded._id
})

.then(async (user) => {
    
    if (user) {
    
	
	
  

        myfriendlist=user.MyFriends
        myfriendlist.push(req.body.friendThisUserId)
        user.MyFriends=myfriendlist
        const u=await user.save()



        //Create Notification in receiver's account
        const notificationData =new Notification ({
            content: user.email +" has added you as friend.",
            sentBy:user._id,
            sentTo:req.body.friendThisUserId,
            notificationType:"1"
        })
        
            await notificationData.save()
            


        
    return res.json({status:"success"})
    } else {
      return res.json({status:"fail"})
    }
})
.catch(err => {
  return res.json({status:"fail"})
})
})

users.post('/removeFriend',checkAuth, (req, res) => {
    
    decoded=req.decoded
    User.findOne({
    _id: decoded._id
    })
    
    .then(async (user) => {
        if (user) {
           

            var myfriendlist=user.MyFriends
            index=myfriendlist.indexOf(req.body.friendThisUserId)
            
            if(index>-1){
              
              myfriendlist.splice(index,1)
            }
            
            user.MyFriends=myfriendlist
            user.save()

            
        return res.json({status:"success"})
        } else {
          return res.json({status:"fail"})
        }
    })
    .catch(err => {
      return res.json({status:"fail"})
    })
    })

users.post('/like',checkAuth,async (req,res,next)=>{
  
  decoded=req.decoded
    try{
    const user=await User.findOne({
    _id: decoded._id
    })
    
    
    
    const post=await Post.findOne({_id:req.body.postId})
    
    .populate(
      [
        { path:'Likes' },
        { path:'createdBy'},
        {
          path:'Comments',
          populate:{
            path:'createdBy',
            select:'_id first_name profile_pic'
            // populate:'profile_pic'
          }
        }
      ]
    )
    .exec()
    
    

    

    listOfLikes=post.Likes
    

    let alreadyLiked=0;
    let likedId=''
    let likeIndex=-1
    let req_like=null


    for(var i=0;i<listOfLikes.length;i++){
      
      if(listOfLikes[i].createdBy.toString() == user._id.toString()){
        alreadyLiked=1;
        likedId=listOfLikes[i]._id
        likeIndex=i
        req_like=listOfLikes[i]
        break;
      }
    }
    


    if(alreadyLiked===1){
      
      
      
      const i=likeIndex
      if(i>-1){
        listOfLikes.splice(i,1)
      }
      

      let li=listOfLikes.map(a=>a._id)
      
   
      post.Likes=li
      
      let p=await post.save()

      const resultOfNotifDelete=await Notification.deleteOne({
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:2,//like->2
        postId:post._id
      })
      
      return res.json({status:'success',post:p})
    }
    else{
      
      const like=new Like({
        createdBy:user._id
      })
      const l=await like.save()
      await post.Likes.push(l._id)
      let p=await post.save()

      //create Notification
      const notificationData =new Notification ({
        content: decoded.email +" liked your post with caption ' "+post.caption+" '",
        sentBy:decoded._id,
        sentTo:post.createdBy,
        notificationType:2,
        postId:post._id
      })
      
        await notificationData.save()

      
        return res.json({status:'success',post:p})
    }



    
    }
    catch(err){
      return res.json({status:'fail',Data:err})
    }
})

users.post('/deleteNotif',checkAuth,async(req,res,next)=>{
  const resultOfNotifDelete=await Notification.deleteOne({
    _id:req.body.notifId,
  })
  
  return res.json({status:'success',Data:"No data"})
})

users.post('/changeProfilePic',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.json({status:'fail',Data:err})
      }
      
      
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          // return image details
          
        //   res.json(image)
            
        try{
           
            
            // user.profile_pic=image.url
            user.profile_pic.push(image.url)
            await user.save()
                

                return res.json({status:'success','profile_image_url':user.profile_pic[user.profile_pic.length-1],Data:user.profile_pic[user.profile_pic.length-1]})
            }
            catch(err){
                return res.json({status:'fail',Data:err})
            }


        }
      )
    })
  


        }catch(err){
          return res.json({status:'fail',Data:err})
        }
    }
    else{
      return res.json({status:'fail',Data:"No User"})
    }

    
})

users.post('/changeCoverPic',checkAuth,async (req, res) => {
  
  decoded=req.decoded
  const user=await User.findOne({
    _id: decoded._id
  })
  
  if(user){
      try{
    const upload = multer({ storage }).single('image')
    upload(req, res, function(err) {
      if (err) {
        return res.json({status:'fail',Data:err})
      }
      
      
  
      // SEND FILE TO CLOUDINARY
      const cloudinary = require('cloudinary').v2
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      })
      
      const path = req.file.path
      const uniqueFilename = req.file.filename+new Date().toISOString()
  
      cloudinary.uploader.upload(
        path,
        { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        async function(err, image) {
          if (err) return res.send(err)
          
          // remove file from server
          const fs = require('fs')
          fs.unlinkSync(path)
          
          
        
            
        try{
           
            
            
            user.cover_pic.push(image.url)
            await user.save()
                

                return res.json({status:'success','cover_image_url':user.cover_pic[user.cover_pic.length-1],Data:user.cover_pic[user.cover_pic.length-1]})
            }
            catch(err){
                return res.json({status:'fail',Data:err})
            }


        }
      )
    })
  


        }catch(err){
          return res.json({status:'fail',Data:err})
        }
    }
    else{
      return res.json({status:'fail',Data:"No User"})
    }

    
})

users.post('/updateProfile',checkAuth,async(req,res,next)=>{
  
  const user=await User.findById(req.decoded._id)
  user.first_name=req.body.first_name
  user.last_name=req.body.last_name
  user.bio=req.body.bio
  const u=await user.save()
  
  return res.json({status:'success',user:u,Data:u})
})


module.exports = users
