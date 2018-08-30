

export default class CurrencyTable {
    constructor() {
        this.items = []
    }

    addItem(item) {
        this.items.push(item);

        return item;
    }
    
    updateItem(id, newAmount) {
        const newItem = this.items.find(el => {
            return el.id === id
        });
        newItem.amount = newAmount;
        newItem.calculateValue();
    }
    
}