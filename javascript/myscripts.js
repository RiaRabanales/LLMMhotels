//Variables globals:
var comptadorHotels = 0;
var llistaIdiomes = new Array();
var arrMonedes = ["monedaBerenar", "monedaSopar", "monedaDinar", "monedaMascota", "pagament1opcio4", "pagament2opcio4", "pagament3opcio4", "pagament4opcio4",
    "pagament5opcio4", "pagament6opcio4", "pagament7opcio4", "pagament8opcio4", "pagament9opcio4"];
//Constantes: https://www.javascripttutorial.net/es6/javascript-const/
const NUMSERVEIS = 9;
const NUMALTRES = 10;

//Generar el Json del llistat d'hotels.
function generarJsonHotels() {
    var llistaHotels = new Array();

    //Cada input hiden te el class jsonHotel. El getElementsByClassName ens retorna una llista d'elements.
    //Els recorrerem per recollir le dades dels hotels.
    var liHotels = document.getElementsByClassName("jsonHotel");
    //Comprovem si en tenim algún.
    if (liHotels != null) {
        for (var i = 0; i < liHotels.length; i++) {
            elementHotel = liHotels.item(i);
            var objHotel = new Object();
            objHotel = JSON.parse(elementHotel.value);
            llistaHotels.push(objHotel);
        }
    }
    var jsonString = JSON.stringify(llistaHotels);
    document.getElementById("JsonText").innerText = jsonString;
}

//Generar l'objecte d'un hotel amb les dades introduides.
function generarObjHotel(id) {
    var hotel = new Object();
    hotel.id = id;
    hotel.nom = document.getElementById("nomHotel").value;
    //TODO: validar strings
    hotel.mail = document.getElementById("emailHotel").value;
    hotel.website = document.getElementById("websiteHotel").value;
    hotel.tel = document.getElementById("telefonHotel").value;
    hotel.tel2 = document.getElementById("telefon2Hotel").value;
    hotel.direccio = generarObjDireccio();
    hotel.estrelles = document.getElementById("estrellesHotel").value;
    hotel.moneda = document.getElementById("monedaHotel").value;
    hotel.serveis = generarArrayServeis();
    hotel.recepcio = generarArrayRecepcio();
    if (document.getElementById("menjador1").checked || document.getElementById("menjador2").checked || document.getElementById("menjador3").checked) {
        hotel.menjador = generarObjMenjador();
    }
    hotel.altres = generarArrayAltres();
    hotel.negocis = generarArrayNegocis();
    if (document.getElementById("mascotes").checked) {
        hotel.mascotes = generarObjMascotes();
    }
    hotel.idiomes = llistaIdiomes;
    return hotel;
}

function generarObjDireccio() {
    var objDireccio = new Object();
    //Afegir el tipus de via no és obligatori. La resta de dades si.
    objDireccio.tipus = document.getElementById("tipusDirHotel").value;
    objDireccio.carrer = document.getElementById("carrerHotel").value;
    objDireccio.num = document.getElementById("numHotel").value;
    objDireccio.codipostal = document.getElementById("codipostalHotel").value;
    objDireccio.poblacio = document.getElementById("poblacioHotel").value;
    objDireccio.comunitat = document.getElementById("comunitatHotel").value;
    return objDireccio;
}

//Generar la llista amb serveis generals; veure: https://stackoverflow.com/questions/9887360/how-can-i-check-if-a-checkbox-is-checked
function generarArrayServeis() {
    var arrServeis = new Array();
    for (i = 1; i <= NUMSERVEIS; i++) {
        var idServeis = "sgeneral" + i;
        console.log(idServeis)
        if (document.getElementById(idServeis).checked) {
            arrServeis.push(generarObjServeis(idServeis));
        }
    }
    return arrServeis;
}

function generarObjServeis(element) {
    var objServeis = new Object();
    //Creant això com a variable no he d'accedir a l'objecte dues vegades
    var serveisElement = document.getElementById(element)
    objServeis.id = serveisElement.id;
    objServeis.valor = serveisElement.value;
    return objServeis;
}

