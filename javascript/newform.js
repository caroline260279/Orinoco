//création des variables hors de la boucle pour ne pas les réinitialiser à chaque fois
let localStoragemonPanier = JSON.parse(localStorage.getItem("monPanier"));

//
if (localStoragemonPanier === null) {
    console.log("ok");
    let noForm = document.getElementById("form");
    noForm.style.display = "none";
    let noREcap = document.getElementById("recapsuppress");
    noREcap.style.display = "none";
    let summaryTwo = document.getElementById("summary");
    summaryTwo.style.height = "500px";
    summaryTwo.style.paddingTop = "150px";
} else {
    //selection du boutton par son id
    let formValid = document.getElementById("button");
    //création de la variable pour la validation du formulaire
    let error = 0;

    //création des variables regex

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
    let mailValid = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

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
    //eventvalid = regex
    //event = 'input
    //no_event = display none
    //creation d'une fonction globale
    function Validation(eventValid, event, no_event) {
        this.eventValid = eventValid;
        this.event = event;
        this.no_event = no_event;
        //vérification du remplissage du champ
        this.verification = function () {
            if (event.validity.valueMissing) {
                // console.log(event.validity.valueMissing);
                no_event.textContent = "champ obligatoire";
                no_event.style.color = "red";
                no_event.style.display = "block";
                error += 1;
            }
            //vérification du format de données
            else if (eventValid.test(event.value) == false) {
                //console.log(eventValid.test(event.value));
                no_event.textContent = "format incorrect";
                no_event.style.color = "orange";
                no_event.style.display = "block";
                error += 1;
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
    }
    let validation1 = new Validation(nameValid, name_formulaire, no_name);
    let validation2 = new Validation(nameValid, firstname, no_firstname);
    let validation3 = new Validation(addressValid, address, no_address);
    let validation4 = new Validation(postcodeValid, postcode, no_postcode);
    let validation5 = new Validation(cityValid, city, no_city);
    let validation6 = new Validation(phoneValid, phone, no_phone);
    let validation7 = new Validation(mailValid, mail, no_mail);

    function order(event) {
        validation1.verification();
        validation2.verification();
        validation3.verification();
        validation4.verification();
        validation5.verification();
        validation6.verification();
        validation7.verification();
        //si toutes les regex ne sont pas respectées, le formulaire n'est pas envoyé
        if (error > 0) {
            //remise de la variable à 0 sinon la fonction ne bascule jamais dans le else
            error = 0;
            event.preventDefault();
        } else {
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
            //push le client dans le tableau et stringify pour envoyer dans le local storage
            let myClientArray = [];
            myClientArray.push(myClient);
            localStorage.setItem("monClient", JSON.stringify(myClientArray));
            document.location.href = "commande.html";
        }
    }

    //validaton envoi du formulaire
    //création de l'évenement lorsque l'on clique sur le bouton avec la fonction validation
    formValid.addEventListener("click", order);
}
