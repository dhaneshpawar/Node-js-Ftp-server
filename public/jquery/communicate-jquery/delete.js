function deletepost(element) {
    alert(element);
   
    var splitting = element.split('delete');
    var postid = splitting[0];
    alert("only post id = "+postid);

    $("#"+postid+"removediv").show(1000);
    
}

function noremove(element) {
    alert(element)
    var splitting = element.split('remove');
    var postid = splitting[0];
    alert("only post id = "+postid);

    $("#"+postid+"removediv").hide(1000);
}

function yesremove(element)
{
alert(element)

var splitting = element.split('remove');
var postid = splitting[0];
alert("only post id = "+postid);

$("#"+postid+"removediv").hide(1000);
$("#"+postid).hide(1000);

$.ajax({
    type: "POST",
    url: "/deletepost",
    data: { str : postid},
    success: function () 
    {
    },});
}


socket.on('removepost',function (removepostid) {
alert(removepostid)
$("#"+removepostid).remove();
console.log("removed the post...");
})
