

export default class Currency {
    constructor(id, name, symbol, price, perc24h) {
            this.id = id,
            this.name = name,
            this.symbol = symbol,
            this.price = price,
            this.perc24h = perc24h,
            this.amount = 0,
            this.userValue = 0;
    }

    setAmount(amount) {
        this.amount = amount;
        this.calculateValue();
    }

    calculateValue() {
        if(this.amount > 0) {
            this.userValue = (this.amount * this.price).toFixed(2);
        }
    }
}