//Generar la llista amb serveis recepció; el mateix que abans però més simple (hi ha menys, no cal bucle)
function generarArrayRecepcio() {
    var arrRecepcio = new Array();
    if (document.getElementById("recepcio1").checked) {
        arrRecepcio.push(generarObjServeis("recepcio1"));
    }
    if (document.getElementById("recepcio2").checked) {
        arrRecepcio.push(generarObjServeis("recepcio2"));
    }
    if (document.getElementById("recepcio3").checked) {
        arrRecepcio.push(generarObjServeis("recepcio3"));
    }
    if (document.getElementById("recepcio4").checked) {
        arrRecepcio.push(generarObjServeis("recepcio4"));
    }
    //puc reutilitzar codi per generar objecte serveis
    return arrRecepcio;
}

function generarObjMenjador() {
    var objMenjador = new Object();
    if (document.getElementById("menjador1").checked) {
        objMenjador.berenar = generarObjBerenar();
    }
    if (document.getElementById("menjador2").checked) {
        objMenjador.sopar = generarObjSopar();
    }
    if (document.getElementById("menjador3").checked) {
        objMenjador.dinar = generarObjDinar();
    }
    return objMenjador;
}

function generarObjBerenar() {
    var objBerenar = new Object();
    if (document.getElementById("berenar1").checked) {
        objBerenar.cost = document.getElementById("berenar1").value;
    } else if (document.getElementById("berenar2").checked) {
        //No vull separar això en altra funció; ja està quedant massa liós.
        var objCostBerenar = new Object();
        objCostBerenar.preuBrut = document.getElementById("preuBrutBerenar").value;
        objCostBerenar.iva = document.getElementById("ivaBerenar").value;
        objCostBerenar.moneda = document.getElementById("monedaBerenar").value;
        objBerenar.cost = objCostBerenar;
    }
    return objBerenar;
}

function generarObjSopar() {
    var objSopar = new Object();
    if (document.getElementById("sopar1").checked) {
        objSopar.cost = document.getElementById("sopar1").value;
    } else if (document.getElementById("sopar2").checked) {
        var objCostSopar = new Object();
        objCostSopar.preuBrut = document.getElementById("preuBrutBerenar").value;
        objCostSopar.iva = document.getElementById("ivaBerenar").value;
        objCostSopar.moneda = document.getElementById("monedaBerenar").value;
        objSopar.cost = objCostSopar;
    }
    return objSopar;
}

function generarObjDinar() {
    var objDinar = new Object();
    if (document.getElementById("dinar1").checked) {
        objDinar.cost = document.getElementById("dinar1").value;
    } else if (document.getElementById("dinar2").checked) {
        var objCostDinar = new Object();
        objCostDinar.preuBrut = document.getElementById("preuBrutDinar").value;
        objCostDinar.iva = document.getElementById("ivaDinar").value;
        objCostDinar.moneda = document.getElementById("monedaDinar").value;
        objDinar.cost = objCostDinar;
    }
    return objDinar;
}

function generarArrayAltres() {
    var arrAltres = new Array();
    for (i = 1; i <= NUMALTRES; i++) {
        var idAltresServeis = "pagament" + i;
        if (document.getElementById(idAltresServeis).checked) {
            arrAltres.push(generarObjAltres(idAltresServeis));
        }
    }
    return arrAltres;
}

function generarObjAltres(element) {
    var objAltres = new Object();
    var arrayPagament = new Array();
    for (i = 1; i <= 4; i++) {
        var idOpcio = element + "opcio" + i;
        arrayPagament.push(idOpcio);
    }
    if (document.getElementById(arrayPagament[0]).checked) {
        objAltres.preu = "0";
    } else {
        objAltres.preu = document.getElementById(arrayPagament[2]).value;
        objAltres.moneda = document.getElementById(arrayPagament[3]).value;
    }
    return objAltres;
}

