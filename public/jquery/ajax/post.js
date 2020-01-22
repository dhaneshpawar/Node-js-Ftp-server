$(document).ready(function()
{


  $("#post-image-button").click(function()
  {
    $("#post-div").hide(1000);  
    $('html, body').animate(
      {
          scrollTop: $("#headnamepost").offset().top
      },
       1000);
       
  })


  $("#post-video-button").click(function()
  {
    $("#post-div").hide(1000);  
    $('html, body').animate(
      {
          scrollTop: $("#headnamepost").offset().top
      },
       1000);
  })


})
 