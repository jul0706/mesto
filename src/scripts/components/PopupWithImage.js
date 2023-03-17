import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor() {
        super('place-popup');
        this.open = this.open.bind(this);
        this._fewImage = this._popup.querySelector('.image-figure__image');
        this._fewCaption = this._popup.querySelector('.image-figure__caption');
    }
    open (evt) { 
        this._fewImage.src = evt.target.src;
        this._fewImage.alt = evt.target.alt;
        this._fewCaption.textContent = evt.target.alt;
        super.open();
    }
}