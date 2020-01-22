var color = '';
function showdetails(element) {

    var splitting = element.split('showdetails')
    console.log(splitting);

    var postid = splitting[0];
    console.log(postid);

    var detailsdiv = postid + "details";
  

    var x = $("#"+element+" div").css('backgroundColor');
    hexc(x);
    console.log("color is = "+color);

  
  if(color == maincolor)
  {
    $("#"+element+" div").css({'background': themecolor});
    $("#"+detailsdiv).hide(1000);  

  }
  else
  {
    $("#"+detailsdiv).show(1000);   

    $("#"+element+" div").css({'background': maincolor});
    

    $.ajax({
        type: "POST",
        url: "/showdetails",
        data: {str : postid},
        success: function(details) 
        {
            console.log(details);

            if(details == '')
            {

            }
            else
            {
                $("#addeddetails"+postid).remove();
                $("#"+postid+"details").append("<div class='addeddetails' id='addeddetails"+postid+"'><p class='comment'>Liked by ...</p></div></div></div>");
             
                for(var i=0; i< details.length ; i++)
                {
                    var gotdetails = "<img class='likerProfile' src='"+details[i].profileimageurl+"' alt='profile image'><p class='liker'>"+details[i].firstname+" "+details[i].lastname+"</p>"
                    $("#addeddetails"+postid).append(gotdetails);
                }
            }
            
      
        },});  } 
 
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
