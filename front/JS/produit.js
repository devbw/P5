/*Création d'un constructeur d'item qui servira pour la création des produits à mettre dans le localStorage*/
class Item{
    constructor (id,nom, img, prix){
        this.id = id;
        this.nom = nom;
        this.img = img;
        this.prix = prix;
    }
}
/*Récupération de l'url selon l'ID produit*/
let urlParams = new URLSearchParams(window.location.search)
const url = 'http://localhost:3000/api/cameras/' + urlParams.get('id');

/*Création de la fonction qui se chargera d'afficher dynamiquement le produit selon l'ID récupéré*/
const getProduct = async function () {
    let response = await fetch(url) /* Appel de l'url qui contient l'identifiant du produit*/
    let data = await response.json()

    let crea = document.getElementById('crea'); 
    crea.classList.add('card', 'mx-auto', 'mt-5', 'shadow');
    crea.style.width = "80%";
    let image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = data.imageUrl;
    crea.appendChild(image);
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    crea.appendChild(cardBody);
    let name = document.createElement('h4');
    name.classList.add('card-title', 'text-center');
    name.textContent = data.name;
    cardBody.appendChild(name);
    let description = document.createElement('div');
    description.classList.add('card-text', 'text-center');
    description.textContent = data.description;
    cardBody.appendChild(description);
    let price = document.createElement('h5');
    price.classList.add('card-text','text-center');
    price.style.marginTop = '10px';
    data.price = (data.price-(data.price%100))/100;
    price.textContent = data.price + ' €';
    cardBody.appendChild(price);
    let button = document.createElement('div');
    button.innerHTML = `<a href="../HTML/panier.html"><button class="btn btn-outline-success d-block mt-3 mx-auto px-4">Ajouter au panier</button></a>`;
    cardBody.appendChild(button);
/*Création du bouton qui permet de sauvegarder le produit dans le localStorage*/
    button.addEventListener('click', () => {
        if(!localStorage.getItem('panier')) {
            localStorage.setItem('panier', '[]');
        }
        let panier = JSON.parse(localStorage.getItem('panier'));
        let produit = new Item(data._id, data.name, data.imageUrl, data.price);
        panier.push(produit);
        localStorage.setItem('panier', JSON.stringify(panier));
    });

    let form = document.createElement('select');
    form.classList.add("form-control");
    form.style.marginTop = '10px';
    description.appendChild(form);
    data.lenses.forEach(element => {
        let buttonRadio = document.createElement('option');
        buttonRadio.textContent = element;
        form.appendChild(buttonRadio);
    });
}
/*Appel de la fonction getProduct*/
getProduct();