//récupération de l'id du teddy dans l'url
let url = new URL(window.location.href);
let urlTeddy = url.searchParams.get("id");

//creation d'une fonction pour la requete à l'API
let ajax = function (url) {
    // On renvoie une promesse qui prend en paramettre une fonction
    // avec 2 paramètres, le callback de succès et d'erreur
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function (aEvt) {
            if (req.readyState == 4) {
                if (req.status == 200) resolve(req.responseText);
                else reject(req);
            }
        };
        req.send(null);
    });
};

//utilisation de la fonction ajax pour le teddy dont l'url contient l'id
ajax("http://localhost:3000/api/teddies/" + urlTeddy).then(function (response) {
    console.log("http://localhost:3000/api/teddies/" + urlTeddy);
    let results = JSON.parse(response);
    let Result = JSON.parse(response);

    //création d'une variable pour le code à injecter
    let card = `       
                <figure>
                    <h2>${Result.name}</h2>
                    <img src="${Result.imageUrl}" alt="${Result.name}" />
                    <p class="description">${Result.description}</p>
                   
                    <div class="selection">
                        <select name="colors" id="color_select">
                        <option class="color_product" value="">--choisissez votre couleur--</option> `;
    for (i = 0; i < Result.colors.length; i++) {
        card += `
                        <option  value="${Result.colors[i]}">${Result.colors[i]}</option>
                        `;
    }
    card += `
                        </select>

                        <div id="input_div">
                        <button id="lessButton">-</button>
                        <input value="1" id="count" readonly>
                        <button id="plusButton">+</button>
                        </div>
                    </div>
                        <div class="info">
                        <p class="price">${Result.price}€</p>
                        <button id="basket" href="basket.html"
                            ><i class="fas fa-shopping-cart"></i>ajouter au
                            panier</button></div>
                    </div>

                </figure>
                    `;

    //injection de la figure dans la page avec l'id
    let insert = document.getElementById("page_teddy");
    console.log(insert);
    insert.innerHTML = card;

    //incrémentation/décrémentation au bouton + ou -
    //déclaration des variables
    let less = document.getElementById("lessButton");
    let plus = document.getElementById("plusButton");
    let count = document.getElementById("count");
    let valueCount = parseInt(count.value);

    //écoute du bouton - pour décrémenter
    lessButton.addEventListener("click", function () {
        //pour ne pas avoir de valeur négative
        if (valueCount === 1) {
            valueCount = 1;
            //sinon enlever 1
        } else {
            valueCount -= 1;
            console.log(valueCount);
            count.setAttribute("value", valueCount.toString());
        }
    });
    //écoute du bouton +

    plusButton.addEventListener("click", function () {
        valueCount += 1;
        count.setAttribute("value", valueCount.toString());
    });
    //creation de la variable pour écouter le bouton ajouter au panier
    let button = document.getElementById("basket");

    //ecoute du bouton ajouter au panier au clic
    button.addEventListener("click", function () {
        let localStorageProducts = localStorage.getItem("monPanier");
        //si le panier n'est pas vide parser le panier
        if (localStorageProducts !== "") {
            localStorageProducts = JSON.parse(
                localStorage.getItem("monPanier")
            );

            //si le panier est vide, création d'un tableau vide pour y stocker les objets
            if (localStorageProducts === null) {
                localStorageProducts = [];
            }
        }
        //si le panier est vide, confirme avec un clear et cree le tableau vide
        else {
            localStorage.clear();
            localStorageProducts = [];
        }
        //creation de l'objet a pusher
        let produitCommand = {
            id: Result._id,
            quantity: valueCount,
        };

        for (let j = 0; j < localStorageProducts.length; j++) {
            console.log(localStorageProducts[j].id);
            console.log(produitCommand.id);
            if ((produitCommand.id === localStorageProducts[j].id) === true) {
                console.log();
                console.log("salut");
                let numbertoadd = localStorageProducts[j].quantity;
                let newvalueCount = numbertoadd + valueCount;
                console.log(newvalueCount);
                produitCommand = {
                    id: Result._id,
                    quantity: newvalueCount,
                };
                console.log(produitCommand);
                console.log(localStorageProducts);
                let index = localStorageProducts.findIndex(
                    (x) => x.id === Result._id
                );
                console.log(index);
                let newlocalStorageProducts = localStorageProducts.splice(
                    index,
                    1
                );
                console.log(newlocalStorageProducts);
            } else {
                console.log("ko");
            }
        }
        localStorageProducts.push(produitCommand);
        localStorage.setItem("monPanier", JSON.stringify(localStorageProducts));
    });
});
