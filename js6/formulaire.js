import './globalvars.js';

import Images, {images} from './Objects/Images.js'
import Image from './Objects/Image.js'
import Meme, {currentMeme} from './Objects/Meme.js'
import {memes} from './Objects/Memes.js'

import {loadPageByPromise} from './commonFunctions.js';

export default class VueFormulaire{
    #vueHref='create.html';
    domRefElement=undefined;
    meme=undefined;
    #nodeSelector;
    #container=undefined;
    constructor(nodeSelector="#wrapper"){
        this.#nodeSelector = nodeSelector;
    }
    #addEvents=()=>{

    }
    #loadingContent=(images)=>{
        const select=this.#container.querySelector('select')
        images.map(e=>{
            const o = document.createElement("option");
            o.value=e.id;
            o.innerHTML=e.titre;
            select.append(o)
        })
    }
    loadPage=(domRefWrapper)=>{
        const promiseImage = Images.fetch();
        const promiseHTMLTemplate = loadPageByPromise(this.#vueHref);
        Promise.all([promiseHTMLTemplate, promiseImage])
            .then(arrayRessources=>{
                this.#container=arrayRessources[0];
                images.replaceContentImagesArray(arrayRessources[1]);
                this.#loadingContent(images)
                console.log(images);

                this.domRefElement = document.querySelector(this.#nodeSelector);
                this.domRefElement.innerHTML='';
                this.#container.childNodes.forEach(elem=>this.domRefElement.append(elem));
            });
    }
    changeMemeValue=(partialMemeData, evt)=>{

    }
    onSubmitForm=(evt)=>{

    }
}