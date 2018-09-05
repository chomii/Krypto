

export default class CurrencyTable {
    constructor() {
        this.items = []
    }

    addItem(item) {
        this.items.push(item);

        return item;
    }
    
    updateItem(id, newAmount) {

        const index = this.items.findIndex(el => {
            return el.id === id
        });
        this.items[index].setAmount(newAmount);
    }
    
    getItemForId(id) {
        return this.items.find(el => el.id === id);
    }

    
}