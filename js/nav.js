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
function linkCreateEvt(evt, memeId){
    // échappement du comportement par défaut de la balise déclenchant l'événement
    evt.preventDefault();
    let urlappend = undefined===memeId?'creator':`/creator/${memeId}`
    history.pushState('', 'creator', urlappend)
    console.log('fonction create', evt);
    setActiveLinkInNavbar(evt);
    loadPage('create.html', (nodeBase) =>{
        var form = nodeBase.querySelector('form');
            form.addEventListener('submit', (evt) =>{
                evt.preventDefault();
                console.log('formulaire soumis')
            })
    });
    
    console.log(location)
}
/**
 * comportement du click sur le lien Home
 * @param {object} evt event déclencheur
 */
function linkHomeEvt(evt){
    evt.preventDefault()
    history.pushState('', 'home', '/')
    console.log('fonction home', evt)
    setActiveLinkInNavbar(evt, false)
    loadPage('home.html');
}
/**
 * comportement du clic sur le lien Thumbnail
 * @param {object} evt event déclencheur
 */
function linkThumbnailEvt(evt) {
    //echapement du comportement par defaut de la balise déclenchant l'evenement 
    evt.preventDefault();
    history.pushState('', 'thumbnail', '/thumbnail')
    console.log('fonction liens thumbnail', evt);
    setActiveLinkInNavbar(evt);
    const primages = fetch(`${REST_ADR}/images`).then(r => r.json());
    const prmemes = fetch(`${REST_ADR}/memes`).then(r => r.json());
    //synchro d'execution des then de promise avec 2 promises
    Promise.all([primages, prmemes])
        .then(arr => {
            images = arr[0];
            memes = arr[1];
            loadPage('thumbnail.html', container => {
                //recup du model present dans la vue
                var memeModelNode = container.querySelector('#meme-');
                //suppr. du model vide
                memeModelNode.remove();
                memes.forEach(meme => {
                    //creation d'un doublon du noeud de model
                    const memeNode = memeModelNode.cloneNode(true);
                    //mise en place de l'id dynamique sur le clone
                    memeNode.id = `meme-${meme.id}`;

                    const imageDuMeme = images.find(img => img.id === meme.imageId);

                    memeNode.querySelector('image').setAttribute('xlink:href', '/img/' + imageDuMeme.href);

                    //ternaire    (cond)?vrai:faux;
                    const text=memeNode.querySelector('text');
                    text.style.textDecoration = meme.underline?'underline':'none';
                    text.style.fontStyle = meme.underline?'italic':'normal';
                    text.style.fontWeight = meme.fontWeight;
                    text.style.fontSize = meme.fontSize;
                    text.style.fill = meme.color;

                    memeNode.querySelector('svg').setAttribute('viewBox','0 0 '+imageDuMeme.w+' '+imageDuMeme.h);
                    memeNode.addEventListener('click', (evt) => {
                        linkCreateEvt(evt, meme.id);
                    });

                    //ajout du clone dans le container
                    container.querySelector('#thumbnail').append(memeNode);

                    console.log(meme, imageDuMeme);
                });
            });


        });
}
/**
 * loader de vues
 * @param {string} pageHref filename de la page visée
 * @param {function} callback function pour l'ajout des eventlisteners
 */
function loadPage(pageHref, callback) {
    var pagePath=`/vues/${pageHref}`;
    fetch(pagePath)
        .then(function(resp){
            return resp.text();
        })
        .then(function(html) {
            var wrapperNode=document.querySelector('#wrapper')
            document.querySelector('#wrapper').innerHTML='';
            var container=document.createElement('div');
            container.innerHTML = html;
            if(typeof callback === 'function'){
                callback(container);
            };
            container.childNodes.forEach(element=>{
                wrapperNode.append(element);
            });
            return html;
        });
}