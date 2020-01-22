function passmood(element)
{
alert(element);

$.ajax({
    type: "POST",
    url: "/setmood",
    data: {str : element},
    success: function (data) 
    {
      console.log(data+"success !!!!!!!!!!!!!!!");
    },});
}

function passreason(element)
{
alert(element);
$("#select-mood-div-main").hide();  
$("#select-reason-div").hide();  
$("#neutral-head").hide();  

$("#preparing").show(1000);  

$('html, body').animate(
    {
        scrollTop: $("#preparing").offset().top
    },
     1000);


$.ajax({
    type: "POST",
    url: "/setreason",
    data: {str : element},
    success: function (data) 
    {
        if (data == "success")
        {
         console.log("data retrival successful")
            $.ajax({
                type: "GET",
                url: "/content",
                data: {str : element},
                success: function () 
                {
                    console.log("redirecting the page");
                    location.replace("content");
                },});
        }
       
    },});
}


$(document).ready(function()
{
    $("#select-mood-div-main").hide();  
    $("#select-reason-div").hide();  
    $("#preparing").hide();  
    
    //To open mood selection div 
    $("#no").click(function()
    {
      $("#select-mood-div-main").show(500);  
          //to get focus to the div
    $('html, body').animate(
        {
            scrollTop: $("#select-mood-div-main").offset().top
        },
         1000);
    
    });
  
   //to open reason selection div
    $(".select-mood-div").click(function()
    {
      $("#select-mood-div-main").hide(500);  
      $("#select-reason-div").show(500);  
          //to get focus to the div
    $('html, body').animate(
        {
            scrollTop: $("#select-mood-div").offset().top
        },
         1000);
    });
});  

