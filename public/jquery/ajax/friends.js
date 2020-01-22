function unfriend(myid) {

  blockis =  $("#"+myid+"block").hide() ;
  console.log(blockis)
 

 console.log(myid);

    $.ajax({
      type: "POST",
      url: "/unfriend",
      data: { str : myid},
      success: function () 
      {
        console.log("success !!!!!!!!!!!!!!!");
      },});
   }

var searchQuery24


function addfriend(myid) {
  keyis =  $("#"+myid+"key").val() ;
  console.log(keyis)
 

 console.log(myid);

    $(".backenedresultsarethis").remove();
    $("#proposalSentDiv").show(1000);
    $("#proposalSentDiv").hide(3000);

    $.ajax({
      type: "POST",
      url: "/sentfriendrequest",
      data: { str : myid,str2: keyis},
      success: function (data) 
      {
        console.log(data+"success !!!!!!!!!!!!!!!");
        if (data == "success")
        {
          location.reload();
        }
      },});
   }
  
  $(document).ready(function()
  {
    $("#hide").hide();
    $("#hidesuggetion").hide();
    $("#suggetions").hide();
  
    $("#privacy-notes").hide();
    $("#proposalSentDiv").hide();
  
    $("#searching").hide();


    $( "#backbutton" ).click(function() 
    {
        $(this).attr("disabled", "disabled");
     });
  

    //To open sprivacy notes 
    $("#show").click(function()
    {
      $("#hide").show(1000);
      $("#show").hide(1000);
      $("#privacy-notes").show(1000);  
      $('html, body').animate(
        {
            scrollTop: $("#privacy-notes").offset().top
        },
         2000);
    });
  
    //to hide privacy notes
    $("#hide").click(function()
    {
      $("#hide").hide(1000);
      $("#show").show(1000);
      $("#privacy-notes").hide(1000);  
    });

    
  
    $("#showsuggetion").click(function()
    {
      $("#hidesuggetion").show(1000);
      $("#showsuggetion").hide(1000);
      $("#suggetions").show(1000);  
      $('html, body').animate(
        {
            scrollTop: $("#suggetions").offset().top
        },
         2000);
    });
  
    //to hide privacy notes
    $("#hidesuggetion").click(function()
    {
      $("#hidesuggetion").hide(1000);
      $("#showsuggetion").show(1000);
      $("#suggetions").hide(1000);  
    });
  //------------------------------------------      AJAX AJAX AJAX        ---------------------------------------------------------------
  
  // AJAX FUNCIOTN WHEN CLICK ON SEARCH BUTTON ---
  $("#search-button").click(function () 
  {
    var searchQuery =  $("#search-box").val() ;
    
    if(searchQuery == "")
    {
      console.log("Clicked search button, but no search query"); 
      $(".backenedresultsarethis").remove(); 
    }
    else
    {
      $("#searching").show();
      $(".backenedresultsarethis").remove();
     
          $.ajax({
              type: "POST",
              url: "/friendsearch",
              data: { str : searchQuery },
              success: function (data) 
              {
                console.log(data);
  
                $(".backenedresultsarethis").remove();
                $("#searching").hide(1000);

  
                if(data == "")
                {
                  console.log("data is null or no data found !!!!!!!!!!!!!");
                  var nd1 = "<div class='backenedresultsarethis' id='search-results'><center>";
                  var nd2 = "<p>No data found !</p>"
                  var nd3 = "</center></div>"             
                  var ndtotal = nd1 + nd2 + nd3;
                  $("#apendSearchResults").append(ndtotal);
                }
  
               for(var j=0; j < data.length; j++)
               {

        var r1 = "<div class='backenedresultsarethis' id='search-results'>";
        var r2 = "<img src='"+data[j].profileimageurl+"'>"
        var r3 = "<p>NID : " + data[j].nid + "</p>"
        var r4 = "<p>"+ data[j].firstname  +"</p>"            
        var r5 = "<p>"+ data[j].lastname +"</p>"       
        var r6 = "<button id='"+data[j].nid+"' onclick='addfriend(this.id)'>Add friend</button>"                                 
        var r7 = "</div>"             
        var rr = r1 + r2 + r3 + r4 + r5 + r6 + r7 ;
                 $("#apendSearchResults").append(rr).show(1000);
  
               }      
  
  
  
  
              },});
    } 
  });// END OF AJAX FUNCTION BECAUSE OF SEARCH BUTTON
  
  //AJAX FUNCTION WHEN USER HIT ENTER
  $('#search-box').on("keyup", function(e)
  {
    if (e.keyCode == 13)
    {
      var searchQuery =  $("#search-box").val() ;
      if (searchQuery == "")
      {
        console.log("Entered enter button, but no search query");  
        $(".backenedresultsarethis").remove();
      }
      else
      {
        $("#searching").show();
        $(".backenedresultsarethis").remove();
  
        $.ajax({
              type: "POST",
              url: "/friendsearch",
              data: { str : searchQuery},
              success: function (data) 
              {
                console.log(data);
                $(".backenedresultsarethis").remove();
                $("#searching").hide(1000);
 
                 if(data == "")
                 {
                   console.log("data is null or no data found !!!!!!!!!!!!!");
                   var nd1 = "<div class='backenedresultsarethis' id='search-results'><center>";
                   var nd2 = "<p>No data found !</p>"
                   var nd3 = "</center></div>"             
                   var ndtotal = nd1 + nd2 + nd3;
                   $("#apendSearchResults").append(ndtotal);
                 }
  
                for(var j=0; j < data.length; j++)
                {
         var r1 = "<div class='backenedresultsarethis' id='search-results'>";
         var r2 = "<img src='"+data[j].profileimageurl+"'>"
         var r3 = "<p>NID : " + data[j].nid + "</p>"
         var r4 = "<p>"+ data[j].firstname  +"</p>"            
         var r5 = "<p>"+ data[j].lastname +"</p>"       
         if(data[j].key == undefined)
         {
          console.log(data[j].key);
           var r8 = "";
         }
         else
         {
          var r8 = "<center><input type='text' id='"+data[j].nid+"key' placeholder='Enter key' required>&nbsp;&nbsp;&nbsp;";
         }
         var r6 = "<button id='"+data[j].nid+"' onclick='addfriend(this.id)'>Add friend</button><center>"                                 
         var r7 = "<center><hr class='hr-shadow'></center><br></div>"             
         var rr = r1 + r2 + r3 + r4 + r5 + r8 + r6 + r7 ;
                  $("#apendSearchResults").append(rr).show(1000);
                }      
          },});
       }
    }
  });//END OF AJAX REQUEST BECAUSE OF ENTER BUTTON
  



  $("#showsuggetion").click(function () 
  {
    $.ajax({
      type: "POST",
      url: "/showsuggetion",
      success: function (data) 
      {
        console.log(data);
        $(".backenedsuggetionarethis").remove();
  
         for(var j=0; j < data.length; j++)
        {

 var r1 = "<div class='backenedsuggetionarethis' id='search-results'>";
 var r2 = "<img src='"+data[j].profileimageurl+"'>"
 var r3 = "<p>NID : " + data[j].nid + "</p>"
 var r4 = "<p>"+ data[j].firstname  +"</p>"            
 var r5 = "<p>"+ data[j].lastname +"</p>"       
 if(data[j].key == undefined)
 {
  console.log(data[j].key);
   var r8 = "";
 }
 else
 {
  var r8 = "<center><input type='text' id='"+data[j].nid+"key' placeholder='Enter key' required>&nbsp;&nbsp;&nbsp;";
 }
 var r6 = "<button id='"+data[j].nid+"' onclick='addfriend(this.id)'>Add friend</button><center>"                                 
 var r7 = "<center><hr class='hr-shadow'></center><br></div>"             
 var rr = r1 + r2 + r3 + r4 + r5 + r8 + r6 + r7 ;
          $("#suggetions").append(rr).show(1000);
        }

      },});
  });


  
  $("#nextsuggetion").click(function () 
  {
    $.ajax({
      type: "POST",
      url: "/showsuggetion",
      success: function (data) 
      {
        console.log(data);
        $(".backenedsuggetionarethis").remove();
        
        if(data == "")
        {
    
          console.log("data is null or no data found !!!!!!!!!!!!!");
          var nd1 = "<div class='backenedsuggetionarethis' id='search-results'><center>";
          var nd2 = "<p> No suggesions !</p><br>"
          var nd3 = "</center></div>"             
          var ndtotal = nd1 + nd2 + nd3;
          $("#suggetions").append(ndtotal);
        }

else{
  
         for(var j=0; j < data.length; j++)
        {

var myimagepath = data[j].profileimageurl;
var splitty = myimagepath.split("public/");
var firstpartitis = splitty[0];
var lastpartitis = splitty[1];
console.log(firstpartitis);
console.log(lastpartitis);

 var r1 = "<div class='backenedsuggetionarethis' id='search-results'>";
 var r2 = "<img src='"+lastpartitis+"'>"
 var r3 = "<p>NID : " + data[j].nid + "</p>"
 var r4 = "<p>"+ data[j].firstname  +"</p>"            
 var r5 = "<p>"+ data[j].lastname +"</p>"       
 if(data[j].key == undefined)
 {
  console.log(data[j].key);
   var r8 = "";
 }
 else
 {
  var r8 = "<center><input type='text' id='"+data[j].nid+"key' placeholder='Enter key' required>&nbsp;&nbsp;&nbsp;";
 }
 var r6 = "<button id='"+data[j].nid+"' onclick='addfriend(this.id)'>Add friend</button><center>"                                 
 var r7 = "<center><hr class='hr-shadow'></center><br></div>"             
 var rr = r1 + r2 + r3 + r4 + r5 + r8 + r6 + r7 ;
          $("#suggetions").append(rr).show(1000);
        }
      }
      },});
  });
  

  //END OF DOCUMENT . READY FUNCTION-----
  });
  

  