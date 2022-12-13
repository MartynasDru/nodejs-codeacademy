const form = document.getElementById('form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');
const advertsOutput = document.getElementById('adverts');

const USER_ID = '639760429f7ee04711be213c';
const BASE_URL = 'http://localhost:3000';

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

fetch(BASE_URL + '/adverts')
    .then((res) => res.json())
    .then((adverts) => {
        adverts.forEach((advert) => {
            const advertCard = document.createElement('div');
            advertCard.classList.add('advert-card');
            
            const advertBrand = document.createElement('h3');
            advertBrand.textContent = advert.brand;

            const advertModel = document.createElement('p');
            advertModel.textContent = advert.model;

            const advertPrice = document.createElement('p');
            advertPrice.textContent = advert.price;

            advertCard.appendChild(advertBrand);
            advertCard.appendChild(advertModel);
            advertCard.appendChild(advertPrice);

            advertsOutput.appendChild(advertCard);
        });
    });