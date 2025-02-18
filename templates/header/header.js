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
            search.classList.remove('active');
            input.blur();
        } else {
            search.classList.add('active');
            setTimeout(() => {
                input.focus();
            }, 50);
        }
    });

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