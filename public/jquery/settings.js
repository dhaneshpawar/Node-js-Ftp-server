$(document).ready(function()
{ 
    $("#floatLogo").fadeIn(1000);  

    $( "#backbutton" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });

    $( "#help-button" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });

     $( "#feedback-button" ).click(function() 
     {
         $(this).attr("disabled", "disabled");
      });

      $( "#termsbutton" ).click(function() 
      {
          $(this).attr("disabled", "disabled");
       });

       $( "#privacybutton" ).click(function() 
       {
           $(this).attr("disabled", "disabled");
        });
 
        $( "#signout" ).click(function() 
        {
            $(this).attr("disabled", "disabled");
         });
        
  
});
