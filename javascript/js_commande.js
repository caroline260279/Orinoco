//création de la variable products
let arrayTeddy = JSON.parse(localStorage.getItem("monPanier"));
let products = [];
for (i = 0; i < arrayTeddy.length; i++) {
    let idTeddy = arrayTeddy[i].id;
    products.push(idTeddy);
}

let clientArray = JSON.parse(localStorage.getItem("monClient"));
let contact = clientArray[0];
console.log(products);
console.log(contact);

let refcommande = "";
let refco_one = "";
let refco_two = "";

async function fetchBasket() {
    const response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ contact, products }),
    });
    //constante represantant les ids des teddies, la référence de commande et les coordonnées du client
    const data = await response.json();
    console.log(data);
    let listProducts = data.products;
    let client = data.contact;
    console.log(listProducts.name);

    refco_one = `
    <p class="thanks">Merci <span class="name">${client.firstName} ${client.lastName}</span>,</p>
    <p class="reference">Votre commande <span class="name">${data.orderId}</span> a été enregistrée</p>
    <p>adresse de livraison:</p>
    <p class="adress">
    <span class="name">${client.firstName} ${client.lastName}</br>
    ${client.address}</br>
    ${client.city}</span></br></p>
    <p>contact:</p>
    <p class="adress"><span class="name">${client.email}</span></p>
    <p>vos articles:</p>


    `;
    for (let j = 0; j < listProducts.length; j++) {
        refco_two += `<li class="li_teddy"><img class="img_teddy" src="${listProducts[j].imageUrl}" />
        <span class="name"><h2>${listProducts[j].name}</h2></span></li>`;
    }

    //insertion du code html

    let ref = document.getElementById("command");
    ref.innerHTML = refco_one;
    let ref_two = document.getElementById("details_teddy");
    console.log(refco_two);
    ref_two.innerHTML = refco_two;
    console.log(ref_two);
    return data;
}

//lancement de la fonction
fetchBasket();
