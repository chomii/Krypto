import { elements } from "./view/base";
import * as currencyTableView from './view/currencyTableView';

export class Router {
    constructor() {
        window.addEventListener('hashchange', e=>this.onRouteChange(e))
    }

    onRouteChange() {
        const hash = window.location.hash.substring(1);
        
        this.loadContent(hash);
    }

    loadContent(url) {
        if(url) {
            //show details component
            elements.contentBox.innerHTML = '';
            console.log(parseInt(url));
        } else if(url === '' || url === '/') {
            //show table component
            console.log('root');
            elements.contentBox.innerHTML = '';
            currencyTableView.renderTable(elements.contentBox);
        }
    }
    
}