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
    $("#showingpostswait").hide()

    $( "#backbutton" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });
  

    //for friends pages
    $("#showfriend").click(function () 
    {
        $("#showingpostswait").show()
        $(this).attr("disabled", "disabled");
    
      var day =  $("#day").val() ;
      var month = $("#month").val() ;
      var year = $("#year").val() ;
      var friendid = $("#frienduserid").text();
      
      console.log("this is friend id = "+friendid);

      console.log(day + "  " + month + "  " + year)
    
            $.ajax({
                type: "POST",
                url: "/datebyidfriend",
                data: { str : day, str2: month, str3:year, str4:friendid},
                success: function (posts) 
                {
                    $("#showingpostswait").hide(1000);
                    $("#showfriend").removeAttr("disabled");
    
                  console.log(posts);
                  
                  if(posts == "")
                  {
                    $("#addedPosts").remove();
                
                    $("#byDefaultPosts").remove();
                    $("#noposts").remove();
                  
                    var noposts = "<div id='noposts' class='date-div'><center><p>No posts. Don't put 0 behind 1 to 9 numbers.</p></center></div>"
                    $("#all-posts").append(noposts);
                 }
                  else
                  {
                    $("#addedPosts").remove();
                    $("#all-posts").append("<div id='addedPosts'></div>");
                   
                    $("#noposts").remove();
                  
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

       $(".removepost").hide();  
                 $(".detailshide").hide();  
                  }
                },});
    });


    //for user's own profile
    $("#show").click(function () 
    {
  
        $("#showingpostswait").show()
        $(this).attr("disabled", "disabled");
  
        var day =  $("#day").val() ;
      var month = $("#month").val() ;
      var year = $("#year").val() ;
  
      console.log(day + "  " + month + "  " + year)
    
            $.ajax({
                type: "POST",
                url: "/datebyid",
                data: { str : day, str2: month, str3:year },
                success: function (posts) 
                {
                  console.log(posts);
                  $("#showingpostswait").hide(1000);
                  $("#show").removeAttr("disabled");
                
                  if(posts == "")
                  {
                    $("#addedPosts").remove();
                
                    $("#byDefaultPosts").remove();
                    $("#noposts").remove();
                  
                    var noposts = "<div id='noposts' class='date-div'><center><p>No posts. Don't put 0 behind 1 to 9 numbers.</p></center></div>"
                    $("#all-posts").append(noposts);
                 }
                  else
                  {
                    $("#addedPosts").remove();
         
                    $("#all-posts").append("<div id='addedPosts'></div>");
         
                    $("#noposts").remove();
                  
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

       $(".removepost").hide();  
                 $(".detailshide").hide();  
                  }
                },});
    });
   
    
    $("#setProfile").click(function ()
    {
   
        $.ajax({
            type: "POST",
            url: "/setprofile",
            success: function (data)
            {
                if (data == "success")
                {
                    location.reload();
                }
                else{
                    console.log("Something went wrong !");
                }
            }});
    })

    //showing posts on day
    $("#setColor").click(function ()
    {
        var color =  $("#color").val();
        console.log(color);

        $.ajax({
            type: "POST",
            url: "/setcolor",
            data: { str : color},
            success: function (posts)
            {

            }});
    })

    //showing posts on day
    $("#setkey").click(function ()
    {
        var key =  $("#key").val();
        console.log(key);
 
        $("#keyQuestion").hide(1000);  
 
        keyQuestion
        $.ajax({
            type: "POST",
            url: "/setkey",
            data: { str : key},
            success: function ()
            {
               $("#key").val(key); 
            }});
    })

    //showing posts on day
    $("#setmobile").click(function ()
    {
        var mobile =  $("#mobile").val();
        console.log(mobile);

  

if (/^\d{10}$/.test(mobile)) {
    $("#mobileQuestion").hide(1000);  
 
    $.ajax({
        type: "POST",
        url: "/setmobile",
        data: { str : mobile},
        success: function ()
        {
            $("#mobile").val(mobile); 
   
        }});

} else {
    alert("Invalid number; must be ten digits")
    $("#mobile").focus()
}

    })    

})
 

