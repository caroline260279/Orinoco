let ajax = function (url) {
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

ajax("http://localhost:3000/api/teddies").then(function (response) {
    let results = JSON.parse(response);

    for (let i = 0; i < results.length; i++) {
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
        let xx = document.getElementById("teddy_list");
        xx.innerHTML += cardOrigin;
    }
});
