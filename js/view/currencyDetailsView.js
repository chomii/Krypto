import { elements } from './base';

export const renderDetails = (currency, parent) => {
    const markup = `
        <div class="details">
            <h1>Name: ${currency.name}</h1>
            <h2>Symbol: ${currency.symbol}</h2>
            <h3>Price: ${currency.price}</h3>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin', markup);
}