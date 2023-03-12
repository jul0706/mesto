export class Section { //отрисовка элементов на странице
    constructor({array, renderer}, containerSelector) {
        this._items = array;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    addItem (item) {
        this._container.append(item)
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item))
    }
}