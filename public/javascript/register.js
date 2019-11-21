document.getElementById("submit").onclick = function () {
    console.log("entró");
    document.getElementById("register").submit();

}

document.querySelector('#register').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        document.getElementById("register").submit();
    }
});