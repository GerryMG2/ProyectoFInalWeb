
options = {
  method: "GET",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json"
  }
};



start = () => {
  console.log(usercode);
  var btn_pass = document.getElementById("editp");
  var btn_email = document.getElementById("editm");
  var sPass = document.getElementById("form-pass");
  var sEmail = document.getElementById("form-email");
  var oPass = document.getElementById("oldPass");
  var nPass = document.getElementById("newPass");
  var cPass = document.getElementById("confirmPass");
  var confP = document.getElementById("saveP");
  var nEmail = document.getElementById("newEmail")
  var confEmail = document.getElementById("saveM")

 confP.addEventListener("click", e => {
   e.preventDefault();
   if(oPass.value != ""){
     if((nPass!="") && (nPass.value == cPass.value)){
       let URL = "/api/admin/users/password";

       let options = {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      }

      options["body"] = JSON.stringify({
        code: usercode,
        oldPass: oPass.value,
        newPass:nPass.value,
        confPass:cPass.value  

      });

      fetch(URL, options)
      .then(res => res.json())
      .catch(error => console.log("error: ", error))
      .then(response => {
        console.log("success: ", response);
        if(response.result == "success"){
          Swal.fire(response.msg, ":)", response.result);

        } else{
          Swal.fire(response.msg, ":(", response.result);
        }
      });
     }else{
      Swal.fire("Contraseñas no coinciden", "no ingreso los nuevos campos ", "error");

     }

   } else{
    Swal.fire("Ingrese los datos", "vuelva a intentarlo", "error");

   }

 })

 confEmail.addEventListener("click", e=>{
e.preventDefault();

 })





  function activateOrNot(index) {
   
      if (index == 1) {
        sPass.classList.toggle("is-hidden");
        sEmail.classList = "is-hidden";
      }else{
      sEmail.classList.toggle("is-hidden");
      sPass.classList = "is-hidden";
      }
      
  
    
  }

  //btn pass
  btn_pass.addEventListener("click", e => {
    e.preventDefault();
    activateOrNot(1);
    // e.preventDefault();
    // sPass.classList.toggle("is-hidden");
    // sEmail.classList = " ";
    // console.log("puto pass")

  });

  btn_email.addEventListener("click", e => {
    // e.preventDefault();
    // sEmail.classList.toggle("is-hidden");
    // sPass.classList = " ";
    // console.log(" puto mail")
    e.preventDefault();
    activateOrNot(0);
  });

}




window.onload = start;