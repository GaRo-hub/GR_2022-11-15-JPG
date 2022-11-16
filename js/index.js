/**
 * Fonction de loader de js pour suppression du bandeau "js pas chargé"
 * @param {string} string une valeur
 * @returns {boolean} un booléen
 */
function loadJS(){
    var divIsJsLoaded = document.querySelector("#is-js-loaded");
    console.log(divIsJsLoaded);
    /*
    // divIsJsLoaded.innerHTML= "JS chargé";
    // divIsJsLoaded.style.backgroundColor = "green";
    // divIsJsLoaded.style.color = "white";
    // divIsJsLoaded.style.textDecoration = "underline";
    */
    divIsJsLoaded.remove();
    setNavbarEvent();
    loadPage('home.html');
}

document.addEventListener('DOMContentLoaded', loadJS);




