function seePassword() {
    var contrasena = document.getElementById('premium-account-password');
    var iconoSvg = document.getElementById('password--account-eye');
    if (contrasena.type === "password") {
        contrasena.type = "text";
    } else {
        contrasena.type = "password";
    }
    iconoSvg.classList.toggle('is-active');
} ;

var icono = document.getElementById('password--account-eye');

icono.addEventListener('click', seePassword);