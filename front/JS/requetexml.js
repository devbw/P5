/*Récupération de l'url*/
const url = 'http://localhost:3000/api/cameras';

/*Appel de l'API avec fetch*/
const getProduct = async function () {
    let response = await fetch(url)
/*Récupération du resultat en JSON*/
    let data = await response.json()
/*Création des éléments de manière dynamique grâce à une boucle forEach*/   
    data.forEach(function(element){
        let carte = document.createElement('div')
        carte.classList.add('card', 'mx-auto', 'mt-5', 'shadow');
        carte.style.width = "30rem";
        let main = document.querySelector('#cartes');
        main.appendChild(carte);
        let image = document.createElement('img');
        image.classList.add('card-img-top');
        image.src = element.imageUrl;
        carte.appendChild(image);
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        carte.appendChild(cardBody);
        let name = document.createElement('h4');
        name.classList.add('card-title', 'text-center');
        name.textContent = element.name;
        cardBody.appendChild(name);
        let description = document.createElement('div');
        description.classList.add('card-text', 'text-center');
        description.textContent = element.description;
        cardBody.appendChild(description);
        let price = document.createElement('h5');
        price.classList.add('card-text','text-center');
        price.style.marginTop = '10px';
        element.price = (element.price-(element.price%100))/100;
        price.textContent = element.price + ' €';
        cardBody.appendChild(price);
        let button = document.createElement('div');
        /*Insertion de l'ID dans l'url pour renvoyer dynamiquement l'ID produit sur la page produit*/
        button.innerHTML = `<a href="HTML/produit.html?id=${element._id}"><button class="btn btn-outline-primary d-block mt-3 mx-auto px-4">Voir</button></a>`;
        cardBody.appendChild(button);
    });
}
/*Appel de la fonction getProduct*/
getProduct();