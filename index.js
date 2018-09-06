import "@babel/polyfill";
import './sass/main.scss';

import CurrencyTable from './js/model/CurrencyTable';
import * as currencyTableView from './js/view/currencyTableView';
import { elements, renderLoader, animateRender } from './js/view/base';
import Currency from "./js/model/Currency";
    
    
    // API BASE URL: https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?
    // API KEY: c3b07ba3-8c3f-41aa-9f28-3a57c6735a14
    
    
    // state of the currency table
    
    const state = {};
    
    
    if(localStorage.getItem('amounts') !== null && localStorage.getItem('amounts').length > 0) {
        //console.log('locale storage exists')
        state.storageAmounts = JSON.parse(localStorage.getItem('amounts'));
        //console.log(typeof state.storageAmounts)
    } else if(localStorage.getItem('amounts') === null) {
        //console.log('initialising new storage in state')
        state.storageAmounts = [];
    }
    
    // fetching data
    const fetchDataController = async() => {

        if(!state.currencyTable) {
            state.currencyTable = new CurrencyTable();
            renderLoader(elements.tableBox);
        }

            await fetch('https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10', {
                headers: {'X-CMC_PRO_API_KEY' : 'c3b07ba3-8c3f-41aa-9f28-3a57c6735a14'}
            })
            .then(response => {
                // ovde handlovati razlicite statuse // todo
                if(response.status === 200) {
                    // clear loader
                    // check if loader exists before removing it // todo
                    const checkLoaderArray = Array.from(elements.tableBox.childNodes);
                    //console.log(checkLoaderArray)
                    for(let i of checkLoaderArray) {
                        if(i.classList !== undefined && i.classList.contains('loader')) {
                            //console.log(i.classList.contains('loader'))
                            elements.tableBox.removeChild(document.querySelector('.loader'));
                        }
                    }
                    
                    return response.json();
                } else {
                    alert(response.statusText);
                }
                
            })
            .then(data => {
                data.data.forEach(el => {
                    const item = new Currency(el);
                    state.currencyTable.addItem(item);
                })
                // show header and table
                animateRender();
            })
            .catch(e => console.log(e));

            tableController();

            setTimeout(fetchDataController, 60000);
    }
    window.addEventListener('load', fetchDataController);

    const user = {
        username: 'coa'
    };

    // populating table

    const tableController = () => {

        state.currencyTable.items.forEach(el => {
            
            if(state.storageAmounts && state.storageAmounts.length > 0) {
                // update amount from local storage if local storage exsists
                const localAmount = state.storageAmounts.find(e => e.id === el.id);
                //console.log(localAmount);
                if(localAmount !== undefined) {
                    el.setAmount(localAmount.value);
                }
                
                currencyTableView.renderItem(el);

                if(localAmount !== undefined) {
                    // enable button
                    currencyTableView.toggleButtonEnabled(el.id);
                    
                }
            } else {
                //console.log('empty local storage')
                currencyTableView.renderItem(el);
                currencyTableView.toggleButtonDisabled(el.id);
            }
        });
    }

    // input controller
    
    const handleUserInput = (id, value) => {

          // updating state
          
          state.currencyTable.updateItem(id, value);   
          //update view
          const currentItem = state.currencyTable.getItemForId(id);
          currencyTableView.updateUserValue(id, currentItem.userValue);

          // save amount to local storage
          handleLocalStorage(id, value);
    }

    
    const handleLocalStorage = (id, value) => {

        // 1. check if element with that id exsists in localStorage
        // 2. if exsists then update new value
        // 3. if value is '' or 0 or null then remove it from localStorage
        
        const newStorageAmounts = state.storageAmounts;
            
        if(newStorageAmounts.length > 0) {
          
          const indexToUpdate = newStorageAmounts.findIndex(el => {
              return el.id === id;
          })
          
          if(indexToUpdate !== -1) {
            
              if(value === 0 || value === '' || value === null || isNaN(value)) {
                  newStorageAmounts.splice(indexToUpdate, 1);
              } else {
                  newStorageAmounts[indexToUpdate].value = value;
              }
          } else {
              newStorageAmounts.push({id : id, value : value});
          }
        } else {
          newStorageAmounts.push({id : id, value : value});
        }

        localStorage.setItem('amounts', JSON.stringify(newStorageAmounts));
    }

    //handling onButtonClick through event delegation

    elements.tableBody.addEventListener('click', e => { 

        if(e.target.classList.contains('input__btn')){
            
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

    // picking up info weather input field is empty
    elements.tableBody.addEventListener('keyup', e => {
 
        if(e.target.classList.contains('input__field')){
            
            let selectedRowId = parseInt(e.target.parentElement.parentElement.dataset.rowid, 10);
            if(e.target.value !== '') {
                //state.currencyTable.updateItem(selectedRowId, e.target.value);
                currencyTableView.toggleButtonEnabled(selectedRowId);
            }
        }
    });
    

    