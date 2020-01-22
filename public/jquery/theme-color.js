var root = document.querySelector(':root')

    
        var element = localStorage.getItem("color");
     
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
