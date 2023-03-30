export class Section { //отрисовка элементов на странице
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    addItem (item) { // добавление пользовательской карточки
        this._container.prepend(item)
    }

    addItems(items) { // добавление изначальных карточек
        this._container.append(items);
    }

    renderItems(items) {
        this._items = items;
        this._items.forEach(item => this._renderer(item))
    }
}