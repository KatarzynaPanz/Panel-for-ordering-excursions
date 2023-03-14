import './../css/client.css';

import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();

console.log('client');

const apiUrlOrders = 'http://localhost:3000/orders';

document.addEventListener('DOMContentLoaded', init);
function init() {
 console.log('DOM');
 loadExcursions();
 chooseExcursion();
 removeChosenExcursion();
 checkPanelOrderData();
}

function cloneLiElement(item) {
    const clonedLiEl = item.cloneNode(true);
    clonedLiEl.classList.remove('excursions__item--prototype');
    clonedLiEl.classList.add('excursions__item');
    return clonedLiEl;
}

function cloneLiSummaryElement(item) {
    const clonedLiSummaryEl = item.cloneNode(true);
    clonedLiSummaryEl.classList.remove('summary__item--prototype');
    clonedLiSummaryEl.classList.add('summary__item');
    return clonedLiSummaryEl;
}

function loadExcursions() {
    api.loadExcursionsData()
        .then(data => {insertExcursions(data)})
        .catch(err => console.error(err))
    }


function createNewUlElement() {
    const panelEl = document.querySelector('.panel');
    const newUlEl = document.createElement('ul');
    newUlEl.classList.add('messages');
    const bodyEl = document.querySelector('body');
    bodyEl.insertBefore(newUlEl, panelEl);
    return newUlEl;
}
    
function createNewLiElement(ulElement, item) {
    const newLiEl = document.createElement('li');
    newLiEl.innerText = item;
    ulElement.appendChild( newLiEl );
    return newLiEl;
}
    
function showMessage(elems) {
    const newUlElement = createNewUlElement();
    elems.forEach(function(item){
        const newLiEl = createNewLiElement(newUlElement, item);
    });
}
    
function removeMessage() {
    const ulEl = document.querySelector('.messages');
    const bodyEl = document.querySelector('body');
    if(ulEl){
        bodyEl.removeChild(ulEl);
    }
}

const liEl = document.querySelector('.excursions__item--prototype');

function insertExcursions(excursionsArr) {
    const ulEl = document.querySelector('.excursions');
    ulEl.innerHTML = '';
    excursionsArr.forEach(item => {
        const clonedLiEl = cloneLiElement(liEl);
        clonedLiEl.dataset.id = item.id;
        const h2El = clonedLiEl.querySelector('.excursions__title');
        const pEl = clonedLiEl.querySelector('.excursions__description');
        const excursionPriceEls = clonedLiEl.querySelectorAll('.excursion__price');
        h2El.innerText = item.direction;
        pEl.innerText = item.description;
        excursionPriceEls[0].innerText = item.adultPrice;
        excursionPriceEls[1].innerText = item.childPrice;
        ulEl.appendChild(clonedLiEl);
    });
}

function chooseExcursion() {
    const ulEl = document.querySelector('.excursions');
    ulEl.addEventListener('submit', e => {
        e.preventDefault();
        const h2El = e.target.parentElement.querySelector('.excursions__title');
        const excursionPriceEls = e.target.parentElement.querySelectorAll('.excursion__price');
        const formEl = e.target.parentElement.querySelector('.excursions__form');
        const adultsEl = formEl.querySelector('input[name="adults"]');
        const childrenEl = formEl.querySelector('input[name="children"]');
        removeMessage();
        let errors = [];
        errors = checkExcursionFormData (adultsEl.value, childrenEl.value);
        if(errors.length > 0){
            showMessage(errors);
        }
        else {
            insertSummaries(h2El.innerText, adultsEl.value, childrenEl.value, excursionPriceEls[0].innerText, excursionPriceEls[1].innerText);
        }
    });        
}

const liSummaryEl = document.querySelector('.summary__item--prototype');

function insertSummaries(element1, element2, element3, element4, element5) {    
    const ulSummaryEl = document.querySelector('.summary');
    const clonedLiSummaryEl = cloneLiSummaryElement(liSummaryEl);
    const spanEl = clonedLiSummaryEl.querySelector('.summary__name');
    spanEl.innerText = element1;
    const summaryPricesEl = clonedLiSummaryEl.querySelector('.summary__prices');
    summaryPricesEl.innerText = `dorośli: ${element2} x ${element4} PLN, dzieci: ${element3} x ${element5}PLN`;
    let summaryTotalPriceEl = clonedLiSummaryEl.querySelector('.summary__total-price');
    summaryTotalPriceEl.innerText = (element2*element4) + (element3*element5);
    ulSummaryEl.appendChild(clonedLiSummaryEl);
    createOrderTotalPrice();
}

