var x = document.getElementById("topNav");

var y = document.getElementById("navbarBasicExample")


    document.getElementById("topNav").onclick = function (){
      
        if (x.className === "navbar-burger burger") {
            x.className += " burger is-active";
          } else {
            x.className = "navbar-burger burger";
          }
          if (y.className === "navbar-menu") {
            y.className += " is-active";
          } else {
            y.className = "navbar-menu";
          }
        console.log(y.className)
        }


