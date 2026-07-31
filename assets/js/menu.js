document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            if (toggler.getAttribute('aria-expanded') === 'false') {
                navbar.classList.remove('scrolled');
            }
        }

        if (currentScrollY > 100 && toggler.getAttribute('aria-expanded') === 'false') {
            
            if (currentScrollY > lastScrollY) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        lastScrollY = currentScrollY;
    });

    toggler.addEventListener('click', function() {
        setTimeout(() => {
            if (this.getAttribute('aria-expanded') === 'true') {
                navbar.classList.remove('navbar-hidden');
                navbar.classList.add('scrolled');
            } else {
                if (window.scrollY < 50) {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 10);
    });
});