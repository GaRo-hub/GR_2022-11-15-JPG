/**
 * function de gestion de la navbar
 */
function setNavbarEvent(){
    document.querySelector('#link-create').addEventListener('click', linkCreateEvt);
    document.querySelector('#link-home').addEventListener('click', linkHomeEvt);
    document.querySelector('#link-thumbnail').addEventListener('click', linkThumbnailEvt);
}
/**
 * gestion des classes 'active' de navbar
 * @param {object} evt event déclencheur
 * @param {boolean} setActiveParentLi mettre le parent actif ou non
 */
function setActiveLinkInNavbar(evt,setActiveParentLi=true){
    var tousLesLi = document.querySelectorAll('nav>.navbar li')
    tousLesLi.forEach(
            function(li){
                li.classList.remove('active');
            }
        )
    if(setActiveParentLi){evt.target.parentElement.classList.add('active')};
}
/**
 * comportement du clic sur le lien Create
 * @param {object} evt event déclencheur
 */
function linkCreateEvt(evt){
    // échappement du comportement par défaut de la balise déclenchant l'événement
    evt.preventDefault()
    console.log('fonction create', evt);
    setActiveLinkInNavbar(evt)
}
/**
 * comportement du click sur le lien Home
 * @param {object} evt event déclencheur
 */
function linkHomeEvt(evt){
    evt.preventDefault()
    console.log('fonction home', evt)
    setActiveLinkInNavbar(evt, false)
}
/**
 * comportement du clic sur le lien Thumbnail
 * @param {object} evt event déclencheur
 */
function linkThumbnailEvt(evt){
    evt.preventDefault()
    console.log('fonction thumbnail', evt)
    setActiveLinkInNavbar(evt)
}