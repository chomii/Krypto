

export const renderDetails = (currency, parent) => {
    const markup = `
        <div class="details">
            <h1>Name: ${currency.name}</h1>
            <h2>Symbol: ${currency.symbol}</h2>
            <h3>Price: ${(currency.quotes.USD.price).toFixed(2)}</h3>
            <h3>Rank: ${currency.rank}</h3>
            <h3>Circulating supply: ${currency.circulating_supply}</h3>
            <h3>Total supply: ${currency.total_supply}</h3>
            <h3>Max supply: ${currency.max_supply}</h3>
        </div>
    `
    console.log(currency)
    parent.insertAdjacentHTML('afterbegin', markup);
}