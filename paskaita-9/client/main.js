const form = document.getElementById('form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');

const USER_ID = '639760429f7ee04711be213c';
const BASE_URL = 'http://localhost:3000'

form.addEventListener('submit', (event) => {
    event.preventDefault();
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