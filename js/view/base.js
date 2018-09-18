// class EventHandler {

//     constructor() {
//         this.events = {};

//         const observer = new MutationObserver((event) => {

//             Object.keys(this.events).forEach((selector) => {
//                 const elements = document.querySelectorAll(selector);

//                 if (!elements || !elements.length) {
//                     return;
//                 }

//                 Object.keys(this.events[selector]).forEach((event) => {

//                     this.events[selector][event].forEach((handler) => {
                        
//                         elements.forEach((element) => {
//                             element.addEventListener(event, handler);
//                         });
//                     });
//                 });
//             });
//         });

//         observer.observe(document.querySelector('body'),  { attributes: true, childList: true, subtree: true });
//     }

//     on(selector, event, handler) {

//         if (typeof this.events[selector] === 'undefined') {
//             this.events[selector] = {};
//         }

//         if (false === this.events[selector][event] instanceof Array) {
//             this.events[selector][event] = [];
//         }

//         if (typeof handler === 'function') {
//             this.events[selector][event].push(handler);
//         }
//     }
// }

// let e = new EventHandler();

// e.on('.input__btn', 'click', (e) => {
//     e.preventDefault();

//     console.log('test');
// });

let _elements = {};

window.onload = () => {
    _elements = {
        headerText: document.querySelector('.header__text'),
        contentBox: document.querySelector('.content-box'),
        tableBody: document.querySelector('.table__body'),
        table: document.querySelector('.table'),
        input: document.querySelector('.input'),
        inputField: document.querySelector('.input__field'),
        inputValue: document.querySelector('.input__value'),
        loader: document.querySelector('.loader'),
        paginationBox: document.querySelector('.pagination')
    };
}

export const elements = {
    get headerText() { return _elements.headerText || document.querySelector('.header__text') },
    get contentBox() { return _elements.contentBox || document.querySelector('.content-box') },
    get tableBody() { return _elements.tableBody || document.querySelector('.table__body') },
    get table() { return _elements.table || document.querySelector('.table') },
    get input() { return _elements.input || document.querySelector('.input') },
    get inputField() { return _elements.inputField || document.querySelector('.input__field') },
    get inputValue() { return _elements.inputValue || document.querySelector('.input__value') },
    get loader() { return _elements.loader || document.querySelector('.loader') },
    get paginationBox() { return _elements.paginationBox || document.querySelector('.pagination'); }
};

export const renderLoader = (parent) => {

    const loader = `
        <div class="loader">
            Loading<span>.</span><span>.</span><span>.</span>
        </div>
    `

    parent.insertAdjacentHTML('afterbegin', loader);
    
}
export const clearLoader = (element) => {
    const checkLoaderArray = Array.from(element.childNodes);
        for(let i of checkLoaderArray) {
            if(i.classList !== undefined && i.classList.contains('loader')) {
                element.removeChild(document.querySelector('.loader'));
            }
        }
}
export const animateRender = () => {
    elements.table.classList.remove('hidden');
    elements.paginationBox.classList.remove('hidden');
    elements.table.style.animation = 'fadeInOpacity';
    elements.headerText.style.animation = 'fadeInOpacity';
    elements.table.style.animationDuration = '2s';
    elements.headerText.style.animationDuration = '2s';
    elements.headerText.style.opacity = '1';
}

export const clearTable = () => {
    elements.table.classList.add('hidden');
    elements.paginationBox.classList.add('hidden');
    elements.tableBody.innerHTML = '';
    elements.paginationBox.innerHTML = '';
}

export const clearElementContent = (element) => {
    element.innerHTML = '';
} 


