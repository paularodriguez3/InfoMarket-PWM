document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.fi-rr-menu-burger');
    const mobileMenu = document.querySelector('#menu-wrapper');
    const main = document.querySelector('main');

    menuIcon.addEventListener('click', function () {
        mobileMenu.classList.toggle('show-menu');
        main.classList.toggle('blur-item');
    });
});
