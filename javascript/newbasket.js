//création des variables hors de la boucle pour ne pas les réinitialiser à chaque fois
let localStoragecontenu = JSON.parse(localStorage.getItem("monPanier"));
let htmlTbody = "";
let totalPriceNumber = 0;

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
            //création de la variable price qui représente le prix avec décimale pour les centimes et en euros
            let nombre = data.price / 100;
            let price = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(nombre);
            //variable pour le prix total de la ligne de chaque ourson
            priceArticle = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(localStoragecontenu[i].quantity * parseInt(price));
            //calcul du total avec l'itération si plusieurs ourson
            priceArticleNumber = parseInt(priceArticle);
            totalPriceNumber += priceArticleNumber;
            let totalPrice = new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
            }).format(totalPriceNumber);
            //création de la variable myPrice et de la clé montant pour stocker le prix total dans le local storage
            let myPrice = [];
            myPrice.push(totalPrice);
            localStorage.setItem("montant", JSON.stringify(myPrice));
            //html dynamique avec l'itération si plusieurs ourson
            htmlTbody += `
                <tr id="list_teddies">
                    <td class="name_teddy">${data.name}</td>
                    <td class="quantity">${localStoragecontenu[i].quantity}
                        <button class="teddySupprim">supprimer</button>
                    <td class="price_teddy">${price}</td>
                    <td class="totalArticle">${priceArticle}</td>
                </tr>
            `;
            //insertion du code html
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = htmlTbody;

            let buttonSupprim = document.getElementsByClassName("teddySupprim");
            //boucle pour le bouton supprimer
            for (let j = 0; j < buttonSupprim.length; j++) {
                let elementSupprim = buttonSupprim[j];
                let index = localStoragecontenu.findIndex(
                    (x) => x.id === localStoragecontenu[j].id
                );
                //création de la fonction pour supprimer le teddy correspondant au bouton
                let fsupprim = function () {
                    localStoragecontenu.splice(index, 1);
                    localStorage.removeItem("monPanier");
                    localStorage.setItem(
                        "monPanier",
                        JSON.stringify(localStoragecontenu)
                    );
                    //si le tableau ne contient plus de teddy, indiquer que le panier est vide
                    if (localStoragecontenu.length === 0) {
                        localStorage.clear();
                        let summary = document.getElementById("summary");
                        summary.innerHTML = "votre panier est vide";
                        let table = document.getElementById("table");
                        table.style.display = "none";
                        let suppress = document.getElementById("suppress");
                        suppress.style.display = "none";
                        window.location.reload();
                    }
                    //sinon mettre à jour la page pour mettre à jour le tableau
                    else {
                        window.location.reload();
                    }
                };
                //écoute du bouton supprimer au clic
                elementSupprim.addEventListener("click", fsupprim, fetchBasket);
            }

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
            //création de la variable pour le bouton vider le panier
            let emptyButton = document.getElementById("suppress");

            //création de la fonction empty
            let empty = function () {
                localStorage.clear();
                let summary = document.getElementById("summary");
                summary.innerHTML = "votre panier est vide";
                let table = document.getElementById("table");
                table.style.display = "none";
                let suppress = document.getElementById("suppress");
                suppress.style.display = "none";
                window.location.reload();
            };

            //écoute du bouton au clic
            emptyButton.addEventListener("click", empty);

            return data;
        }

        //lancement de la fonction
        fetchBasket();
    }
}
