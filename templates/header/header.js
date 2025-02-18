document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.fi-rr-menu-burger');
    const mobileMenu = document.querySelector('#menu-wrapper');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const search = document.querySelector('.search');
    const btn = document.querySelector('.btn');
    const input = document.querySelector('.input');

    btn.addEventListener('click', () => {
        if (search.classList.contains('active')) {
            // Si el campo de búsqueda está abierto, lo cerramos
            search.classList.remove('active');
            input.blur(); // Quita el foco del campo de búsqueda
        } else {
            // Si el campo de búsqueda está cerrado, lo abrimos
            search.classList.add('active');
            // Enfoca el campo de búsqueda después de un pequeño retraso
            setTimeout(() => {
                input.focus();
            }, 50); // Un retraso mínimo para asegurar que el campo esté visible
        }
    });

    // Cerrar el campo de búsqueda si se hace clic fuera de él
    document.addEventListener('click', (event) => {
        const isClickInsideSearch = search.contains(event.target);
        if (!isClickInsideSearch && search.classList.contains('active')) {
            search.classList.remove('active');
        }
    });

    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
        main.classList.toggle('blur-item');
        footer.classList.toggle('blur-item');
    });
});