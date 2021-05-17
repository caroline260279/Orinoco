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
                    <td class="quantity">                       
                        <div class="input_div_basket">
                        <button class="lessButton" class="lessButton_basket">-</button>
                        <input 
                            value="${localStoragecontenu[i].quantity}" 
                            class="countButton"
                            class="count_basket" 
                            placeholder="${localStoragecontenu[i].quantity}" 
                            readonly>
                        <button class="plusButton" class="plusButton_basket">+</button>
                        </div></td>
                    <td class="price_teddy">${data.price}</td>
                    <td class="totalArticle">${priceArticle}</td>
                </tr>
            `;

            //insertion du code html
            let tbody = document.getElementById("tbody");
            tbody.innerHTML = htmlTbody;
            let localStorageProducts = localStorage.getItem("monPanier");

            //les boutons "quantité"
            let lessButtonTeddy = document.getElementsByClassName("lessButton");
            let plusButtonTeddy = document.getElementsByClassName("plusButton");
            let countButtonTeddy =
                document.getElementsByClassName("countButton");
            let valueCountButtonTeddy = 0;
            let elementCount = "";

            //création de la fonction pour décrémenter
            let fmoins = function () {
                let produitCommand = "";
                for (n = 0; n < countButtonTeddy.length; n++) {
                    elementCount = countButtonTeddy[n];
                    valueCountButtonTeddy = parseInt(elementCount.value);

                    //empecher la modification de l'input en modifiant le html dans l'inspecteur
                    let buttonValid = /^[1-9]{1}$/;
                    let attributValue = elementCount.getAttribute("value");
                    if (buttonValid.test(attributValue) == false) {
                        valueCountButtonTeddy += data.quantity;
                        elementCount.setAttribute(
                            "value",
                            valueCountButtonTeddy.toString()
                        );
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
                    }
                    //creation de l'objet a pusher
                    produitCommand = {
                        id: data._id,
                        quantity: valueCountButtonTeddy,
                    };
                }

                console.log(localStorageProducts);
                //boucle pour rechercher si le produit est deja dans le panier
                for (let j = 0; j < localStorageProducts.length; j++) {
                    console.log(localStorageProducts[j].id);
                    console.log(produitCommand.id);
                    //si il est deja dans le panier
                    if (
                        (produitCommand.id === localStorageProducts[j].id) ===
                        true
                    ) {
                        //alors on modifie la quantité en ajoutant la quantité voulue
                        let numbertoadd = localStorageProducts[j].quantity;
                        let newvalueCount;

                        newvalueCount = numbertoadd - 1;

                        valueCountButtonTeddy = newvalueCount;
                        elementCount.setAttribute(
                            "value",
                            valueCountButtonTeddy.toString()
                        );

                        //modification de la variable produitCommand avec la nouvelle quantité
                        produitCommand = {
                            id: data._id,
                            quantity: newvalueCount,
                        };
                        //recherche de l'index du produit à remplacer
                        let index = localStorageProducts.findIndex(
                            (x) => x.id === data._id
                        );
                        // nouveau local strorage avec la nouvelle quantité du teddy
                        let newlocalStorageProducts =
                            localStorageProducts.splice(index, 1);
                    } else {
                        console.log("ko");
                    }
                }

                console.log(localStorageProducts);
                if (produitCommand.quantity > 0) {
                    localStorageProducts.push(produitCommand);
                    localStorage.setItem(
                        "monPanier",
                        JSON.stringify(localStorageProducts)
                    );
                } else {
                    localStorage.setItem(
                        "monPanier",
                        JSON.stringify(localStorageProducts)
                    );
                    console.log("il faut supprimer la ligne");
                }
            };

            //création de la fonction pour incrémenter
            let fplus = function () {
                //empecher la modification de l'input en modifiant le html dans l'inspecteur
                let buttonValid = /^[1-9]{1}$/;
                let attributValue = countButtonTeddy.getAttribute("value");
                if (buttonValid.test(attributValue) == false) {
                    valueCountButtonTeddy += data.quantity;
                    countButtonTeddy.setAttribute(
                        "value",
                        valueCountButtonTeddy.toString()
                    );
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
                        id: data._id,
                        quantity: valueCountButtonTeddy,
                    };

                    //boucle pour rechercher si le produit est deja dans le panier
                    for (let j = 0; j < localStorageProducts.length; j++) {
                        console.log(localStorageProducts[j].id);
                        console.log(produitCommand.id);
                        //si il est deja dans le panier
                        if (
                            (produitCommand.id ===
                                localStorageProducts[j].id) ===
                            true
                        ) {
                            //alors on modifie la quantité en ajoutant la quantité voulue
                            let numbertoadd = localStorageProducts[j].quantity;
                            let newvalueCount = numbertoadd + 1;
                            valueCountButtonTeddy = newvalueCount;
                            countButtonTeddy.setAttribute(
                                "value",
                                valueCountButtonTeddy.toString()
                            );
                            //modification de la variable produitCommand avec la nouvelle quantité
                            produitCommand = {
                                id: data._id,
                                quantity: newvalueCount,
                            };
                            //recherche de l'index du produit à remplacer
                            let index = localStorageProducts.findIndex(
                                (x) => x.id === data._id
                            );
                            // nouveau local strorage avec la nouvelle quantité du teddy
                            let newlocalStorageProducts =
                                localStorageProducts.splice(index, 1);
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
            };

            //écoute du bouton - pour décrémenter
            for (l = 0; l < lessButtonTeddy.length; l++) {
                elementLess = lessButtonTeddy[l];
                elementLess.addEventListener("click", fmoins);
            }

            //écoute du bouton + pour incrémenter

            for (m = 0; m < plusButtonTeddy.length; m++) {
                elementPlus = plusButtonTeddy[m];
                elementPlus.addEventListener("click", fplus);
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
            console.log(localStoragecontenu);
            let empty = function () {
                if (localStoragecontenu === "") {
                    console.log(ok);
                } else {
                    localStorage.clear();
                    let summary = document.getElementById("summary");
                    summary.innerHTML = "votre panier est vide";
                    let table = document.getElementById("table");
                    table.style.display = "none";
                    let suppress = document.getElementById("suppress");
                    suppress.style.display = "none";
                }
            };

            //écoute du bouton au clic
            emptyButton.addEventListener("click", empty);

            return data;
        }

        //lancement de la fonction
        fetchBasket();
    }
}
