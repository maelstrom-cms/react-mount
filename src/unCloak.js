const unCloak = function (cloakClass = '.cloak') {
    cloakClass = cloakClass.replace('.', '');

    const elements = document.querySelectorAll(cloakClass);

    Array.from(elements).forEach(element => {
        element.classList.remove(cloakClass);
    });
};

export default unCloak
