document.addEventListener("DOMContentLoaded", function() {
    fetch("templates/partials/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-placeholder").innerHTML = data;

            // Agregar el evento de clic para el botón de menú
            const menuButton = document.querySelector("#nav-list a:first-child"); // El primer enlace que activa el menú
            const menu = document.querySelector("#header-menu .hidden-menu"); // El menú que se oculta inicialmente

            menuButton.addEventListener("click", function(event) {
                event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
                menu.classList.toggle("show-menu"); // Alternar entre las clases
                menu.classList.toggle("hidden-menu");
            });
        })
        .catch(error => console.error("Error al cargar el header:", error));
});
