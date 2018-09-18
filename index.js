import "@babel/polyfill";
import './sass/main.scss';

import CurrencyTable from './js/model/CurrencyTable';
import Currency from "./js/model/Currency";
import * as currencyRowView from './js/view/currencyrRowView';
import * as currencyTableView from './js/view/currencyTableView';
import * as currencyDetailsView from './js/view/currencyDetailsView';
import * as paginationView from './js/view/paginationView';
import { elements, renderLoader,clearLoader, animateRender, clearTable, clearElementContent } from './js/view/base';


    
    // API BASE URL: https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10
    // API KEY: c3b07ba3-8c3f-41aa-9f28-3a57c6735a14
    
    
    const state = {};
    
// ROUTER //

    // const root = null;
    // const useHash = true; // Defaults to: false
    // const hash = '#'; // Defaults to: '#'
    // const router = new Navigo(root, useHash, hash);

    // router
    // .on(() => {
    //     //fetch data from api to state
    //     // remove previous component if exsists
    //     // render table component in content box
        
    //     currencyTableView.renderTable(elements.contentBox);
        
    // })
    // .on({
    //     '/:id': (args) => {
    //         // remove previous component
    //         elements.contentBox.inerHTML = '';
    //         renderLoader(elements.contentBox);
    //         // render details for id
    //     }
    // })
    // .resolve();

    //-----------------------------------------------//

    // ROUTER //
    window.addEventListener('hashchange', e=>onRouteChange(e))
    
    const onRouteChange = (event) => {
        //console.log(event)
        const hash = window.location.hash.substring(1);
        //console.log(hash)
        clearElementContent(elements.contentBox)
        loadContent(hash);
    }

    const loadContent = (urlHash) => {
        if(urlHash === '' || urlHash === '/') {
            //show table component
            currencyTableView.renderTable(elements.contentBox);
            if(state.currencyTable) {
                //console.log('items list exsists');
                elements.table.classList.remove('hidden');
                tableController();
                //console.log(state.currencyTable.items)
            } else {
                fetchDataController(); 
            }
        } else {
            //get state from localStorage
            //show details component
            const lastCurr = localStorage.getItem('selectedCurrency')
            currencyDetailsHandler(lastCurr);
        }
    }
    window.addEventListener('load', e=>{
        
        fromStorage();
        const url = window.location.hash;
        loadContent(url);
    });
    // GETTING USER CURRENCY AMOUNTS FROM LOCAL STORAGE //

    const fromStorage = () => {
        if(localStorage.getItem('amounts') !== null && localStorage.getItem('amounts').length > 0) {
            
            state.storageAmounts = JSON.parse(localStorage.getItem('amounts'));
            
            // console.log(state.storageAmounts)
            // console.log(typeof state.storageAmounts)
        } else if(localStorage.getItem('amounts') === null) {
            //console.log('initialising new storage in state')
            state.storageAmounts = [];
        }
    }

    //-----------------------------------------------//

    // PAGINATION //

    const insertPagination = (numOfPages) => {
        for(let i = 1; i <= numOfPages; i++) {
            paginationView.renderPagination(i)
        }
    
        console.log(elements);
        console.log('ovo', elements.paginationBox);
        
        elements.paginationBox.addEventListener('click', e => {
            //console.log(e.target.text);
            clearTable();
            let page = ((parseInt(e.target.text) - 1) * 10) + 1;
            renderLoader(elements.contentBox);
            fetchDataController(page);
            // console.log(state.currencyTable.items);
        });
    }

    //-----------------------------------------------//

    
    // FETCH DATA //

    //todo // check why function expects event as first argument

    const fetchDataController = async(page = 1, itemsPerPage = 10) => {

        const url = `https://cors-anywhere.herokuapp.com/https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${page}&limit=${itemsPerPage}`;

        if(!state.currencyTable) {
            state.currencyTable = new CurrencyTable();
            renderLoader(elements.contentBox);
        } else {
            state.currencyTable.items = [];
        }

        await fetch(url, {
            headers: {'X-CMC_PRO_API_KEY' : 'c3b07ba3-8c3f-41aa-9f28-3a57c6735a14'}
        })
        .then(response => {
            // ovde handlovati razlicite statuse // todo
            if(response.status === 200) {
                // clear loader
                // check if loader exists before removing it // todo
                clearLoader(elements.contentBox)
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
            tableController(); 
        })
        .catch(e => console.log(e));
        setTimeout(fetchDataController, 60000);
    }

    //-----------------------------------------------//

    //window.addEventListener('load', fetchDataController);

    // FILLING THE TABLE VIEW //

    const tableController = () => {
        
        state.currencyTable.items.forEach(el => {
            //console.log(state.storageAmounts);
            if(state.storageAmounts && state.storageAmounts.length > 0) {
                // update amount from local storage if local storage exsists
                //console.log('unutra')
                const localAmount = state.storageAmounts.find(e => {
                    if(e.id === el.id) {
                        return e.id === el.id
                    }
                });
                //console.log(localAmount);
                if(localAmount !== undefined) {
                    el.setAmount(localAmount.value);
                }
                //console.log(el);
                currencyRowView.renderItem(el);
                
                if(localAmount !== undefined) {
                    // enable button
                    //console.log(el.id);
                    currencyRowView.toggleButtonEnabled(el.id);
                    
                }
            } else {
                //console.log('empty local storage')
                currencyRowView.renderItem(el);
                currencyRowView.toggleButtonDisabled(el.id);
            }
        });
        userValueBtnHandler();
        userInputFieldHandler();
        animateRender();
    }

    // input controller
    
    const handleUserInput = (id, value) => {

          // updating state
          state.currencyTable.updateItem(id, value);   
          //update view
          const currentItem = state.currencyTable.getItemForId(id);
          currencyRowView.updateUserValue(id, currentItem.userValue);

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
    const userValueBtnHandler = () => {
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
                    currencyRowView.toggleButtonDisabled(selectedRowId)
                }
    
                handleUserInput(selectedRowId, userInput);
                
            }
        });
    }

    // picking up info weather input field is empty

    const userInputFieldHandler = () => {
        elements.tableBody.addEventListener('keyup', e => {
     
            if(e.target.classList.contains('input__field')){
                
                let selectedRowId = parseInt(e.target.parentElement.parentElement.dataset.rowid, 10);
                if(e.target.value !== '') {
                    //state.currencyTable.updateItem(selectedRowId, e.target.value);
                    currencyRowView.toggleButtonEnabled(selectedRowId);
                }
            }
        });
    }
    
    // ON CURRENCY ROW CLICK HANDLER //

    const fetchDetails = async (id) => {
        renderLoader(elements.contentBox);
        const data = await (await fetch(`https://api.coinmarketcap.com/v2/ticker/${id}/`)).json();
        
        clearLoader(elements.contentBox);
        console.log(data)
        currencyDetailsView.renderDetails(data.data, elements.contentBox)
    }

    const currencyDetailsHandler = (id) => {
        // clear container
        clearElementContent(elements.contentBox)
        // get data from state
        fetchDetails(id);
    }

    document.addEventListener('click', e => {

        if(e.target.classList.contains('curr-name')) {
            let selectedCurrId = parseInt(e.target.parentElement.dataset.rowid, 10);
            localStorage.setItem('selectedCurrency', selectedCurrId);
            window.location.hash = selectedCurrId;
        }
    })


    