function generarArrayNegocis() {
    var arrNegocis = new Array();
    if (document.getElementById("negocis1").checked) {
        arrNegocis.push(generarObjServeis("negocis1"));
    }
    if (document.getElementById("negocis2").checked) {
        arrNegocis.push(generarObjServeis("negocis2"));
    }
    if (document.getElementById("negocis3").checked) {
        arrNegocis.push(generarObjServeis("negocis3"));
    }
    if (document.getElementById("negocis4").checked) {
        arrNegocis.push(generarObjServeis("negocis4"));
    }
    //puc reutilitzar codi per generar objecte serveis
    return arrNegocis;
}

function generarObjMascotes() {
    var objMascotes = new Object();
    if (document.getElementById("preuMascotaY").checked) {
        objMascotes.cost = generarPreuMascotes();
    } else if (document.getElementById("preuMascotaN").checked) {
        objMascotes.cost = document.getElementById("preuMascotaN").value;
    } else {
        objMascotes.cost = document.getElementById("preuMascotaD").value;
    }
    return objMascotes;
}

function generarPreuMascotes() {
    var preuMascotes = new Object();
    preuMascotes.preu = document.getElementById("preuMascotes").value;
    preuMascotes.moneda = document.getElementById("monedaMascota").value;
    if (document.getElementById("preuMascotes1").checked) {
        preuMascotes.tipus = document.getElementById("preuMascotes1").value;
    } else if (document.getElementById("preuMascotes2").checked) {
        preuMascotes.tipus = document.getElementById("preuMascotes2").value;
    } else {
        preuMascotes.tipus = document.getElementById("preuMascotes3").value;
    }
    return preuMascotes;
}

function afegirIdioma() {
    var nouIdioma = document.getElementById("idiomesHotel").value;
    if (!llistaIdiomes.includes(nouIdioma)) {        //veure: https://www.w3schools.com/jsref/jsref_includes_array.asp
        llistaIdiomes.push(nouIdioma);
        console.log("Idiomes: " + llistaIdiomes);
        controlIdiomes();
    }
}

function buidarIdiomes() {
    llistaIdiomes = [];
    controlIdiomes();
}

//Afegirem un hotel. Controlarem si les dades són correctes i el ficarem a la llista i generarem el Json.
function afegirHotel() {
    var dadesCompletes = controlDeLesDades();
    var idLlista = comptadorHotels;
    comptadorHotels += 1;
    if (dadesCompletes == "") {
        var objHotel = generarObjHotel(idLlista);
        //Crearem un element més a la llista d'hotels
        var strHtmlHotel = "<li id=\"liHotel" + idLlista + "\">";
        //Crearem un input hidden. Com un text, però no visible per guardar el Json de l'hotel
        strHtmlHotel += "<label id=\"lblNomHot" + idLlista + "\">" + objHotel.nom + "</label>";
        strHtmlHotel += "<input type=\"hidden\" class=\"jsonHotel\" id=\"jsonHotel" + idLlista + "\" value=\"\" />";
        //Crearem un botó per eliminar l'hotel
        strHtmlHotel += "<button onclick=\"eliminarHotel(" + idLlista + ")\">Eliminar</button>";
        //Crearem un botó per modificar l'hotel
        strHtmlHotel += "<button onclick=\"modificarHotel(" + idLlista + ")\">Modificar</button>";
        strHtmlHotel += "</li>";
        var jsonHotel = JSON.stringify(objHotel);
        document.getElementById("llistaHotels").innerHTML += strHtmlHotel;
        //Asignam el json al input hidden del hotel. Ho faig aquí així no he de fer el parse de les ". Ja ho fa javascript automàtic.
        document.getElementById("jsonHotel" + idLlista).value = jsonHotel;
        netejarCamps();
        alert("Afegit correctament");
    } else {
        alert("Falten dades per completar:\n" + dadesCompletes);
    }
}

