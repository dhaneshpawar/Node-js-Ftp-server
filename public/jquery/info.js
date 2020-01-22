$(document).ready(function()
{
    $("#preparing").hide();   
    //To open mood selection div 
    $("#submitinfo").click(function()
    {
      $("#info-form").hide(500);  
      $("#preparing").show(500);   
     });

    
});