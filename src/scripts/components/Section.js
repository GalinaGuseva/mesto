export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem(element) {
        this._container.prepend(element);
    
    }

    renderItem() {
        this._renderedItems.forEach((item) => {
            this._renderer(item);
          });             
    }    
}