
document.getElementById("signIn").onclick = function () {
    console.log("entró");
    document.getElementById("login").submit();

}

document.querySelector('#login').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        document.getElementById("login").submit();
    }
});