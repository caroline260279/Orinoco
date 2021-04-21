//création des variables hors de la boucle pour ne pas les réinitialiser à chaque fois
let localStoragecontenu = JSON.parse(localStorage.getItem("monPanier"));
let htmlTbody = "";
let totalPrice = 0;
//
if (localStoragecontenu === null) {
    let summary = document.getElementById("summary");
    summary.innerHTML = "votre panier est vide";
    let table = document.getElementById("table");
    table.style.display = "none";
    let suppress = document.getElementById("suppress");
    suppress.style.display = "none";
} else {
    //boucle pour parcourir le panier
    for (let i = 0; i < localStoragecontenu.length; i++) {
        //création d'une fonction pour obtenir les infos des teddies présent dans le panier
        async function fetchBasket() {
            const response = await fetch(
                "http://localhost:3000/api/teddies/" + localStoragecontenu[i].id
            );
            //constante represantant les données des teddies
            const data = await response.json();
            //variable pour le prix total de la ligne de chaque ourson
            let priceArticle = localStoragecontenu[i].quantity * data.price;
            //calcul du total avec l'itération si plusieurs ourson
            totalPrice += priceArticle;
            //html dynamique avec l'itération si plusieurs ourson
            htmlTbody += `
                <tr>
                    <td class="name_teddy">${data.name}</td>
                    <td class="quantity">${localStoragecontenu[i].quantity}</td>
                    <td class="price_teddy">${data.price}</td>
                    <td class="totalArticle">${priceArticle}</td>
                </tr>
            `;
            //insertion du code html
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = htmlTbody;
            //html dynamique pour le total du tableau
            htmlTfoot = `
                <tfoot id="tfoot">
                <tr class="total">
                    <td class="th_total">Total</td>
                    <td colspan="3" class="collapse">${totalPrice}</td>
                </tr>
                </tfoot>
            `;
            //insertion du code html
            let tfoot = document.getElementById("tfoot");
            tfoot.innerHTML = htmlTfoot;
            return data;
        }
        //lancement de la fonction
        fetchBasket();
    }
}
