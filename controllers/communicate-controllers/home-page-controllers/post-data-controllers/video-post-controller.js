//express
var express = require('express');

//bodyParser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//MongoDB 
var mongoose = require('mongoose');

//requiring users databse controller
var userModel = require('../../../database-controllers/users-database-controller');
var sessionModel = require('../../../database-controllers/session-database-controller');

var friendsSchema = require('../../communicate-database-contollers/friends-schema-contoller');
var postsSchema = require('../../communicate-database-contollers/posts-schema-contoller');
var notificationSchema = require('../../communicate-database-contollers/notification-schema-controller'); 

//variables necessary for post id , declaring them globally , so we can use them in multer funtion post request both.
var dateAndTime
var splittingDateAndTime
var finaldate 
var finaltime
var splittingTime
var hours
var minutes     
var seconds 
var postid 
  
//requiring multer
var multer  = require('multer');
var profileImageExtension;

//multer configuration
var storage = multer.diskStorage(
{
  destination:'./public/uploads/communicate/post',
  filename: function (req, file, cb) {

    sessionModel.find({sessionid: req.session.id},function (err,data) {
        usernid = data[0].nid;
        usergmail = data[0].gmail;

    dateAndTime = new Date(Date.now()).toLocaleString();
    console.log(dateAndTime);
    
    splittingDateAndTime = dateAndTime.split(' ');
    finaldate = splittingDateAndTime[0];
    finaltime = splittingDateAndTime[1];

    console.log(finaldate);
    console.log(finaltime);

    splittingTime = finaltime.split(':');
    hours = splittingTime[0];
    minutes = splittingTime[1];
    seconds = splittingTime[2];  

    console.log(hours);
    console.log(minutes)
    console.log(seconds);

    postid = usernid + "-" + finaldate + "-" + hours + "-" + minutes + "-" + seconds;
    console.log(postid);

    // file.mimetype will return the type file , for example => image/jpeg or video.mp4 or image/png
    var fileType = file.mimetype;
    // we are spliting the entension from that and paste in that partOfExtension varible using split function 
    var partOfExtension = fileType.split('/');
    var start = partOfExtension[0];
    //now this will contain its extension and we can pass it in the filname
     profileImageExtension = partOfExtension[1];

    cb(null, postid  + "." + profileImageExtension);
   })//session ended
 }   
});

// upload initialization of multer
var upload = multer({ storage: storage }).single('postvideo');


//redering webpages
module.exports = function (app,io) 
{
    
    app.post('/postvideocommunicate', urlencodedParser , function(req,res)
    {
        console.log("a request from profile image");
        upload(req,res,(err)=>
        {
            sessionModel.find({sessionid: req.session.id},function (err,data) {
                usernid = data[0].nid;
                usergmail = data[0].gmail;
        
            if(profileImageExtension == undefined)
            {
                console.log("somebody hacked , no image selected ... ");
            }
            else
            {
            
                //inserting the user uploaded file and name and lastname into the databse 
                var postvideourl = 'uploads/communicate/post/' + postid + "." + profileImageExtension;
                var postcomment = req.body.videocomment;

                var postsmodelnamepass = usernid + "postcomments";
                //collection of posts
                var postsModel = mongoose.model( postsmodelnamepass , postsSchema);
        
            //finding profile and names
            var profileimageurl;
            var firstname;
            var lastname;

            userModel.find({nid: usernid},function (err,data) {
                if (err) throw err;
                profileimageurl = data[0].profileimageurl;
                firstname = data[0].firstname;
                lastname = data[0].lastname;


                var myvideopost = {        
                    postid: postid,
                    nid: usernid,
        
                    profileimageurl: profileimageurl,
                    firstname: firstname,
                    lastname: lastname,
                    likes: 0,
        
                    date : finaldate,
                    hours : hours,
                    minutes: minutes,
                    seconds: seconds,
        
                    comment: postcomment,
                    postvideourl: postvideourl,
                    liked: 0}

                               //inserting into users database

                               var insertUser = postsModel({
                                postid: postid,
                                nid: usernid,
                    
                                profileimageurl: profileimageurl,
                                firstname: firstname,
                                lastname: lastname,
                                likes: 0,
                    
                                date : finaldate,
                                hours : hours,
                                minutes: minutes,
                                seconds: seconds,
                    
                                comment: postcomment,
                                postvideourl: postvideourl,
                                liked: 0}).save(function (error)
                    {
                      if (error) throw error;
                      console.log("new user comment saved in users database");
                    
                      var dateAndTime = new Date(Date.now()).toLocaleString();
                      console.log(dateAndTime);
                      var splittingDateAndTime = dateAndTime.split(' ');
                      finaldate = splittingDateAndTime[0];
                  
                      console.log(finaldate);
                      res.render('communicate-views/success',{finaldate : finaldate})

                      //now inserting it into the posts collection of frinds of user.

                      //first find all frinds
                      var friendscollection = usernid + "friends";
                      var friendsModel = mongoose.model( friendscollection , friendsSchema);
    
                      friendsModel.find({},function (err,data) {
                        if (err) throw err;
                        console.log("all friends");
                        console.log(data);

                        for(var i=0; i<data.length; i++)
                        {

                            sessionModel.find({nid: data[i].nid},function (err,data) 
                            {
                              if(data == '')
                              {
                                console.log("user is offline");
                              }
                              else
                              {
                                if(data[0].nid == usernid)
                                {
                                  console.log("this is the user who liked the post");
                                }
                                else
                                {
                                 console.log("-------- this is data received ----------")
                                 console.log(data[0].socket);
                                 console.log("------- emitted the event -------")
                                  //sending data to browser
                                  io.to(data[0].socket).emit('newvideopost',myvideopost);         
                                }
                              }
                            });
               

                            var postsmodelnamepass = data[i].nid + "postcomments";
                            //collection of posts
                            var postsModel = mongoose.model( postsmodelnamepass , postsSchema);

                            var insertUser = postsModel({
                                postid: postid,
                                nid: usernid,
                    
                                profileimageurl: profileimageurl,
                                firstname: firstname,
                                lastname: lastname,
                                likes: 0,
                    
                                date : finaldate,
                                hours : hours,
                                minutes: minutes,
                                seconds: seconds,
                    
                                comment: postcomment,
                                postvideourl: postvideourl,
                                liked: 0}).save(function (error)
                    {
                      if (error) throw error;
                      console.log("new user comment saved in friend database");
                    });                      

                        }


/*commenting the notification code...                    //inserting into their notification databse.
                    for(var i=0; i<data.length; i++)
                    {

                        var notificationcollection = data[i].nid + "notifications";
                        //collection of posts
                        var notificationModel = mongoose.model( notificationcollection , notificationSchema);
                     
                        notificationModel.find({notifiactionid: 4},function (err,data) {
                            if (err) throw err;
                            if (data == '')
                            {
                                var insertNotification = notificationModel(
                                    {
                                        notificationid : 4, 
                                    }).save(function (error)
                        {
                          if (error) throw error;
                          console.log("new notification saved in friend database");
                        });                      
        

                            }
                            else
                            {
                                console.log("new activity notification is already in database...");
                            }
                        })
             
                    }//end of for loop
*/
                    })
                    });
            })                


        
       
     
            }

        })//session ended

        });//upload closed
    })
}