//Modificació de les dades d'un hotel.
function desarModificacioHotel() {
    var idLlista = document.getElementById("idHotel").value;
    var dadesCompletes = controlDeLesDades();
    if (dadesCompletes == "") {
        var objHotel = generarObjHotel(idLlista);
        document.getElementById("lblNomHot" + idLlista).value = objHotel.nom;
        var jsonHotel = JSON.stringify(objHotel);
        document.getElementById("jsonHotel" + idLlista).value = jsonHotel;
        netejarCamps();
        alert("Desat correctament");
    } else {
        alert("Falten dades per completar:\n" + dadesCompletes);
    }
}

//Carregam les dades al main i preparam el botons per desar modificacions i no ficar un nou hotel
function modificarHotel(idLi) {
    var objHotel = new Object();
    objHotel = JSON.parse(document.getElementById("jsonHotel" + idLi).value);
    document.getElementById("nomHotel").value = objHotel.nom;
    document.getElementById("emailHotel").value = objHotel.mail;
    document.getElementById("websiteHotel").value = objHotel.website;
    document.getElementById("telefonHotel").value = objHotel.tel;
    document.getElementById("telefon2Hotel").value = objHotel.tel2;
    document.getElementById("tipusDirHotel").value = objHotel.direccio.tipus;
    document.getElementById("carrerHotel").value = objHotel.direccio.carrer;
    document.getElementById("numHotel").value = objHotel.direccio.num;
    document.getElementById("codipostalHotel").value = objHotel.direccio.codipostal;
    document.getElementById("poblacioHotel").value = objHotel.direccio.poblacio;
    document.getElementById("comunitatHotel").value = objHotel.direccio.comunitat;
    document.getElementById("estrellesHotel").value = objHotel.estrelles;
    document.getElementById("monedaHotel").value = objHotel.moneda;

    for (i = 0; i < objHotel.serveis.length; i++) {
        document.getElementById(objHotel.serveis[i].id).checked = true;
    }
    for (i = 0; i < objHotel.recepcio.length; i++) {
        document.getElementById(objHotel.recepcio[i].id).checked = true;
    }

    if (typeof objHotel.menjador != 'undefined') {     //perque pot no existir: veure https://flaviocopes.com/how-to-check-undefined-property-javascript/
        modificarMenjador(objHotel.menjador)
    }

    for (i = 0; i < objHotel.altres.length; i++) {
        var n = i + 1;
        modificarAltres(n, objHotel.altres[i]);
    }

    for (i = 0; i < objHotel.negocis.length; i++) {
        document.getElementById(objHotel.negocis[i].id).checked = true;
    }

    if (typeof objHotel.mascotes != 'undefined') {
        modificarMascotes(objHotel.mascotes.cost);
        document.getElementById("mascotes").checked = true;
        controlMascotes();
    }
    
    llistaIdiomes = objHotel.idiomes;    //aquí no agafo res de la pàgina, no cal document.
    controlIdiomes();
    document.getElementById("idHotel").value = idLi;
    document.getElementById("modificar").style.display = "inline";
    document.getElementById("afegir").style.display = "none";
}

function modificarMenjador(menjar) {
    if (typeof menjar.berenar != 'undefined') {
        modificarBerenar(menjar.berenar)
        document.getElementById("menjador1").checked = true;
        controlMenjador("menjador1", "dvBerenar");
    }
    if (typeof menjar.sopar != 'undefined') {
        modificarSopar(menjar.sopar)
        document.getElementById("menjador2").checked = true;
        controlMenjador("menjador2", "dvSopar");
    }

    if (typeof menjar.dinar != 'undefined') {
        modificarDinar(menjar.dinar)
        document.getElementById("menjador3").checked = true;
        controlMenjador("menjador3", "dvDinar");
    }
}

