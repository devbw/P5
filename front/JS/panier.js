////////////////////////////////////////////* Création de la fonction qui permet d'afficher les éléments du localStorage*////////////////////////////////////////////
function printElement() {
    let items = JSON.parse(localStorage.getItem('panier')); /*Récupération des données du localStorage*/ 
    if(items == null){
        items = [];
    }
    items.forEach(function(element){ /*Affichage des produits grâce au données du localStorage*/ 
        let produits = document.getElementById('produits');
        let carte = document.createElement('div');
        carte.classList.add('card', 'mx-auto', 'mt-5', 'shadow');
        carte.style.width = "250px";
        produits.appendChild(carte);
        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = element.img;
        carte.appendChild(img);
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        carte.appendChild(cardBody);
        let id = document.createElement('h6');
        id.classList.add('card-title', 'text-center');
        id.textContent = element.id;
        id.style.fontSize = '0.7em';
        cardBody.appendChild(id);
        let nom = document.createElement('h6');
        nom.innerHTML = element.nom;
        nom.classList.add('card-text', 'text-center');
        nom.style.marginTop = '8px';
        cardBody.appendChild(nom);
        let prix = document.createElement('h6');
        prix.textContent = element.prix + " €";
        prix.classList.add('card-text', 'text-center');
        cardBody.appendChild(prix);
    });
    calcPrice(items);
}
printElement(); /*Appel de la fonction pour afficher les éléments*/

/////////////////////////////////////////////*Création du bouton de paiement*/////////////////////////////////////////////
let pay = document.querySelector('#formulaire');

function createButtonPrice() {
    let payButton = document.createElement('div');
    payButton.innerHTML = '<button id="payer" type="submit" class="btn btn-primary">Payer</button>';
    pay.appendChild(payButton);
}

createButtonPrice();

////////////////////////////////////////////*Création de la fonction de calcul du prix total des caméras*///////////////////////////////////////
function calcPrice(items) {
    let total = 0;
    for(let i = 0; i < items.length; i++) {
        total += items[i].prix;
    }
    document.getElementById('montant').textContent = 'Prix total : ' + total + ' €';
    localStorage.setItem('totalPriceCameras', JSON.stringify(total));
}
/////////////////////////////////////////////*Création de la fonction pour vider le panier*/////////////////////////////////////////////
let basket = document.getElementById('vider');

function clearBasket() {
    localStorage.clear(); 
    document.getElementById('produits').innerHTML = " ";
    document.getElementById('montant').textContent = 'Prix total : ' + '0' + ' €'; 
}

basket.addEventListener('click', () => {
    clearBasket();
})
/////////////////////////////////////////////*Création de la fonction pour récupérer les ID des caméras*/////////////////////////////////////////////
function retrieveIds(items) {
    let products = [];
    for(let i = 0; i < items.length; i++) {
        products.push(items[i].id);
    }
    return products;
}  
//////////////////////////////////////////////*Création de la requête POST pour envoyer l'objet contact et le tableau products au serveur*//////////////////////////////////////////////
const sendOrder = async function(products, contact) {
    let response = await fetch('http://localhost:3000/api/cameras/order', {
        method  : "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body    : JSON.stringify({products, contact})
    }) 
    let responseSendOrder = await response.json(); /* Récupération de la réponse du serveur*/
    console.log(responseSendOrder.orderId);
    let orderID = responseSendOrder.orderId; /*Isolation de l'id de la commande*/
    localStorage.setItem('orderID', orderID); /*Enregistrement dans le localStorage de l'id de commande*/
    window.location.replace("../HTML/confirmation.html");/*redirection vers la page de confirmation de commande*/
}
//////////////////////////////////////////////*Ecoute de l'évènement du bouton payer du fichier HTML qui récupèrera les données du formulaire et déclenchera la requête POST*//////////////////////////////////////////////
pay.addEventListener('submit', (e) => {
    e.preventDefault();
    let contact = { /*Création de l'objet contact qui récupère les valeurs des champs du formulaire*/
        firstName: document.getElementById("prenom").value,
        lastName : document.getElementById("nom").value,
        address  : document.getElementById("adresse").value,
        city     : document.getElementById("ville").value,
        email    : document.getElementById("inputMail").value
    };
    console.log(contact);

    let items = JSON.parse(localStorage.getItem('panier'));
    let products = retrieveIds(items);
    console.log(products);
    sendOrder(products, contact);
})