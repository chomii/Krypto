

export default class CurrencyTable {
    constructor() {
        this.items = []
    }

    addItem(item) {
        this.items.push(item);

        return item;
    }
    
}