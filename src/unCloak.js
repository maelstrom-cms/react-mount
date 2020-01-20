const unCloak = function (cloakClass = 'cloak') {
    const elements = document.querySelectorAll(`.${cloakClass}`);

    Array.from(elements).forEach(element => {
        element.classList.remove(cloakClass);
    });
};

export default unCloak
