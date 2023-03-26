export class Section { //отрисовка элементов на странице
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    addItem (item) {
        this._container.prepend(item)
    }

    renderItems(items) {
        this._items = items;
        this._items.forEach(item => this._renderer(item))
    }
}