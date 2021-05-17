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
                        <input type="text" value="1" id="count" readonly>
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
            count.setAttribute("value", valueCount.toString());
        }
    });
    //écoute du bouton + pour incrémenter

    plusButton.addEventListener("click", function () {
        valueCount += 1;
        count.setAttribute("value", valueCount.toString());
    });
    //creation de la variable pour écouter le bouton ajouter au panier
    let button = document.getElementById("basket");

    //ecoute du bouton ajouter au panier au clic
    button.addEventListener("click", function () {
        //empecher la modification de l'input en modifiant le html dans l'inspecteur
        let buttonValid = /^[1-9]{1}$/;
        let attributValue = count.getAttribute("value");
        let localStorageProducts = localStorage.getItem("monPanier");
        if (buttonValid.test(attributValue) == false) {
            valueCount = 0;
            count.setAttribute("value", valueCount.toString());
        } else {
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
            //boucle pour rechercher si le produit est deja dans le panier
            for (let j = 0; j < localStorageProducts.length; j++) {
                //si il est deja dans le panier
                if (
                    (produitCommand.id === localStorageProducts[j].id) ===
                    true
                ) {
                    //alors on modifie la quantité en ajoutant la quantité voulue
                    let numbertoadd = localStorageProducts[j].quantity;
                    let newvalueCount = numbertoadd + valueCount;
                    //modification de la variable produitCommand avec la nouvelle quantité
                    produitCommand = {
                        id: Result._id,
                        quantity: newvalueCount,
                    };
                    //recherche de l'index du produit à remplacer
                    let index = localStorageProducts.findIndex(
                        (x) => x.id === Result._id
                    );
                    // nouveau local strorage avec la nouvelle quantité du teddy
                    let newlocalStorageProducts = localStorageProducts.splice(
                        index,
                        1
                    );
                } else {
                    console.log("ko");
                }
            }
            localStorageProducts.push(produitCommand);
            localStorage.setItem(
                "monPanier",
                JSON.stringify(localStorageProducts)
            );
        }
    });
});
