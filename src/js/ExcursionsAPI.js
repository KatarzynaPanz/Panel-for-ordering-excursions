class ExcursionsAPI {
    constructor() {
        this.urlExcursions = 'http://localhost:3000/excursions';
        this.urlOrders = 'http://localhost:3000/orders';
        }

    _fetchExcursions(options) {
        return fetch(this.urlExcursions, options)
        .then(resp => {
        if(resp.ok) { return resp.json(); }
        return Promise.reject(resp);
        });
    }

    _fetchOrders(options) {
        return fetch(this.urlOrders, options)
        .then(resp => {
        if(resp.ok) { return resp.json(); }
        return Promise.reject(resp);
        });
    }

    loadExcursionsData() {
            return this._fetchExcursions();
    }

    addExcursionsData(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {'Content-Type': 'application/json'}
        };
        return this._fetchExcursions(options);
    }

    _fetch(options, additionalPath = '') {
        const url = this.urlExcursions + additionalPath;
        return fetch(url, options) 
        .then(resp => {
            if(resp.ok) { return resp.json(); }
            return Promise.reject(resp);
            });
    }
    
    removeExcursionsData(id) {
        const options = { method: 'DELETE' };
        return this._fetch(options, `/${id}`);
    }

    updateExcursionsData(id, data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify( data ),
            headers: { 'Content-Type': 'application/json' }
        };
        return this._fetch(options, `/${id}`);
    }

    postOrderSummary(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {'Content-Type': 'application/json'}
        };
        return this._fetchOrders(options);
    }
}

export default ExcursionsAPI;