function modificarBerenar(menjar) {
    if (menjar.cost == document.getElementById("berenar1").value) {
        document.getElementById("berenar1").checked = true;
    } else {
        document.getElementById("berenar1").checked = false;
        document.getElementById("berenar2").checked = true;
        controlPreuMenjador("berenar2", "dvPreuBerenar");
        document.getElementById("preuBrutBerenar").value = menjar.cost.preuBrut;
        document.getElementById("ivaBerenar").value = menjar.iva;
        mostrarPreuNet('preuBrutBerenar', 'ivaBerenar', 'preuNetBerenar', 'calculBerenar')
        document.getElementById("monedaBerenar").value = menjar.moneda;
    }
}

function modificarSopar(menjar) {
    if (menjar.cost == document.getElementById("sopar1").value) {
        document.getElementById("sopar1").checked = true;
    } else {
        document.getElementById("sopar1").checked = false;
        document.getElementById("sopar2").checked = true;
        controlPreuMenjador("sopar2", "dvPreuSopar");
        document.getElementById("preuBrutSopar").value = menjar.cost.preuBrut;
        document.getElementById("ivaSopar").value = menjar.iva;
        mostrarPreuNet('preuBrutSopar', 'ivaSopar', 'preuNetSopar', 'calculSopar')
        document.getElementById("monedaSopar").value = menjar.moneda;
    }
}

function modificarDinar(menjar) {
    if (menjar.cost == document.getElementById("dinar1").value) {
        document.getElementById("dinar1").checked = true;
    } else {
        document.getElementById("dinar1").checked = false;
        document.getElementById("dinar2").checked = true;
        controlPreuMenjador("dinar2", "dvPreuDinar");
        document.getElementById("preuBrutDinar").value = menjar.cost.preuBrut;
        document.getElementById("ivaDinar").value = menjar.iva;
        mostrarPreuNet('preuBrutDinar', 'ivaDinar', 'preuNetDinar', 'calculDinar')
        document.getElementById("monedaDinar").value = menjar.moneda;
    }
}

function modificarAltres(n, element) {
    var idPagament = "pagament" + n;
    document.getElementById(idPagament).checked = true;
    var dvPagament = "subelementPagament" + n;
    var arrayPagament = new Array();
    for (i = 1; i <= 4; i++) {
        var opcio = idPagament + "opcio" + i;
        arrayPagament.push(opcio);
    }
    if (element.preu != "0") {
        document.getElementById(arrayPagament[1]).checked = true;
        document.getElementById(arrayPagament[2]).value = element.preu;
        document.getElementById(arrayPagament[3]).value = element.moneda;
    }
    controlPagament(idPagament, dvPagament);
}

function modificarMascotes(mascota) {
    if (mascota == document.getElementById("preuMascotaD").value) {
        document.getElementById("preuMascotaD").checked = true;
    } else {
        document.getElementById("preuMascotaD").checked = false;
        if (mascota == document.getElementById("preuMascotaN").value) {
            document.getElementById("preuMascotaN").checked = true;
        } else {
            document.getElementById("preuMascotaY").checked = true;
            document.getElementById("preuMascotes").value = mascota.preu;
            document.getElementById("monedaMascota").value = mascota.moneda;
            if (mascota.tipus == document.getElementById("preuMascotes3").value) {
                document.getElementById("preuMascotes3").checked = true;
            } else {
                document.getElementById("preuMascotes3").checked = false;
                if (mascota.tipus == document.getElementById("preuMascotes2").value) {
                    document.getElementById("preuMascotes2").checked = true;
                } else {
                    document.getElementById("preuMascotes1").checked = true;
                }
            }
        }
    }
}

