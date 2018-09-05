import "@babel/polyfill";
import './sass/main.scss';

import CurrencyTable from './js/model/CurrencyTable';
import * as currencyTableView from './js/view/currencyTableView';
import { elements, renderLoader, clearLoader } from './js/view/base';
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
            renderLoader(elements.tableBox);
            await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
                headers: {'X-CMC_PRO_API_KEY' : 'c3b07ba3-8c3f-41aa-9f28-3a57c6735a14'}
            })
            .then(response => {
                // ovde handlovati razlicite statuse // todo
                if(response.status === 200) {
                    // clear loader
                    elements.tableBox.removeChild(document.querySelector('.loader'));
                    return response.json();
                } else {
                    alert(response.statusText);
                }
                
            })
            .then(data => {
                console.log(data);
                data.data.forEach(el => {
                    const item = new Currency(el.id, el.name, el.symbol, el.quote.USD.price, el.quote.USD.percent_change_24h);
                    state.currencyTable.addItem(item);
                    // console.log(item);
                })
                elements.table.classList.remove('table-hidden');
            })
            .catch(e => console.log(e));

            
            const keys = JSON.parse(localStorage.getItem('amounts'))
            
            state.currencyTable.items.forEach(el => {
            
                // update amount from local storage
                const localAmount = keys.find(e => e.id === el.id);
                if(localAmount !== undefined) {
                    el.setAmount(localAmount.value);
                    //console.log(el)
                    
                }
                
                currencyTableView.renderItem(el);

                
                if(localAmount !== undefined) {

                    // enable button
                    currencyTableView.toggleButtonEnabled(el.id);
                    
                }
                
            });
            setTimeout(fetchDataController, 60000);
    }
    window.addEventListener('load', fetchDataController);


    // input controller
    const amounts = [];
    const handleUserInput = (id, value) => {

          // updating state
          
          state.currencyTable.updateItem(id, value);   
          //update view
          const currentItem = state.currencyTable.getItemForId(id);
          currencyTableView.updateUserValue(id, currentItem.userValue);

          // save amount to local storage
          let amount = {
              id : id,
              value : value
          };
          
          amounts.push(amount)
          localStorage.setItem('amounts', JSON.stringify(amounts));
          //console.log(amounts);
    }
    elements.tableBody.addEventListener('click', e => {

        if(e.target.classList.contains('input__btn')){
            //console.log();
            let userInput;
            if(isNaN(e.target.previousElementSibling.value)) {
                userInput = ''
                
            } else {
                userInput = parseFloat(e.target.previousElementSibling.value);
            }
            
            
            let selectedRowId = parseInt(e.target.parentElement.parentElement.dataset.rowid, 10);
            if(e.target.previousElementSibling.value === '') {
                currencyTableView.toggleButtonDisabled(selectedRowId)
            }

            handleUserInput(selectedRowId, userInput);
            
        }
    });
    elements.tableBody.addEventListener('keyup', e => {
 
        if(e.target.classList.contains('input__field')){
            
            let selectedRowId = parseInt(e.target.parentElement.parentElement.dataset.rowid, 10);
            if(e.target.value !== '') {
                //state.currencyTable.updateItem(selectedRowId, e.target.value);
                currencyTableView.toggleButtonEnabled(selectedRowId);
            }
        }
    });
    

    