
function removenotification(element) {
    alert(element);
    $("#"+element).remove();
    $("#"+element+"friend").remove();

    $.ajax({
        type: "POST",
        url: "/removenotification",
        data: { str : element },
        success: function (data) 
        {
          console.log(data);
        }})

    //=======39845029348028-3062-309862-304852*******
    //write ajax query to delete that notification from database also.
}

function acceptfriend(element) {
    var splitty = element.split('friend');
    console.log(splitty[0]);
    $("#"+element).remove();
    $("#notificationcontainer").hide(1000);

    $.ajax({
        type: "POST",
        url: "/acceptfriend",
        data: { str : splitty[0] },
        success: function (data) 
        {
          console.log(data);
        }})

} 

function rejectfriend(element) {
    var splitty = element.split('friend');
    console.log(splitty[0]);
    $("#"+element).remove();
    $("#notificationcontainer").hide(1000);
    
    $.ajax({
        type: "POST",
        url: "/rejectfriend",
        data: { str : splitty[0] },
        success: function (data) 
        {
          console.log(data);
        }})
} 

$(document).ready(function()
{
   var seen = 0; 
    $("#noNotification").hide();
    $("#notificationcontainer").hide();
    
/*$("#showNotification").click(function () 
{
    if(seen == 0)
    {*/
        $.ajax({
            type: "GET",
            url: "/notification",
            success: function (data) 
            {
              console.log(data);
               
              if(data == "")
              {    
                  $("#noNotification").hide(1000);
              }
        
              for(var i=0;i< data.length;i++)
              {
                $("#noNotification").hide();
           
                if(data[i].notificationid == 1)
                {
                    var nstart = "<div id='"+data[i].likedpostid+"notification' class='notification'>"
                    var nend = "</div>"
            
                var n2 = "<a href='#"+data[i].likedpostid+"'><center><p id='"+data[i].likedpostid+"notification' onclick='removenotification(this.id)'>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" liked your post.</p></center></a>"
           
                var ntotal = nstart + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }
                
                if(data[i].notificationid == 2)
                {
                    var nstart = "<div id='"+data[i].likedpostid+"notification' class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<a href='#"+data[i].likedpostid+"'><center><p id='"+data[i].likedpostid+"notification' onclick='removenotification(this.id)'>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" liked your comment.</p></center></a>"
           
           
                var ntotal = nstart  + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }
        
                if(data[i].notificationid == 3)
                {
                    $("#notificationcontainer").show();
                    var nstart = "<div class='notification' id='"+data[i].nid+"friend'>"
                    var nend = "</div>"
                    
                var n1 = "<center><br>"
                var n2 = "<img src='"+data[i].profileimageurl+"' alt='profile image'>"
                var n3 = "<p>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" sent you friend request.</p><br>"
                var n4 = "<button class='requestButton' id='"+data[i].nid+"friend' onclick='acceptfriend(this.id)'>Accept</button>"
                var n5 = "<button class='requestButton' id='"+data[i].nid+"friend' onclick='rejectfriend(this.id)'>Reject</button><br><br></center>"
        
                var ntotal = nstart + n1 + n2 + n3 + n4 + n5 + nend;    
                $("#notificationcollection").append(ntotal);
                }
        
                if(data[i].notificationid == 4)
                {
                    var nstart = "<div class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<center><p>New activity on your dateline.</p></center>"
                    
                var ntotal = nstart + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }

                if(data[i].notificationid == 5)
                {
                    $("#notificationcontainer").show();
                    var nstart = "<div class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<div id='"+data[i].nid+"friend'><center><p>NID : "+" "+data[i].nid+" "+data[i].firstname+" "+data[i].lastname+" accepted your friend request. You are friends now.</p>"
                var n3 = "<button class='requestButton' id='"+data[i].nid+"' onclick='removenotification(this.id)'>Ok</button></center><br></div>"
                    
                var ntotal = nstart + n2 + n3 + nend;    
                $("#notificationcollection").append(ntotal);
                }
              }
        seen ++;
            },});
  /*  }
else{
    console.log("showed once !")
}

});*/

$("#showNotificationSocket").click(function () 
{
    if(seen == 0)
    {
        $.ajax({
            type: "GET",
            url: "/notification",
            success: function (data) 
            {
              console.log(data);
               
              if(data == "")
              {    
                  $("#noNotification").show(1000);
              }
        
              for(var i=0;i< data.length;i++)
              {
                $("#noNotification").hide();
           
                if(data[i].notificationid == 1)
                {
                    var nstart = "<div id='"+data[i].likedpostid+"notification' class='notification'>"
                    var nend = "</div>"
            
                var n2 = "<a href='#"+data[i].likedpostid+"'><center><p id='"+data[i].likedpostid+"notification' onclick='removenotification(this.id)'>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" liked your post.</p></center></a>"
           
                var ntotal = nstart + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }
                
                if(data[i].notificationid == 2)
                {
                    var nstart = "<div id='"+data[i].likedpostid+"notification' class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<a href='#"+data[i].likedpostid+"'><center><p id='"+data[i].likedpostid+"notification' onclick='removenotification(this.id)'>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" liked your comment.</p></center></a>"
           
           
                var ntotal = nstart  + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }
        
                if(data[i].notificationid == 3)
                {
                    var nstart = "<div class='notification' id='"+data[i].nid+"friend'>"
                    var nend = "</div>"
                    
                var n1 = "<center><br>"
                var n2 = "<img src='"+data[i].profileimageurl+"' alt='profile image'>"
                var n3 = "<p>NID: "+data[i].nid+", "+data[i].firstname+" "+data[i].lastname+" sent you friend request.</p>"
                var n4 = "<button class='requestButton' id='"+data[i].nid+"friend' onclick='acceptfriend(this.id)'>Accept</button>"
                var n5 = "<button class='requestButton' id='"+data[i].nid+"friend' onclick='rejectfriend(this.id)'>Reject</button><br><br></center>"
        
                var ntotal = nstart + n1 + n2 + n3 + n4 + n5 + nend;    
                $("#notificationcollection").append(ntotal);
                }
        
                if(data[i].notificationid == 4)
                {
                    var nstart = "<div class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<center><p>New activity on your dateline.</p></center>"
                    
                var ntotal = nstart + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }

                if(data[i].notificationid == 5)
                {
                    var nstart = "<div class='notification'>"
                    var nend = "</div>"
               
                var n2 = "<center><p>"+" "+data[i].nid+" "+data[i].firstname+" "+data[i].lastname+" accpted your friend request. You are friends now.</p></center>"
                    
                var ntotal = nstart + n2 + nend;    
                $("#notificationcollection").append(ntotal);
                }
                
        
                
        
        
              }
        seen ++;
            },});
    }
else{
    console.log("showed once !")
}

});
})