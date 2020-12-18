/*Execution des fonctions*/
window.onload = function() {
    printTotalPrice();
    printOrderId();
}
/*Création de la fonction qui va afficher le prix total payé*/
function printTotalPrice() {
    let totalPrice = document.querySelector('#totalPrice');
    let totalPriceCameras = JSON.parse(localStorage.getItem('totalPriceCameras'));
    console.log(totalPriceCameras);
    totalPrice.innerHTML =  'Le montant total payé est de : ' + totalPriceCameras + ' €';
}

/*Création de la fonction qui va afficher le orderID*/
function printOrderId() {
    let orderId = localStorage.getItem('orderID');
    let orderNumber = document.querySelector('#orderNumber');
    orderNumber.textContent = 'Votre numéro de commande est : ' + orderId;
}

/*Création de l'évènement du bouton pour retourner sur la page d'accueil*/
let returnSite = document.querySelector('#returnSite');
returnSite.addEventListener('click', () => {
    window.location.replace("../index.html");
    localStorage.clear();
})