function removeChosenExcursion() {
    const ulSummaryEl = document.querySelector('.summary');
    ulSummaryEl.addEventListener('click', e => {
        e.preventDefault();
            const h3El = e.target.parentElement;
            const liEl = h3El.parentElement;
            const ulEl = liEl.parentElement;
            ulEl.removeChild(liEl);
            createOrderTotalPrice();
    });
}

function createOrderTotalPrice() {
    const orderTotalPriceEl = document.querySelector('.order__total-price-value');
    const panelSummary = document.querySelector('.summary');
    const summaryTotalPrices = panelSummary.querySelectorAll('.summary__total-price');
    let sum = 0;
    summaryTotalPrices.forEach(function(item, index){
        if(index > 0){
        sum += parseInt(item.innerText);
        }   
    });
    orderTotalPriceEl.innerText = `${sum}PLN`;
}

function checkExcursionFormData (firstNumber, secondNumber) {
    const errors = [];
    const regFirstNumber = /^[0-9]+$/;
    if(!regFirstNumber.test(firstNumber)){
        errors.push('Pole "Dorosły" musi zawierać liczbę!');
    }
    const regSecondNumber = /^[0-9]+$/;
    if(!regSecondNumber.test(secondNumber)){
        errors.push('Pole "Dziecko" musi zawierać liczbę!');
    }
    return errors;
}

function checkPanelOrderData() {
    const panelOrderEl = document.querySelector('.order');
    panelOrderEl.addEventListener('submit', e => {
        e.preventDefault();
            removeMessage();
            let errors = [];
            errors = validatePanelOrderForm(e.target.elements);
            if(errors.length > 0) {
                showMessage(errors);
            }
            else {
                sendOrder();
            }
    });
}

function sendOrder() {
    const panelFormEl = document.querySelector('.panel__form');
    panelFormEl.addEventListener('submit', e => {
        const orderTotalPrice = e.target.querySelector('.order__total-price-value');
        const orderFieldName = e.target.querySelector('input[name="name"]');
        const orderFieldEmail = e.target.querySelector('input[name="email"]');
        const summaryLiEls = e.target.nextElementSibling.querySelectorAll('.summary__item');
        let direction = 0;
        let totalPrice = 0;
        let summaryPrices = 0;
        let data = 0;
        data = {orderData: [{orderTotalPrice: orderTotalPrice.innerText, clientName: orderFieldName.value, clientEmail: orderFieldEmail.value}], 
                orderedExcursions: []};
        summaryLiEls.forEach((item, index) => {
            const summaryNameEl = item.querySelector('.summary__name');
            const summaryTotalPriceEl = item.querySelector('.summary__total-price');
            const summaryPricesEl = item.querySelector('.summary__prices');
            if(index > 0){
                direction = summaryNameEl.innerText;
                totalPrice = summaryTotalPriceEl.innerText;
                summaryPrices = summaryPricesEl.innerText;
                data.orderedExcursions[index-1] = {direction: summaryNameEl.innerText, totalPrice: summaryTotalPriceEl.innerText, summaryPrices: summaryPricesEl.innerText };
            }
        });
        api.postOrderSummary(data)
            .catch(err => console.error(err))
            .catch(err => console.error(err))
            .finally( alert(`Dziękujemy za złożenie zamówienia!`));        
    });
}

function validatePanelOrderForm(els) {
    const errors = [];
    if(els.name.value.length === 0) {
        errors.push('Pole "Imię i nazwisko" jest wymagane!');
        }
    const regName = /^[a-zA-ZąćężźłóńśĄĆĘŻŹŁÓŃŚ \-]+$/;
    if(!regName.test(els.name.value)){
        errors.push('Pole imię i nazwisko może zawierać tylko litery i "-"!');
    }
    if(!els.email.value.includes('@')) {
        errors.push('Email musi zawierać znak "@"!')
    }
    return errors;
}

