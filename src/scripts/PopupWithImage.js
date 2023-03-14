import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(evt) {
        super('place-popup');
        this._src = evt.target.src;
        this._alt = evt.target.alt;
    }
    open () {
        const fewImage = this._popup.querySelector('.image-figure__image');
        fewImage.src = this._src;
        fewImage.alt = this._alt;
        const fewCaption = this._popup.querySelector('.image-figure__caption');
        fewCaption.textContent = this._alt;
        super.open();
    }
}