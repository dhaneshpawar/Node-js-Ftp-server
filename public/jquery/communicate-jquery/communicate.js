$(document).ready(function()
{

  $("#date-div").hide();  
  $("#comment-div").hide();  
  $("#post-div").hide();  
  $("#newactivity").hide();  
  $("#refreshlikes").hide();  
    
//disabling buttons
  $( "#backbutton" ).click(function() 
  {
      $(this).attr("disabled", "disabled");
   });

   $( "#postlink" ).click(function() 
  {
      $(this).attr("disabled", "disabled");
   });

   $( "#friendslink" ).click(function() 
   {
       $(this).attr("disabled", "disabled");
    });
   
    $( "#profilelink" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });
    

  $("#newactivity").click(function()
  {
    $("#newactivity").hide(1000);  
  $('html, body').animate(
      {
          scrollTop: $(".navigation-bar").offset().top
      },
       1000);
  })
  



  $("#showDateDiv").click(function()
  {
    $("#date-div").show(1000);  
  })

  $("#showCommentDiv").click(function()
  {
    $("#comment-div").show(1000);  
  })

  $("#showPostDiv").click(function()
  {
    $("#post-div").show(1000);  
  })

  $("#cancelDate").click(function()
  {
    $("#date-div").hide(1000);  
  })
  
  $("#cancelComment").click(function()
  {
    $("#comment-div").hide(1000);  
  })

  $("#cancelImage").click(function()
  {
    $("#post-div").hide(1000);  
  })


  $("#cancelVideo").click(function()
  {
    $("#post-div").hide(1000);  
  })


});
  
  