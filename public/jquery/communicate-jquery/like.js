var socket;
if (screen.width <= 800)
{
    var socket = io({transports: ['websocket'], upgrade: false});
    //socket = io.connect('192.168.43.236:3000');
}
else
{
    var socket = io({transports: ['websocket'], upgrade: false});
   // socket = io.connect('http://localhost:3000');
}


var color = '';
function like(element) {
    //alert(element);
   
    var splitting = element.split('likes');
    var postid = splitting[0];
    //alert("only post id = "+postid);

    var x = $("#"+element).css('backgroundColor');
    var likes = $("#"+element).text();
    //alert(likes);

    hexc(x);
   
  //  alert("color = "+color);
   // alert("maincolor = "+maincolor);
    //alert("theme color = "+themecolor);
    if(color == maincolor)
    {
        var splitlike = likes.split(" ");
     //   alert("likes = "+splitlike[0])
        
        var parsintvar = parseInt(splitlike[0]);
    
       // alert(parsintvar)
    
        var incrementedlikes = parsintvar + 1;
        //alert(incrementedlikes);
    
      var savingnewlikes = incrementedlikes + " likes";
    
       $("#"+element).html(savingnewlikes);
      //  alert(color);

        //increment the like counter and set like == yes in my database.
        $("#"+element).css({'backgroundColor': themecolor});
        $("#"+element).css({'color': maincolor});
    
        $.ajax({
            type: "POST",
            url: "/like",
            data: { str : postid},
            success: function () 
            {
            },});

        /*    socket.emit('like',{
                likedpostid : element,
                likehello : "hello"
            });*/
    }
    else
    {
    var splitlike = likes.split(" ");
   // alert("likes = "+splitlike[0])
    
    var parsintvar = parseInt(splitlike[0]);

   // alert(parsintvar)

    var incrementedlikes = parsintvar - 1;
   // alert(incrementedlikes);

    var savingnewlikes = incrementedlikes + " likes";

    $("#"+element).html(savingnewlikes);
   // alert(color);

    //increment the like counter and set like == yes in my database.
    $("#"+element).css({'backgroundColor': maincolor});
    $("#"+element).css({'color': themecolor});

    $.ajax({
        type: "POST",
        url: "/dislike",
        data: { str : postid},
        success: function () 
        {
        },});



    }


}

function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
}

socket.on('friendrequest',function (data) {
 console.log(data)
 var nstart = "<div class='notification' id='"+data.nid+"friend'>"
 var nend = "</div>"
 
var n1 = "<center><br>"
var n2 = "<img src='"+data.profileimageurl+"' alt='profile image'>"
var n3 = "<p>NID: "+data.nid+", "+data.firstname+" "+data.lastname+" sent you friend request.</p>"
var n4 = "<button class='requestButton' id='"+data.nid+"friend' onclick='acceptfriend(this.id)'>Accept</button>"
var n5 = "<button class='requestButton' id='"+data.nid+"friend' onclick='rejectfriend(this.id)'>Reject</button><br><br></center>"

var ntotal = nstart + n1 + n2 + n3 + n4 + n5 + nend;    
$("#notificationcollection").append(ntotal);
$("#notificationcontainer").show(1000);               
})
