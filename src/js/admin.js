import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

const api = new ExcursionsAPI();

console.log('admin');

document.addEventListener('DOMContentLoaded', init);
function init() {
 console.log('DOM');
 loadExcursions();
 removeExcursions();
 addExcursions();
 updateExcursions();
}

function loadExcursions() {
    api.loadExcursionsData()
        .then(data => {insertExcursions(data)})
        .catch(err => console.error(err))
}

function cloneElement(item) {
    const clonedElement = item.cloneNode(true);
    clonedElement.classList.remove('excursions__item--prototype');
    clonedElement.classList.add('excursions__item');
    return clonedElement;
}

const liEl = document.querySelector('.excursions__item--prototype');

function insertExcursions(excursionsArr) {
    const ulEl = document.querySelector('.excursions');
    ulEl.innerHTML = '';
    excursionsArr.forEach(item => {
        const clonedLiEl = cloneElement(liEl);
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
function addExcursions() {
    const formEl  = document.querySelector('.form');
    formEl.addEventListener('submit', e => {
        e.preventDefault();
        const nameEl = formEl.querySelector('input[name="name"]');
        const descriptionEl = formEl.querySelector('textarea');
        const adultPriceEl = formEl.querySelector('input[name="adultPrice"]');
        const childPriceEl = formEl.querySelector('input[name="childPrice"]');
        const {direction, description, adultPrice, childPrice} = e.target.elements;
        const data = {
            direction: nameEl.value, description: descriptionEl.value, adultPrice: adultPriceEl.value, childPrice: childPriceEl.value};
        
        api.addExcursionsData(data)
        .catch(err => console.error(err))
        .finally( loadExcursions );
           
    });
}

function removeExcursions() {
    const ulEl = document.querySelector('.excursions');
    ulEl.addEventListener('submit', e => {
        e.preventDefault();
        if(e.submitter.classList.contains("excursions__field-input--remove")){
            const id = e.target.parentElement.dataset.id;
            api.removeExcursionsData(id)
                .catch(err => console.error(err))
                .finally( loadExcursions );
        }
    });
}

function findDataToUpdate(array) {
    const data = {
    direction: array[0].innerText,
    description: array[1].innerText,
    adultPrice: array[2].innerText,
    childPrice: array[3].innerText,
    }
    return data;
}

function updateExcursions() {
    const ulEl = document.querySelector('.excursions');
    ulEl.addEventListener('submit', e => {
        e.preventDefault();
        const excursionsElementList = e.target.parentElement.querySelectorAll('.excursions_element');
        if(e.submitter.classList.contains("excursions__field-input--update")) {      
            const isEditable = [...excursionsElementList].every(element => element.isContentEditable);
                if(!isEditable){
                    e.submitter.value = "zapisz";
                    excursionsElementList.forEach(element => element.contentEditable = true);
                }
                else if(isEditable) {
                    const id = e.target.parentElement.dataset.id;
                    const data = findDataToUpdate(excursionsElementList);
            api.updateExcursionsData(id, data)
                .catch(err => console.error(err))
                .finally( () => {
                    e.submitter.value = "edytuj";
                    excursionsElementList.forEach(element => element.contentEditable = false);
                });
            }
        }
    });
}