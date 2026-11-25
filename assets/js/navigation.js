const navigation = document.querySelector('.navbar');
const menuButton = navigation.querySelector('.nav-toggle');
const mobileNavigation = window.matchMedia('(max-width: 850px)');

function closeMenu() {
    navigation.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Menu openen');
}

navigation.classList.add('menu-ready');
menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
});

navigation.querySelector('.nav-links').addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
});

document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('menu-open')) {
        closeMenu();
        menuButton.focus();
    }
});

mobileNavigation.addEventListener('change', closeMenu);