//Deixam tots els camps sense valors, per realitzar la pròxima operació.
function netejarCamps() {
    document.getElementById("nomHotel").value = "";
    document.getElementById("emailHotel").value = "";
    document.getElementById("websiteHotel").value = "";
    document.getElementById("telefonHotel").value = "";
    document.getElementById("telefon2Hotel").value = "";
    document.getElementById("tipusDirHotel").value = 0;
    document.getElementById("carrerHotel").value = "";
    document.getElementById("numHotel").value = "";
    document.getElementById("codipostalHotel").value = "";
    document.getElementById("poblacioHotel").value = "";
    document.getElementById("comunitatHotel").value = 0;
    document.getElementById("estrellesHotel").value = 0;
    document.getElementById("monedaHotel").value = 0;
    var checks = agafarChecks();
    for (i = 0; i < checks.length; i++) {
        document.getElementById(checks[i].id).checked = false;
    }
    netejarMenjador();
    netejarMascotes();
    controlNetejaPagament();
    llistaIdiomes = [];
    document.getElementById("idiomesHotel").value = "espanyol";
    document.getElementById("idHotel").value = "";
    controlInicial();
    //Deixam la visibilitat dels botons per defecte.
    document.getElementById("modificar").style.display = "none";
    document.getElementById("afegir").style.display = "inline";
}

function netejarMenjador() {
    document.getElementById("menjador1").checked = false;
    document.getElementById("berenar1").checked = true;
    document.getElementById("berenar2").checked = false;
    document.getElementById("preuBrutBerenar").value = "";
    document.getElementById("ivaBerenar").value = "";
    document.getElementById("preuNetBerenar").value = "";
    document.getElementById("monedaBerenar").value = "0";
    document.getElementById("menjador2").checked = false;
    document.getElementById("sopar1").checked = true;
    document.getElementById("sopar2").checked = false;
    document.getElementById("preuBrutSopar").value = "";
    document.getElementById("ivaSopar").value = "";
    document.getElementById("preuNetSopar").value = "";
    document.getElementById("monedaSopar").value = "0";
    document.getElementById("menjador3").checked = false;
    document.getElementById("dinar1").checked = true;
    document.getElementById("dinar2").checked = false;
    document.getElementById("preuBrutDinar").value = "";
    document.getElementById("ivaDinar").value = "";
    document.getElementById("preuNetDinar").value = "";
    document.getElementById("monedaDinar").value = "0";
}

function netejarMascotes() {
    document.getElementById("preuMascotaY").checked = false;
    document.getElementById("preuMascotaN").checked = false;
    document.getElementById("preuMascotaD").checked = true;
    document.getElementById("preuMascotes").value = "";
    document.getElementById("monedaMascota").value = "0";
    document.getElementById("preuMascotes1").checked = false;
    document.getElementById("preuMascotes2").checked = false;
    document.getElementById("preuMascotes3").checked = true;
}

//Per evitar a la neteja una llista eterna amb document.getElementById("mascotes").checked = false; per tots els checkbox
function agafarChecks() {
    var checkboxes = document.getElementsByName("checkboxs");
    console.log(checkboxes);
    var checkboxesTrue = [];
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesTrue.push(checkboxes[i]);
        }
    }
    //console.log("los que estan seleccionados: " + checkboxesTrue.length);
    //Per tornar l'array si no és nul o buit
    return checkboxesTrue;
}

//Eliminar un hotel. Seleccionat l'hotel l'eliminam de la llista.
function eliminarHotel(idLi) {
    var hotel = document.getElementById("liHotel" + idLi);
    if (!hotel) {
        alert("L'hotel seleccionat no existeix.");
    } else {
        if (confirm("Segur que vols eliminar l'hotel?")) {
            var nodePare = hotel.parentNode;
            nodePare.removeChild(hotel);
            alert("Eliminat correctament.");
            netejarCamps();
        }
    }
}

//Només canviaré la moneda dels subselects si no he escollit res abans
function canviarMoneda() {
    var monedaGlobal = document.getElementById("monedaHotel").value;
    for (i = 0; i < arrMonedes.length; i++) {
        if (document.getElementById(arrMonedes[i]).value == "0") {
            document.getElementById(arrMonedes[i]).value = monedaGlobal;
        }
    }
}

