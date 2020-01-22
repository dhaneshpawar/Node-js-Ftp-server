var root = document.querySelector(':root')
function myhighlite(element) 
         {
            localStorage.setItem("color",element);

           if(element == "nestimatic")
            {
                root.style.setProperty("--theme-color","#8080ff");
                root.style.setProperty("--main-color","white");
            }

           else if(element == "White")
            {
                root.style.setProperty("--theme-color","white");
                root.style.setProperty("--main-color","#8080ff");
            }

           else
            {
                root.style.setProperty("--theme-color",element);
                root.style.setProperty("--main-color","white");
            }
         }

         
$(document).ready(function()
{
    var localcolor = localStorage.getItem("color");
    $("#color").val(localcolor);

    var defaultKey = $("#key").val();
    var defaultMobile = $("#mobile").val();
    $("#changeProfile").hide();  
    $("#profileSetOrNot").hide();  
    $("#colorQuestion").hide();  
    $("#keyQuestion").hide();  
    $("#mobileQuestion").hide();  
    $("#setprofile").hide();  
    $("#cancelProfile").hide();  


    
    $("#next-color").click(function()
    {
        
        $('#color option:selected').next().attr('selected', 'selected');

        var element =  $('#color').val();  
        localStorage.setItem("color",element);

        if(element == "nestimatic")
         {
             root.style.setProperty("--theme-color","#8080ff");
             root.style.setProperty("--main-color","white");
         }

        else if(element == "White")
         {
             root.style.setProperty("--theme-color","white");
             root.style.setProperty("--main-color","#8080ff");
         }

        else
         {
             root.style.setProperty("--theme-color",element);
             root.style.setProperty("--main-color","white");
         }

    }) 
    //hiding old profile    
    $("#oldProfile").click(function()
    {
      $("#oldProfile").hide(1000);  
      $("#changeProfile").show(1000);  
      $("#profileSetOrNot").show(1000);  
      $("#cancelProfile").show(1000);  
    });

    $("#changeProfile").click(function()
    {
        $("#profileSetOrNot").show(1000);  
        $("#setprofile").show(1000);  
    });

    
    $('.anyName').click(function()
    {
      $("#oldProfile").hide(1000);  
      $("#changeProfile").show(1000);               
    });


    //profile cancel button 
    $("#cancelProfile").click(function()
    {
        $("#changeProfile").hide(1000);  
        $("#profileSetOrNot").hide(1000);  
        $("#oldProfile").show(1000);  
    });


  /* //question of theme 
   $("#color").change(function()
   {
       alert("change is made !!!!!!!!!!");
       $("#colorQuestion").show(1000);  
   });
   
   $("#cancelColor").click(function()
   {
       $("#colorQuestion").hide(1000);  
   });*/

   //question of key
   $("#key").bind("change paste keyup", function()
   {
       $("#keyQuestion").show(1000);  
   });
   
   $("#cancelKey").click(function()
   {
       $("#keyQuestion").hide(1000);
       $("#key").val(defaultKey);  
    });

   //question of mobile
   $("#mobile").bind("change paste keyup", function()
   {
       $("#mobileQuestion").show(1000);  
   });
   
   $("#cancelMobile").click(function()
   {
       $("#mobileQuestion").hide(1000);  
       $("#mobile").val(defaultMobile);  
  
  
   });

});
 
