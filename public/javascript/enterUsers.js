
document.querySelector('#form-user').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        e.preventDefault();
        document.getElementById("btn-buscar").click();
    }
});