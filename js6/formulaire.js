import './globalvars.js';

import Images, {images} from './Objects/Images.js'
import Image from './Objects/Image.js'
import Meme from './Objects/Meme.js'
import {memes} from './Objects/Memes.js'

import {loadPageByPromise} from './commonFunctions.js';

export default class VueFormulaire{
    #vueHref='create.html';
    domRefElement=undefined;
    meme=undefined;
    #nodeSelector;
    #container=undefined;
    #currentMeme= new Meme();
    constructor(nodeSelector="#wrapper"){
        this.#nodeSelector = nodeSelector;
    }
    #renderCurrent=()=>{
        this.domRefElement.querySelector('svg').replaceWith(this.#currentMeme.renderSvg())
    }
    #ongenericinput=(evt)=>{
        const name = evt.target.name;
        this.#currentMeme[name]=evt.target.value;
        console.log(name, this.#currentMeme[name]);
        this.#renderCurrent()
        }
    #addEvents=()=>{
        // this.#container.querySelector(`#meme_titre`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_text`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_x`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_y`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_fontsize`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_fontweight`).addEventListener("input",this.#ongenericinput);
        // this.#container.querySelector(`#meme_color`).addEventListener("input",this.#ongenericinput);

        this.#container
            .querySelectorAll("form input[type=text],form input[type=number],form input[type=color]")
            .forEach(e=>{e.addEventListener("input", this.#ongenericinput)})
        this.#container
            .querySelector("select")
            .addEventListener("change",(evt)=>{
                console.log(evt.target)
                this.#currentMeme.setImage(Number(evt.target.value), images)
                this.#renderCurrent()
            })
        }
        // this.#container.querySelector(".submit").addEventListener(
        //     "click",
        //     (evt)=>{
        //         evt.preventDefault();
        //         this.#currentMeme.save();
        //         console.log(this.#currentMeme);
        //     }
        //     )
    #loadingContent=(images)=>{
        const select=this.#container.querySelector('select');
        // multi-execution protection
        select.innerHTML = "";
        const noImg=document.createElement('option');
        noImg.value = -1;
        noImg.innerHTML='Aucune image';
        select.append(noImg);
        // append image options
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
                this.#loadingContent(images);
                this.#addEvents();
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