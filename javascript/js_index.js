//création de la fonction ajax pour faire une requete
let ajax = function (url) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) resolve(req.responseText);
                else reject(req);
            }
        };
        req.send(null);
    });
};
//utilisation de la fonction ajax pour faire une requete a l'api
ajax("http://localhost:3000/api/teddies").then(function (response) {
    let results = JSON.parse(response);
    //création d'une boucle pour récuperer les informations de chaque teddy
    for (let i = 0; i < results.length; i++) {
        //création du code html
        let cardOrigin = `
        <a href="teddy.html?id=${results[i]._id}
        ">
        <figure>
            <img
                class="image"
                src="${results[i].imageUrl}"
                alt="${results[i].imageUrl}"
            />
            <figcaption class="figcaption">
                <h2>${results[i].name}</h2>
                <p class="paragraph">${results[i].description}</p>
                <p class="p_plus">Voir plus...</p>
            </figcaption>
        </figure>
        </a>
    `;
        //insertion du code html
        let xx = document.getElementById("teddy_list");
        xx.innerHTML += cardOrigin;
    }
});
