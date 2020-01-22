$(document).ready(function()
{ 
    $("#floatLogo").fadeIn(1000);  
    $("#DivFullScreen").hide();
    $("#DivPwa").hide();   
    
    var pwashowotnot = localStorage.getItem("pwa");
    
    if(pwashowotnot == "showed")
   {
       console.log("user already seen full screen and pwa notification")
   }
   else 
   {
       //for computer full screen
       if( screen.width >= 800 ) 
       { 
            $("#DivFullScreen").fadeIn(1000);
        }
  
        //To close full screen div 
        $("#okFullScreen").click(function()
        {
            $("#DivFullScreen").hide(1000);
            localStorage.setItem("pwa","showed");  
        });

        //for mobile pwa
        if( screen.width <= 800 ) 
        { 
               $("#DivPwa").fadeIn(1000);   
        }

         //To close pwa div 
      $("#okPwa").click(function()
      {
      $("#DivPwa").hide(1000);
      localStorage.setItem("pwa","showed");  
      });
    }

    
     

    $( "#openmindmatch" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });

     $( "#opencommunicate" ).click(function() 
     {
         $(this).attr("disabled", "disabled");
      });

      $( "#opencrackmi" ).click(function() 
      {
          $(this).attr("disabled", "disabled");
       });

       $( "#settings" ).click(function() 
       {
           $(this).attr("disabled", "disabled");
        });
 
       
  
});
