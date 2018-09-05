export const elements = {
    tableBox: document.querySelector('.table-box'),
    tableBody: document.querySelector('.table__body'),
    table: document.querySelector('.table'),
    input: document.querySelector('.input'),
    inputField: document.querySelector('.input__field'),
    inputValue: document.querySelector('.input__value'),
    loader: document.querySelector('.loader')
};

export const renderLoader = (parent) => {

    const loader = `
        <div class="loader">
            Loading...
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', loader);
    
}

