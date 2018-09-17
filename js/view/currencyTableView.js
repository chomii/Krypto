

export const renderTable = (parent) => {
    const markup = `
        <table class="table hidden">
            <thead class="table__head">
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>$ Price</th>
                    <th>% Last 24h</th>
                    <th>Amount you own</th>
                    <th>$ Value of your coin</th>
                </tr>
            </thead>
            <tbody class="table__body">
                
            </tbody>
        </table>
        <div class="pagination hidden"></div>
    `
    
    parent.insertAdjacentHTML('afterbegin', markup);
}