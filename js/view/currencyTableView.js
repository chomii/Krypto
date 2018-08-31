import { elements } from './base';

export const renderItem = item => {
    const markup = `
        <tr data-rowId="${item.id}">
            <td>${item.name}</td>
            <td>${item.symbol}</td>
            <td>${(item.price).toFixed(2)} $</td>
            <td style="color:${stylePercentChange(item.perc24h)}">${(item.perc24h).toFixed(2)} %</td>
            <td class="input">
                <input class="input__field" type="number" name="amount" placeholder="Amount" />
                <button class="input__btn" type="button">Submit</button>
            </td>
            <td class="input__value">$ ${item.userValue}</td>
        </tr>
    `
    
    elements.tableBody.insertAdjacentHTML('beforeend', markup)

    // render amount from local //todo
    if(item.amount !== 0) {
        document.querySelector('.input__field').value = item.amount;
    }
}

const stylePercentChange = (value) => {
    return value > 0 ? "green" : "red"
}

export const updateUserValue = (id, newValue) => {
    // console.log(id);
    // console.log(newValue);
    const itemToUpdate = document.querySelector(`[data-rowid="${id}"]`);
    itemToUpdate.querySelector('.input__value').textContent = "$ " + newValue;
    
}
