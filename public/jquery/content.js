$(document).ready(function()
{
    $("#final-div").hide();  
    $("#showing").hide();    
  
    //To get next content 
    $("#no").click(function()
    {
      $("#showing").show();    
        $(this).attr("disabled", "disabled");
  

      $.ajax({
        type: "POST",
        url: "/nextcontent",
        success: function (data) 
        {
          $("#showing").hide(1000);    
          $("#no").removeAttr("disabled");

          console.log(data+"    success !!!!!!!!!!!!!!!");    
          $("#content-1").hide(1000);  
          $("#content-1").remove();

          var fr1 = "<center><iframe id='content-1' class='videoshow' "        
          var fr2 = "src='"+data[0].src+"'" 
          var fr3 = "frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></center>"
          var fr4 = fr1 + fr2 + fr3;
          $("#wrapper").append(fr4);
       
        },});//ajax request ended


    });
  
    $("#yes").click(function()
    {
      $("#content-1").hide(1000);  
      $("#content-2").hide(1000);  
      $("#final-div").show(1000);  
      
      $("#yes").hide(1000);  
      $("#no").hide(1000);  
      $("#neutral-head").hide(1000);  
      
      $("#top-line").hide(1000);  
      
    });
});  