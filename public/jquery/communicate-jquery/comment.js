function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

$(document).ready(function()
{
  // making the comment
  $("#makeComment").click(function () 
  {
    var commentpara =  $("#commentpara").val();

    console.log(commentpara)
    $("#commentpara").val('');  
  
          $.ajax({
              type: "POST",
              url: "/commment",
              data: { str : commentpara},
              success: function (posts) 
              {
 
                $("#comment-div").hide(1000);  
                $('html, body').animate(
                  {
                      scrollTop: $("#headnamepost").offset().top
                  },
                   1000);

                   var pt1 = "<div class='removepost' id='"+posts.postid+"removediv'><br><p>Remove this ?</p><button id='"+posts.postid+"remove' onclick='yesremove(this.id)'>Yes</button><button id='"+posts.postid+"remove' onclick='noremove(this.id)'>No</button><br><br></div><div class='post' id='"+posts.postid+"'>"
                   var pt11 = "<div class='insideOptionsMenu2' id='"+posts.postid+"delete' onclick='deletepost(this.id)'><div class='arrowLine2 up2'></div><div class='arrowLine2 down2'></div></div>"
                   var pt2 = "<img class='profile' src='"+posts.profileimageurl+"' alt='profile image'>"
                   var pt3 = "<a href='friendprofile?id="+posts.nid+"'><p class='names'>"+posts.firstname.charAt(0).toUpperCase()+posts.firstname.slice(1)+" "+posts.lastname.charAt(0).toUpperCase()+posts.lastname.slice(1)+"</p></a>"

                   var pt4 = "<br><div class='up-blue-line'></div>"
                    
                   var pt5 = "<p class='comment'>"+posts.comment+"</p><div class='blue-line'></div>"
                   var pt6 = "<div id='"+posts.postid+"showdetails' onclick='showdetails(this.id)' class='details'><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div></div>"

                   var  pt7 = "<button id='"+posts.postid+"likes' style='background-color:"+maincolor+";color:"+themecolor+";'  class='like-button' onclick='like(this.id)'>"+posts.likes+" likes</button>"    
                        var pt8 = "<div class='detailshide' id='"+posts.postid+"details'>"
                   var pt9 = "<p class='comment'>Posted on "+posts.hours+":"+posts.minutes+" PM</p>"
              
                   var postscomb = pt1+pt11+pt2+pt3+pt4+pt5+pt6+pt7+pt8+pt9;
                   $("#all-posts").prepend(postscomb);
                   $(".detailshide").hide();  
                   $("#"+posts.postid+"removediv").hide();
                                               
     
                // here append the post at top
               //   $("#all-posts").prepend("<div id='addedPosts'><p>"+commentpara+"</p></div>");
              },});
  });
 
  });
  
  socket.on('newcomment',function (posts) {
    var pt1 = "<div class='removepost' id='"+posts.postid+"removediv'><br><p>Remove this ?</p><button id='"+posts.postid+"remove' onclick='yesremove(this.id)'>Yes</button><button id='"+posts.postid+"remove' onclick='noremove(this.id)'>No</button><br><br></div><div class='post' id='"+posts.postid+"'>"
    var pt11 = "<div class='insideOptionsMenu2' id='"+posts.postid+"delete' onclick='deletepost(this.id)'><div class='arrowLine2 up2'></div><div class='arrowLine2 down2'></div></div>"
    var pt2 = "<img class='profile' src='"+posts.profileimageurl+"' alt='profile image'>"
    var pt3 = "<a href='friendprofile?id="+posts.nid+"'><p class='names'>"+posts.firstname.charAt(0).toUpperCase()+posts.firstname.slice(1)+" "+posts.lastname.charAt(0).toUpperCase()+posts.lastname.slice(1)+"</p></a>"

    var pt4 = "<br><div class='up-blue-line'></div>"
     
    var pt5 = "<p class='comment'>"+posts.comment+"</p><div class='blue-line'></div>"
    var pt6 = "<div id='"+posts.postid+"showdetails' onclick='showdetails(this.id)' class='details'><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div><div style='background-color:"+themecolor+";'></div></div>"

    var  pt7 = "<button id='"+posts.postid+"likes' style='background-color:"+maincolor+";color:"+themecolor+";'  class='like-button' onclick='like(this.id)'>"+posts.likes+" likes</button>"    
    var pt8 = "<div class='detailshide' id='"+posts.postid+"details'>"
    var pt9 = "<p class='comment'>Posted on "+posts.hours+":"+posts.minutes+" PM</p>"

  
    var postscomb = pt1+pt11+pt2+pt3+pt4+pt5+pt6+pt7+pt8+pt9;
    $("#all-posts").prepend(postscomb);
    $(".detailshide").hide();  
    $("#"+posts.postid+"removediv").hide();
    $("#newactivity").show(1000);   
  })   
