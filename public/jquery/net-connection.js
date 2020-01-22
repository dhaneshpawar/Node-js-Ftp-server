const ooUpdate = document.getElementById('ooUpdate');

if(navigator.onLine){
    ooUpdate.textContent = "";
    ooUpdate.style.color = 'green';    
}

//add event listeners
window.addEventListener('online',function () {
    $("#ooUpdate").show();

    ooUpdate.textContent = "You are online";
    ooUpdate.style.color = 'green';    
    $("#ooUpdate").fadeOut(1000);  
})

window.addEventListener('offline',function () {
    $("#ooUpdate").show();
    ooUpdate.textContent = "You are offline";
    ooUpdate.style.color = 'red';    
})
