import { elements } from './base';

export const renderPagination = page => {
    const markup = `
        <a href="#">${page}</a>
    `;
    elements.paginationBox.insertAdjacentHTML('beforeend', markup);
}