//Aquesta funció només calcula i mostra preubrut*iva del que sigui:
function mostrarPreuNet(brut, iva, net, boto) {
    var impost = (document.getElementById(brut).value * document.getElementById(iva).value / 100);
    var preunet = parseInt(impost) + parseInt(document.getElementById(brut).value);         //He de fer parseInt o fa concat com a strings
    document.getElementById(net).value = preunet;
    document.getElementById(boto).checked = false;
}

//Aquí comencen les funcions de control de visibilitat:
function controlInicial() {
    controlMenjador("menjador1", "dvBerenar");
    controlPreuMenjador("berenar2", "dvPreuBerenar");
    controlMenjador("menjador2", "dvSopar");
    controlPreuMenjador("sopar2", "dvPreuSopar");
    controlMenjador("menjador2", "dvDinar");
    controlPreuMenjador("dinar2", "dvPreuDinar");
    controlMascotes();
    controlIdiomes();
    controlNetejaPagament();
}

function controlMenjador(concepte, dvconcepte) {
    if (document.getElementById(concepte).checked == true) {
        document.getElementById(dvconcepte).style.display = "block";
    } else {
        document.getElementById(dvconcepte).style.display = "none";
    }
}

//Vull veure de fer un únic control, passaré els ids per paràmetre
function controlPreuMenjador(concepte, dvconcepte) {
    if (document.getElementById(concepte).checked == true) {
        document.getElementById(dvconcepte).style.display = "inline-block";
    } else {
        document.getElementById(dvconcepte).style.display = "none";
    }
}

function controlMascotes() {
    if (document.getElementById("mascotes").checked == true) {
        document.getElementById("dvMascotes").style.display = "block";
    } else {
        document.getElementById("dvMascotes").style.display = "none";
    }
    controlDisableMascotes();
}

function controlDisableMascotes() {
    if (!document.getElementById("preuMascotaY").checked) {
        document.getElementById("preuMascotes").disabled = true;
        document.getElementById("monedaMascota").disabled = true;
        document.getElementById("preuMascotes1").disabled = true;
        document.getElementById("preuMascotes2").disabled = true;
        document.getElementById("preuMascotes3").disabled = true;
    } else {
        document.getElementById("preuMascotes").disabled = false;
        document.getElementById("monedaMascota").disabled = false;
        document.getElementById("preuMascotes1").disabled = false;
        document.getElementById("preuMascotes2").disabled = false;
        document.getElementById("preuMascotes3").disabled = false;
    }
}

function controlIdiomes() {
    if (llistaIdiomes.length == 0) {
        document.getElementById("dvIdiomes").style.display = "none";
    } else {
        document.getElementById("textIdiomes").innerText = "Idiomes afegits: " + llistaIdiomes.join(", ");
        document.getElementById("dvIdiomes").style.display = "block";
    }
}

//Per que no es puguin seleccionar les subopcions d'altres serveis directament i per netejar
function controlNetejaPagament() {
    for (i = 1; i <= NUMALTRES; i++) {        //funciona com la creació d'array a serveis
        var idPagament = "pagament" + i;
        var dvPagament = "subelementPagament" + i;
        document.getElementById(idPagament).checked = false;
        controlPagament(idPagament, dvPagament);
    }
}

function controlPagament(concepte, dvconcepte) {
    if (document.getElementById(concepte).checked) {
        document.getElementById(dvconcepte).style.display = "inline-block";
        controlDisablePagament(concepte);
    } else {
        document.getElementById(dvconcepte).style.display = "none";
    }
}

function controlDisablePagament(concepte) {
    var arrayPagament = new Array();
    for (i = 1; i <= 4; i++) {
        var idOpcio = concepte + "opcio" + i;
        arrayPagament.push(idOpcio);
    }
    if (!document.getElementById(arrayPagament[1]).checked) {
        document.getElementById(arrayPagament[2]).disabled = true;
        document.getElementById(arrayPagament[3]).disabled = true;
    } else {
        document.getElementById(arrayPagament[2]).disabled = false;
        document.getElementById(arrayPagament[3]).disabled = false;
    }
}
