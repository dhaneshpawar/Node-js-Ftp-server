function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}


$(document).ready(function()
{
    $("#video").hide();  
    $("#chooseimagetopost").hide();  
    
//showing video
    $("#choosevideotopost").click(function()
    {
      $("#choosevideotopost").hide(1000);
      $("#image").hide(1000);
        
      $("#chooseimagetopost").show(1000);  
      $("#video").show(1000);  
    });

//showing image
$("#chooseimagetopost").click(function()
{
    $("#chooseimagetopost").hide(1000);  
    $("#video").hide(1000);  

    $("#choosevideotopost").show(1000);
    $("#image").show(1000);
    
});

});
 
