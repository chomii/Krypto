

export default class Currency {
    constructor(id, name, symbol, price, perc24h) {
            this.id = id,
            this.name = name,
            this.symbol = symbol,
            this.price = price,
            this.perc24h = perc24h,
            this.amount = 0,
            this.userValue = 0;
            this.calculateValue();
    }

    setAmount(amount) {
        this.amount = parseFloat(amount);
        this.calculateValue();
    }
    setValue(value) {
        this.userValue = parseFloat(value);
    }
    getAmount() {
        return parseFloat(this.amount, 10)
    }

    getUserValue() {
        return parseFloat(this.userValue);
    }

    calculateValue() {
        const newValue = parseFloat(this.amount * this.price).toFixed(2);
        if(isNaN(newValue)) {
            this.userValue = 0.0;
        } else {
            this.setValue(newValue);
        }
         
    }

    
}