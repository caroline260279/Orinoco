//selection du boutton par son id
let formValid = document.getElementById("button");

//crétioin des variables regex

//nom et prénom: lettres majuscules ou minuscules autorisées avec é, è, à, tiret et espace
//de 3 à 15 caractères, insensible à la casse
let nameValid = /^[A-Za-zéèà\s-]{3,15}$/i;
//adresse:lettres majuscules ou minuscules, é, è, à, espace ou tiret
//de 5 à 50 caractères, insensible à la casse
let addressValid = /^[A-Za-z0-9éèà\s,.'-]{5,50}$/i;
//code postale:5 chiffres uniquement
let postcodeValid = /^[0-9]{5}$/;
//ville: lettres majuscules ou minuscules avec é è à
// ainsi que point, tiret, apostrophe, virgule
// de 3 à 15 caractères, insensible à la casse
let cityValid = /^[A-Za-zéèà ,.'-]{3,15}$/i;
//téléphone:10 chiffres uniquement
let phoneValid = /^[0-9]{10}$/;
//mail:minimum 2 lettres majuscules ou minuscules, chiffres de 0 à 9, point et tiret
//puis @
//puis puis minimum 2 lettres majuscules ou minuscules, chiffres de 0 à 9, point et tiret
let mailValid = /^[A-Za-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;

//selection des input
let name_formulaire = document.getElementById("nom");
let firstname = document.getElementById("firstname");
let address = document.getElementById("address");
let postcode = document.getElementById("postcode");
let city = document.getElementById("city");
let phone = document.getElementById("phone");
let mail = document.getElementById("mail");

//selection du span apparaissant en cas d'invalidité
let no_name = document.getElementById("no-name");
let no_firstname = document.getElementById("no_firstname");
let no_address = document.getElementById("no-address");
let no_postcode = document.getElementById("no-postcode");
let no_city = document.getElementById("no-city");
let no_phone = document.getElementById("no-phone");
let no_mail = document.getElementById("no-mail");

//creation d'une fonction globale
let validation_form = function (eventValid, event, no_event) {
    //vérification du remplissage du champ
    if (event.validity.valueMissing) {
        // console.log(event.validity.valueMissing);
        no_event.textContent = "champ obligatoire";
        no_event.style.color = "red";
        no_event.style.display = "block";
        return false;
    }
    //vérification du format de données
    else if (eventValid.test(event.value) == false) {
        //console.log(eventValid.test(event.value));
        no_event.textContent = "format incorrect";
        no_event.style.color = "orange";
        no_event.style.display = "block";
        return false;
    }
    //effacement du span
    else if (
        !event.validity.valueMissing == true &&
        eventValid.test(event.value) == true
    ) {
        no_event.textContent = "";
        return true;
    }
};

function validation(event) {
    //si toutes les regex ne sont pas respectées, le formulaire n'est pas envoyé
    if (
        validation_form(nameValid, name_formulaire, no_name) === true &&
        validation_form(nameValid, firstname, no_firstname) === true &&
        validation_form(addressValid, address, no_address) === true &&
        validation_form(postcodeValid, postcode, no_postcode) === true &&
        validation_form(cityValid, city, no_city) === true &&
        validation_form(phoneValid, phone, no_phone) === true &&
        validation_form(mailValid, mail, no_mail) === true
    ) {
        //création des variables pour la récupération des valeurs des input
        let clientName = name_formulaire.value;
        let clientFirstname = firstname.value;
        let clientAddress = address.value;
        let clientPostcode = postcode.value;
        let clientCity = city.value;
        let clientPhone = phone.value;
        let clientMail = mail.value;
        //création d'une fonction pour créer l'objet client
        function client(firstName, lastName, address, city, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.email = email;
        }

        //création de l'objet client
        let myClient = new client(
            clientFirstname,
            clientName,
            clientAddress,
            clientCity,
            clientMail
        );
        let myClientArray = [];
        myClientArray.push(myClient);
        localStorage.setItem("monClient", JSON.stringify(myClientArray));
    } else {
        //fonction validation pour afficher les inputs à modifier si besoin et bloquer la validation de la commande
        validation_form(phoneValid, phone, no_phone);
        validation_form(nameValid, name_formulaire, no_name);
        validation_form(nameValid, firstname, no_firstname);
        validation_form(addressValid, address, no_address);
        validation_form(postcodeValid, postcode, no_postcode);
        validation_form(cityValid, city, no_city);
        validation_form(phoneValid, phone, no_phone);
        validation_form(mailValid, mail, no_mail);
        event.preventDefault();
    }
}

//validaton envoi du formulaire
//création de l'évenement lorsque l'on clique sur le bouton avec la fonction validation
formValid.addEventListener("click", validation);
