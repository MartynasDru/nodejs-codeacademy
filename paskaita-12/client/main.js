const form = document.getElementById('form');
const editForm = document.getElementById('edit-form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');
const advertsOutput = document.getElementById('adverts');
const editFormOutput = document.getElementById('edit-form-output');
const editBrandInput = document.getElementById('edit-brand-input');
const editModelInput = document.getElementById('edit-model-input');
const editPriceInput = document.getElementById('edit-price-input');
const cancelEditFormButton = document.getElementById('cancel-edit-button');

const USER_ID = '639760429f7ee04711be213c';
const BASE_URL = 'http://localhost:3000';

let editAdvertId;

editForm.classList.add('hidden');

editForm.addEventListener('submit', () => {
    const updatedAdvert = {
        brand: editBrandInput.value,
        model: editModelInput.value,
        price: editPriceInput.value
    };

    fetch(BASE_URL + '/adverts/' + editAdvertId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAdvert)
    });
});

form.addEventListener('submit', (event) => {
    const brand = brandInput.value;
    const model = modelInput.value;
    const price = priceInput.value;

    const newAdvert = {
        brand,
        model,
        price,
        user_id: USER_ID
    };

    fetch(BASE_URL + '/adverts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdvert)
    });
});

cancelEditFormButton.addEventListener('click', (req, res) => {
    editForm.classList.add('hidden');
    editBrandInput.value = '';
    editModelInput.value = '';
    editPriceInput.value = '';
});

fetch(BASE_URL + '/adverts')
    .then((res) => res.json())
    .then((adverts) => {
        adverts.forEach((advert) => createAdvertCard(advert));
    });

function createAdvertCard(advert) {
    const advertCard = document.createElement('div');
    advertCard.classList.add('advert-card');
    
    const advertBrand = document.createElement('h3');
    advertBrand.textContent = advert.brand;

    const advertModel = document.createElement('p');
    advertModel.textContent = advert.model;

    const advertPrice = document.createElement('p');
    advertPrice.textContent = advert.price;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.classList.add('delete-button');

    deleteButton.addEventListener('click', () => {
        fetch(BASE_URL + '/adverts/' + advert._id, {
            method: 'DELETE'
        })
        .then(() => window.location.reload());
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.classList.add('edit-button');
    editButton.style.marginLeft = '10px';

    editButton.addEventListener('click', () => {
        editForm.classList.remove('hidden');
        
        editBrandInput.value = advert.brand;
        editModelInput.value = advert.model;
        editPriceInput.value = advert.price;

        editAdvertId = advert._id;
    });

    advertCard.appendChild(advertBrand);
    advertCard.appendChild(advertModel);
    advertCard.appendChild(advertPrice);
    advertCard.appendChild(deleteButton);
    advertCard.appendChild(editButton);

    advertsOutput.appendChild(advertCard);
}