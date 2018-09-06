export const elements = {
    headerText: document.querySelector('.header__text'),
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
            Loading<span>.</span><span>.</span><span>.</span>
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', loader);
    
}
export const animateRender = () => {
    elements.table.classList.remove('table-hidden');
    elements.table.style.animation = 'fadeInOpacity';
    elements.headerText.style.animation = 'fadeInOpacity';
    elements.table.style.animationDuration = '2s';
    elements.headerText.style.animationDuration = '2s';
    elements.headerText.style.opacity = '1';
}

