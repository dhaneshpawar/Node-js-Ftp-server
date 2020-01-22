function demo(myid) {
  $(".backenedresultsarethis").remove();
  $("#proposalSentDiv").show(1000);
  $("#proposalSentDiv").hide(3000);
 
  $.ajax({
    type: "POST",
    url: "/sentproposal",
    data: { str : myid},
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
  $("#privacy-notes").hide();
  $("#proposalSentDiv").hide();
  $("#searching").hide();

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
        $(".backenedresultsarethis").remove();
        $("#searching").show();

        $.ajax({
            type: "POST",
            url: "/mindmatchsearch",
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
       var r6 = "<button id='"+data[j].nid+"' onclick='demo(this.id)'>Send Proposal</button>"                                 
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
      $(".backenedresultsarethis").remove();
      $("#searching").show();

      $.ajax({
            type: "POST",
            url: "/mindmatchsearch",
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
       var r6 = "<button id='"+data[j].nid+"' onclick='demo(this.id)'>Send Proposal</button>"                                 
       var r7 = "</div>"             
       var rr = r1 + r2 + r3 + r4 + r5 + r6 + r7 ;
                $("#apendSearchResults").append(rr).show(1000);

              }      

            },});
     }
  }
});//END OF AJAX REQUEST BECAUSE OF ENTER BUTTON

//AJAX REQUEST FROM DELETE ALL PROPOSALS
$("#Delete-all-proposals").click(function () 
{
alert("delete proposal button clicked !");

  $.ajax({
    type: "POST",
    url: "/deleteproposal",
    data: {str : "not"},
    success: function (data) 
    {
      console.log(data+"success !!!!!!!!!!!!!!!");
      if (data == "success")
      {
        location.reload();
        console.log("proposals deleted...");
      }
    },});


});


//END OF DOCUMENT . READY FUNCTION-----
});
