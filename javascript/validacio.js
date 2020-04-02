/************
Funció auxiliar per quan afegim o modificam un hotel.
Revisarem si les dades estan completades correctament.
Es podria fer amb subfuncions per controlar els diferents tipus de dades. Strings, numerics etc.
Inclou el canvi d'imatge per error: https://stackoverflow.com/questions/5782857/changing-textbox-border-colour-using-javascript
**************/
function controlDeLesDades() {
    var strErrors = "";

    //Si el nom no l'han introduit serà error.
    if (document.getElementById("nomHotel").value == "") {
        //El \n és un bot de linea.
        document.getElementById("nomHotel").className = document.getElementById("nomHotel").className + " error";
        strErrors += "Nom no introduït.\n";
    } else {
        document.getElementById("nomHotel").className = document.getElementById("nomHotel").className.replace(" error", "");
    }

    strErrors += controlEmail();

    if (document.getElementById("telefonHotel").value == "") {
        document.getElementById("telefonHotel").className = document.getElementById("telefonHotel").className + " error";
        strErrors += "Telèfon no introduït.\n";
    } else {
        document.getElementById("telefonHotel").className = document.getElementById("telefonHotel").className.replace(" error", "");
    }

    if (document.getElementById("carrerHotel").value == "") {
        document.getElementById("carrerHotel").className = document.getElementById("carrerHotel").className + " error";
        strErrors += "Nom del carrer, avinguda, etc. no introduït.\n";
    } else {
        document.getElementById("carrerHotel").className = document.getElementById("carrerHotel").className.replace(" error", "");
    }

    if (document.getElementById("numHotel").value == "") {
        document.getElementById("numHotel").className = document.getElementById("numHotel").className + " error";
        strErrors += "Número de direcció no introduït.\n";
    }

    if (document.getElementById("codipostalHotel").value == "") {
        document.getElementById("codipostalHotel").className = document.getElementById("codipostalHotel").className + " error";
        strErrors += "Codi postal no introduït.\n";
    }

    if (document.getElementById("poblacioHotel").value == "") {
        document.getElementById("poblacioHotel").className = document.getElementById("poblacioHotel").className + " error";
        strErrors += "Població no introduïda.\n";
    }

    if (document.getElementById("comunitatHotel").value == "0") {
        document.getElementById("comunitatHotel").className = document.getElementById("comunitatHotel").className + " error";
        strErrors += "Comunitat no introduïda.\n";
    }

    if (document.getElementById("estrellesHotel").value == "0") {
        document.getElementById("estrellesHotel").className = document.getElementById("estrellesHotel").className + " error";
        strErrors += "Número d'estrelles no introduït.\n";
    }

    if (document.getElementById("monedaHotel").value == "0") {
        document.getElementById("monedaHotel").className = document.getElementById("monedaHotel").className + " error";
        strErrors += "Tipus de moneda estàndar no introduït.\n";
    }

    if (llistaIdiomes.length == 0) {
        document.getElementById("idiomesHotel").className = document.getElementById("idiomesHotel").className + " error";
        strErrors += "No s'ha introduït cap idioma.\n";
    }

    return strErrors;
}

function controlEmail() {
    var emailErrors = "";
    if (document.getElementById("emailHotel").value == "") {
        document.getElementById("emailHotel").className = document.getElementById("emailHotel").className + " error";
        emailErrors += "Correu electrònic no introduït.\n";
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("emailHotel").value))) {
        //Veure: https://www.w3resource.com/javascript/form/email-validation.php
        document.getElementById("emailHotel").className = document.getElementById("emailHotel").className + " error";
        emailErrors += "Correu electrònic amb un format no vàlid.\n";
    } else {
        document.getElementById("emailHotel").className = document.getElementById("emailHotel").className.replace(" error", "");
    }
    return emailErrors;
}
