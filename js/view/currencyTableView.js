import { elements } from './base';
export const getInput = () => elements.inputField.value;
export const renderItem = item => {
    const markup = `
        <tr>
            <td>${item.name}</td>
            <td>${item.symbol}</td>
            <td>${(item.price).toFixed(2)} $</td>
            <td style="color:${stylePercentChange(item.perc24h)}">${(item.perc24h).toFixed(2)} %</td>
            <td class="input">
                <input class="input__field" type="number" name="amount" placeholder="Amount" />
                <button class="input__btn" type="button">Submit</button>
            </td>
            <td>0.00 $</td>
        </tr>
    `
    elements.tableBody.insertAdjacentHTML('beforeend', markup)
}

const stylePercentChange = (value) => {
    return value > 0 ? "green" : "red"
}
