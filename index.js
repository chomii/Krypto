import "@babel/polyfill";
import './sass/main.scss';

import CurrencyTable from './js/model/CurrencyTable';
import * as currencyTableView from './js/view/currencyTableView';
import { elements } from './js/view/base';
import Currency from "./js/model/Currency";
    
    
    // API BASE URL: https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?
    // API KEY: c3b07ba3-8c3f-41aa-9f28-3a57c6735a14
    
    
    // state of the currency table
    
    const state = {};
    
    // table controller
    
    const fetchDataController = async () => {
    
        if(!state.currencyTable) {
            state.currencyTable = new CurrencyTable();
        }
            
            await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {'X-CMC_PRO_API_KEY' : 'c3b07ba3-8c3f-41aa-9f28-3a57c6735a14'}
            })
            .then(response => response.json())
            .then(data => {
                data.data.forEach(el => {
                    const item = new Currency(el.id, el.name, el.symbol, el.quote.USD.price, el.quote.USD.percent_change_24h);
                    state.currencyTable.addItem(item);
                })
            })
            .catch(e => console.log(e));

            //rendering currency list
            state.currencyTable.items.forEach(el => currencyTableView.renderItem(el));
            
    }
    window.addEventListener('load', fetchDataController);

    // input controller

    
    elements.tableBody.addEventListener('click', e => {

        if(e.target.classList.contains('input__btn')){

            let userInput = parseInt(e.target.previousElementSibling.value, 10);
            let selectedRowId = parseInt(e.target.parentElement.parentElement.dataset.rowid, 10);
            if(userInput > 0) {
                // updating state
                state.currencyTable.updateItem(selectedRowId, userInput);   
                //update view
                currencyTableView.updateUserValue(selectedRowId, state.currencyTable.items[selectedRowId - 1].userValue);
            }
            // console.log(state.currencyTable.items[selectedRowId - 1]);
        }
    });
    // selectedCurrency = state.currencyTable.items.filter(el => {
            //     return el.id === selectedRowId;
            // }, )
            //selectedCurrency.setAmount(userInput);


    // elements.tableBody.addEventListener('keydown', e => {
    //     if(e.keyCode === 13 || e.which === 13) {
    //         console.log()
    //     }
    // })


    