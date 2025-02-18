document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.fi-rr-menu-burger');
    const mobileMenu = document.querySelector('#menu-wrapper');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const searchIcon = document.querySelector('#search');
    const searchContainer = document.querySelector('#search-container');
    const closeSearch = document.querySelector('#close-search');

    // Mostrar la barra de búsqueda
    searchIcon.addEventListener('click', (event) => {
        event.preventDefault();
        searchContainer.classList.remove('hidden');
    });

    // Cerrar la barra de búsqueda
    closeSearch.addEventListener('click', () => {
        searchContainer.classList.add('hidden');
    });

    // Mantener funcionalidad del menú
    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
        main.classList.toggle('blur-item');
        footer.classList.toggle('blur-item');
    });
});
