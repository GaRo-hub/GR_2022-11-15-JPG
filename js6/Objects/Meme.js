import Image from './Image.js'

export default class Meme {
    #serveurRessourceUrl = undefined;

    id = undefined;
    imageId = -1;
    #image = undefined;
    fontSize = 10;
    fontWeight = "500";
    text = "";
    x = 0;
    y = 7;
    color = '#ACACAC';
    underline = false;
    italic = false;
    titre = "";

    constructor(serveurRessourceUrl = '/memes') {
        this.#serveurRessourceUrl = serveurRessourceUrl;
    }
    renderSvg = () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', '100%');
        svg.setAttribute('width', '100%');
        svg.setAttribute('viewBox', typeof this.#image === 'object' && this.#image.w && this.#image.h ? `0 0 ${this.#image.w} ${this.#image.h}` : '0 0 1000 1000')

        if (this.#image && this.#image.href) {
            const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            img.setAttribute('x', 0);
            img.setAttribute('y', 0);
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '/img/' + this.#image.href);
            svg.append(img);
        }

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', this.x);
        text.setAttribute('y', this.y);
        text.style.textDecoration = this.underline ? 'underline' : 'none';
        text.style.fontStyle = this.underline ? 'italic' : 'normal';
        text.style.fontWeight = this.fontWeight;
        text.style.fontSize = this.fontSize+'px';
        text.style.fill = this.color;
        text.innerHTML = this.text;
        svg.append(text);

        return svg;
    }
    setImage=(imageId,imgList)=>{
        const imgIdConverted=Number(imageId);
        if(!Number.isInteger(imgIdConverted)){
            this.#image=undefined;
            this.imageId=-1;
            return;
        }
        this.#image=imgList.find(img=>img.id===imgIdConverted);
        this.imageId=imgIdConverted;
    } 
        /**
     * fetching fuction for saving
     * test if new (id exist) or not
     * @return {Promise<{}>}
     */
    #uploadOnRest = () => {
        return fetch(`${REST_ADR}${
            this.id !== undefined ? this.#serveurRessourceUrl+'/' + id : this.serveurRessourceUrl
        }`, {
            body:JSON.stringify(this), 
            method: this.id !== undefined ? 'PUT' : 'POST', 
            headers: { "Content-Type": 'application/json' } 
            }
        )
            .then(r => r.json())
    }
    /**
     * post or update this meme
     * @returns {Promise<{Meme}>}
     */
    save=() => {
        let isNew = this.id !== undefined ? false : true;
        return this.#uploadOnRest().then(m => {
            if (isNew) {
                this.id = m.id;
                history.pushState('', '', '/creator/' + m.id);
            }
            return m;
        });
    }

    /**
     * clear meme value to return to ean empty meme with no id
     */
    clear=()=>{
        this.id = undefined;
        this.imageId = -1;
        this.#image = undefined;
        this.fontSize = 10;
        this.fontWeight = "500";
        this.text = "";
        this.x = 0;
        this.y = 7;
        this.color = '#ACACAC';
        this.underline = false;
        this.italic = false;
        this.titre = "";
    }
};

export const currentMeme = null;