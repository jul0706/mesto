import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor() {
        super('place-popup');
        this.open = this.open.bind(this);
        this._fewImage = this._popup.querySelector('.image-figure__image');
        this._fewCaption = this._popup.querySelector('.image-figure__caption');
    }
    open (link, name) { 
        this._fewImage.src = link;
        this._fewImage.alt = name;
        this._fewCaption.textContent = name;
        super.open();
    }
}