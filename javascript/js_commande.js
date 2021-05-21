//création de la variable products
let arrayTeddy = JSON.parse(localStorage.getItem("monPanier"));
let products = [];
for (i = 0; i < arrayTeddy.length; i++) {
    let idTeddy = arrayTeddy[i].id;
    products.push(idTeddy);
}
//variable parsée du panier et récupératin dans une variable des données client
let clientArray = JSON.parse(localStorage.getItem("monClient"));
let contact = clientArray[0];

//variable pour le prix total
let prixTotal = JSON.parse(localStorage.getItem("montant"));
console.log(prixTotal[0]);

//création des variables en dehors de la fonction pour le code html
let refcommande = "";
let refco_one = "";
let refco_two = "";

//fonction pour envoyer les données du panier et du formulaire et recevoir la réponse de l'API
async function fetchCommand() {
    const response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contact, products }),
    });
    //constante represantant les ids des teddies, la référence de commande et les coordonnées du client
    const data = await response.json();

    //création des variables afin d'avoir un code html modifiable selon les données
    let listProducts = data.products;
    let client = data.contact;

    // création du code html à insérer
    refco_one = `
    <p class="thanks">Merci <span class="name">${client.firstName} ${client.lastName}</span>,</p>
    <p class="reference">Votre commande <span class="name">${data.orderId}</span> a été enregistrée. Son montant total est de:<span class="name"> ${prixTotal[0]}.</span> </p>
    <p>adresse de livraison:</p>
    <p class="adress">
    <span class="name">${client.firstName} ${client.lastName}</br>
    ${client.address}</br>
    ${client.city}</span></br></p>
    <p>contact:</p>
    <p class="adress"><span class="name">${client.email}</span></p>
    <p>vos articles:</p>`;
    //création d'une boucle pour les teddies
    for (let j = 0; j < listProducts.length; j++) {
        refco_two += `<li class="li_teddy"><img class="img_teddy" src="${listProducts[j].imageUrl}" />
        <span class="name"><h2>${listProducts[j].name}</h2></span></li>`;
    }

    //insertion du code html
    let ref = document.getElementById("command");
    ref.innerHTML = refco_one;
    let ref_two = document.getElementById("details_teddy");
    ref_two.innerHTML = refco_two;

    localStorage.clear();

    return data;
}
//lancement de la fonction
fetchCommand();
