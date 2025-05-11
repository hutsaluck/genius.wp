/* Dark Mode Style */
let styleMode = localStorage.getItem('styleMode');
const styleToggle = document.querySelector('.header-switcher');

const enableDarkStyle = () => {
    document.body.classList.add('dark-mode-gamestore');
    localStorage.setItem('styleMode', 'dark');
}

const disableDarkStyle = () => {
    document.body.classList.remove('dark-mode-gamestore');
    localStorage.setItem('styleMode', 'light');
}

if(styleToggle) {
    styleToggle.addEventListener('click', () => {
        styleMode = localStorage.getItem('styleMode');
        if(styleMode === 'light') {
            enableDarkStyle();
        } else {
            disableDarkStyle();
        }
    })
}

if(styleMode === 'dark') {
    enableDarkStyle();
}