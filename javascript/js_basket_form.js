//selection du boutton par son id
let formValid = document.getElementById("button");

//regex lettre autorisée, ainsi que point apostrophe et tiret
//non sensible à la casse
let nameValid = /^[a-z ,.'-]+$/i;

//selection des input
let name_formulaire = document.getElementById("nom");
let firstname = document.getElementById("firstname");

//selection du span apparaissant en cas d'invalidité
let noname = document.getElementById("no-name");
let no_firstname = document.getElementById("no_firstname");
console.log(typeof name_formulaire.textContent);
console.log(firstname.textContent);

//utilisation d'une fonction pour valider le nom
function validation_nom() {
    //verification du remplissage du champ prénom
    if (name_formulaire.validity.valueMissing) {
        noname.textContent = "champ obligatoire";
        noname.style.color = "red";
        noname.style.display = "block";
        return false;
    }
    //vérification du format de données
    else if (nameValid.test(name_formulaire.value) == false) {
        noname.textContent = "format incorrect";
        noname.style.color = "orange";
        noname.style.display = "block";
        return false;
    }
    //effacement du span
    else if (
        !name_formulaire.validity.valueMissing &&
        nameValid.test(name_formulaire.value) == true
    ) {
        noname.textContent = "";
        return true;
    }
}

//utilisation d'une fonction pour valider le prénom
function validation_prénom() {
    if (firstname.validity.valueMissing) {
        no_firstname.textContent = "champ obligatoire";
        no_firstname.style.color = "red";
        no_firstname.style.display = "block";
        return false;
    } else if (nameValid.test(firstname.value) == false) {
        no_firstname.textContent = "format incorrect";
        no_firstname.style.color = "orange";
        no_firstname.style.display = "block";
        return false;
    } else if (
        !firstname.validity.valueMissing &&
        nameValid.test(firstname.value) == true
    ) {
        no_firstname = "";
        return true;
    }
}

//fonction pour supprimer "champ obligatoire"
/*function appear_input_name() {
    if (name_formulaire.textContent === "" && firstname.textContent === "") {
        console.log(name_formulaire.textContent);
        console.log(firstname.textContent);

        noname.style.display = "none";
        no_firstname.style.display = "none";
    } else {
        noname.style.display = "block";
        no_firstname.style.display = "block";
    }
}
appear_input_name();*/

//validaton envoi du formulaire
//création de l'évenement lorsque l'on clique sur le bouton avec la fonction validation
formValid.addEventListener("click", validation);

function validation(event) {
    if (!validation_nom() && !validation_prénom()) {
        event.preventDefault();
        console.log("ko");
    } else {
        console.log("ok");
    }
}
/* a envoyer à l'api en POST */
/*let envoi = {
    contact: {
        firstName: string,
        lastName: string,
        address: string,
        city: string,
        email: string,
    },
    products: ["id", "id"],
};*/
