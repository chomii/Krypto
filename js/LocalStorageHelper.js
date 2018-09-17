
export default class LocalStorageHelper {
    constructor() {
        this.storage = {}
    }

    getStorage(name) {
        this.storage = JSON.parse(localStorage.getItem(name));
        return this.storage;
        
    }

    addToStorage(name, data) {
        //console.log(name)
        const dataToSave = [];
        dataToSave.push(data)
        localStorage.setItem(name, JSON.stringify(dataToSave));
        //console.log(this.storage)
    }

    getItemFromStorage(name) {

    }

    deleteItemFromStorage(name) {
        
    }

}