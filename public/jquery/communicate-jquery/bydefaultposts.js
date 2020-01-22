if(localStorage)
{
  var element = localStorage.getItem("color");

  var themecolor;
  var maincolor;
  
  if(element == "nestimatic")
   {
       themecolor = "#8080ff";
       maincolor = "#ffffff";
   }
  
  else if(element == "White")
   {
    themecolor = "#ffffff";
    maincolor = "#8080ff";
  }
  
  else
   {
    themecolor = element;
    maincolor = "#ffffff";
   }            
}
else
{
  themecolor = "#8080ff";
  maincolor = "#ffffff";
}

$(document).ready(function()
  {
          $.ajax({
              type: "GET",
              url: "/bydefaultposts",
              success: function (posts) 
              {
                console.log(posts);
              
                if(posts == "")
                {
                  $("#refreshlikes").show(500);  
                  $("#refreshlikes").hide(8000);  
             
                  $("#addedPosts").remove();
                  $("#noposts").remove();

                var welcomediv = "<div id='welcomediv' class='all-posts'><div class='post'><center><p>This is it</p></center></div></div>"
                $("#all-posts").append(welcomediv);
               }
                else
                {
                  $("#refreshlikes").show(1000);  
                  $("#refreshlikespara").show(1000);  
                  $("#refreshlikes").hide(2000);  
                
                  $("#addedPosts").remove();
                 
                  $("#noposts").remove();
                  $("#all-posts").append("<div id='addedPosts'></div>");
                
                  for (var i = 0; i < posts.length ; i++)
                  {
                    var pt1 = "<div class='removepost' id='"+posts[i].postid+"removediv'><br><p>Remove this ?</p><button id='"+posts[i].postid+"remove' onclick='yesremove(this.id)'>Yes</button><button id='"+posts[i].postid+"remove' onclick='noremove(this.id)'>No</button><br><br></div><div class='post' id='"+posts[i].postid+"'>"
                    var pt11 = "<div class='insideOptionsMenu2' id='"+posts[i].postid+"delete' onclick='deletepost(this.id)'><div class='arrowLine2 up2'></div><div class='arrowLine2 down2'></div></div>"
                    var pt2 = "<img class='profile' src='"+posts[i].profileimageurl+"' alt='profile image'>"
                    var pt3 = "<a href='friendprofile?id="+posts[i].nid+"'><p class='names'>"+posts[i].firstname.charAt(0).toUpperCase()+posts[i].firstname.slice(1)+" "+posts[i].lastname.charAt(0).toUpperCase()+posts[i].lastname.slice(1)+"</p></a>"
                 
                    var pt4; 
                    
                    if(posts[i].postimageurl != undefined)
                    {
                      pt4 = "<img class='postimg' src='"+posts[i].postimageurl+"' alt='post-image'>"
                    }
                    else if(posts[i].postvideourl != undefined)
                    {
                      pt4 = "<video class='postvideo' src='"+posts[i].postvideourl+"' autoplay muted loop controls></video>"
                    }
                    else
                    {
                      pt4 = "<br><div class='up-blue-line'></div>"
                    }


                     
                    var pt5 = "<p class='comment'>"+posts[i].comment+"</p><div class='blue-line'></div>"
                    var pt6 = "<div id='"+posts[i].postid+"showdetails' onclick='showdetails(this.id)' class='details'><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div></div>"
  
                    var pt7;
                    if(posts[i].liked == 1)
                    {
                      pt7 = "<button id='"+posts[i].postid+"likes' style='background-color:"+themecolor+";color:"+maincolor+";' class='like-button' onclick='like(this.id)'>"+posts[i].likes+" likes</button>"
                    }
                    else
                    {
                      pt7 = "<button id='"+posts[i].postid+"likes' style='background-color:"+maincolor+";color:"+themecolor+";'  class='like-button' onclick='like(this.id)'>"+posts[i].likes+" likes</button>"    
                    }
                    
                    var pt8 = "<div class='detailshide' id='"+posts[i].postid+"details'>"
                    var pt9 = "<p class='comment'>Posted on "+posts[i].hours+":"+posts[i].minutes+" PM</p>"
               
                    var postscomb = pt1+pt11+pt2+pt3+pt4+pt5+pt6+pt7+pt8+pt9;
                    $("#addedPosts").append(postscomb);
                  }

               $(".detailshide").hide();  
               $(".removepost").hide();  
               
                }
            },});
  
  });
  
  
  //prepending new posts 
  socket.on('newpost',function (posts) {

    var pt1 = "<div class='removepost' id='"+posts.postid+"removediv'><br><p>Remove this post/comment ?</p><button id='"+posts.postid+"remove' onclick='yesremove(this.id)'>Yes</button><button id='"+posts.postid+"remove' onclick='noremove(this.id)'>No</button><br><br></div><div class='post'>"
    var pt11 = "<div class='insideOptionsMenu2' id='"+posts.postid+"delete' onclick='deletepost(this.id)'><div class='arrowLine2 up2'></div><div class='arrowLine2 down2'></div></div>"
    var pt2 = "<img class='profile' src='"+posts.profileimageurl+"' alt='profile image'>"
    var pt3 = "<a href='friendprofile?id="+posts.nid+"'><p class='names'>"+posts.firstname.charAt(0).toUpperCase()+posts.firstname.slice(1)+" "+posts.lastname.charAt(0).toUpperCase()+posts.lastname.slice(1)+"</p></a>"

    var pt4 = "<img class='postimg' src='"+posts.postimageurl+"' alt='post-image'>"

    var pt5 = "<p class='comment'>"+posts.comment+"</p><div class='blue-line'></div>"
    var pt6 = "<div id='"+posts.postid+"showdetails' onclick='showdetails(this.id)' class='details'><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div></div>"

    var  pt7 = "<button id='"+posts.postid+"likes' style='background-color:"+maincolor+";color:"+themecolor+";'  class='like-button' onclick='like(this.id)'>"+posts[i].likes+" likes</button>"    
  
    var pt8 = "<div class='detailshide' id='"+posts.postid+"details'>"
    var pt9 = "<p class='comment'>Posted on "+posts.hours+":"+posts.minutes+" PM</p>"


    var postscomb = pt1+pt11+pt2+pt3+pt4+pt5+pt6+pt7+pt8+pt9;
    $("#all-posts").prepend(postscomb);
    $(".detailshide").hide();  
    $("#newactivity").show(1000);   
    $(".removepost").hide();  
           
  })
  
  socket.on('newvideopost',function (posts) {

    var pt1 = "<div class='removepost' id='"+posts.postid+"removediv'><br><p>Remove this post/comment ?</p><button id='"+posts.postid+"remove' onclick='yesremove(this.id)'>Yes</button><button id='"+posts.postid+"remove' onclick='noremove(this.id)'>No</button><br><br></div><div class='post'>"
    var pt11 = "<div class='insideOptionsMenu2' id='"+posts.postid+"delete' onclick='deletepost(this.id)'><div class='arrowLine2 up2'></div><div class='arrowLine2 down2'></div></div>"
    var pt2 = "<img class='profile' src='"+posts.profileimageurl+"' alt='profile image'>"
    var pt3 = "<a href='friendprofile?id="+posts.nid+"'><p class='names'>"+posts.firstname.charAt(0).toUpperCase()+posts.firstname.slice(1)+" "+posts.lastname.charAt(0).toUpperCase()+posts.lastname.slice(1)+"</p></a>"

    var pt4 = "<video class='postvideo' src='"+posts.postvideourl+"' autoplay muted loop controls></video>"

    var pt5 = "<p class='comment'>"+posts.comment+"</p><div class='blue-line'></div>"
    var pt6 = "<div id='"+posts.postid+"showdetails' onclick='showdetails(this.id)' class='details'><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div></div>"

    var  pt7 = "<button id='"+posts.postid+"likes' style='background-color:"+maincolor+";color:"+themecolor+";'  class='like-button' onclick='like(this.id)'>"+posts[i].likes+" likes</button>"    
    var pt8 = "<div class='detailshide' id='"+posts.postid+"details'>"
    var pt9 = "<p class='comment'>Posted on "+posts.hours+":"+posts.minutes+" PM</p>"


    var postscomb = pt1+pt11+pt2+pt3+pt4+pt5+pt6+pt7+pt8+pt9;
    $("#all-posts").prepend(postscomb);
    $(".detailshide").hide();  
    $("#newactivity").show(1000);   
    $(".removepost").hide();             
  })
  
