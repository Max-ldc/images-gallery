
// déclarations //

let zone1 = document.querySelector(".zone1");
let zone2 = document.querySelector(".zone2");
let zone1Nom = document.querySelector(".nom");
let zone1Cat = document.querySelector(".categorie");
let zone1Prix = document.querySelector(".prix");
let zoneInfos = document.querySelector(".infos"); // pour l'amélioration du bandeau info
let contenuInfos = document.querySelector(".contenuInfos"); // same

/************ MISE EN PLACE OBJETS & VIGNETTES : ************/

let elements = [
    {image:"./img/animal1.jpg" , nom:"Paon" , categorie:"animaux" , prix:200},
    {image:"./img/animal2.jpg" , nom:"Loup" , categorie:"animaux" , prix:200},
    {image:"./img/animal3.jpg" , nom:"Renard" , categorie:"animaux" , prix:200},
    {image:"./img/animal4.jpg" , nom:"Rhinocéros" , categorie:"animaux" , prix:200},
    {image:"./img/paysage1.jpg" , nom:"Forêt" , categorie:"paysages" , prix:100},
    {image:"./img/paysage2.jpg" , nom:"Haute-Montagne" , categorie:"paysages" , prix:100},
    {image:"./img/paysage3.jpg" , nom:"Vallée" , categorie:"paysages" , prix:100},
    {image:"./img/paysage4.jpg" , nom:"Plage" , categorie:"paysages" , prix:100},
    {image:"./img/personne1.jpg" , nom:"Femme au milieu des fleurs" , categorie:"personnes" , prix:300},
    {image:"./img/personne2.jpg" , nom:"Femme sur fond gris" , categorie:"personnes" , prix:300},
    {image:"./img/personne3.jpg" , nom:"Silhouette de garçon" , categorie:"personnes" , prix:300},
    {image:"./img/personne4.jpg" , nom:"Couple devant la mer" , categorie:"personnes" , prix:300},
]

function majGalerie(askedCat){
    
    // on supprime toutes les vignettes pour ensuite afficher celles qui sont demandées :
    let vignettes = document.querySelectorAll(".vignette");
    vignettes.forEach( (e) => {
        e.remove();
    })
    
    if (askedCat==""){          // Si on demande tout = le tri prend tout le tableau elements
        var elementsFiltres = elements;
        console.log("ok");
    }else{                      // Sinon, on filtre en fonction du type demandé :
        var elementsFiltres = elements.filter(
            (item) => {
                return item.categorie == askedCat;      // retourne les élements dont la categorie correspond à celle demandée
            }
            );
        }
        
        // On change la zone 1 avec le premier élément de la liste filtrée :
        changeZone1(elementsFiltres[0]);
        
    // On affiche donc seulement les éléments triés :
    elementsFiltres.forEach(
        (element,i) => {
            let addElement = document.createElement("div");         // div vignette
            let addImage = document.createElement("figcaption");    // partie image de la vignette
            let addTitre = document.createElement("figcapture");    // partie titre
            
            addImage.innerHTML = ` <img src="${element.image}"></img>`  // on place l'image
            addTitre.innerHTML = `<h3>${element.nom}</h3>`              // on place le titre
            
            addElement.className = "vignette";          // class vignette sur chacune
            addElement.id = `v${i}`;                    // id v0 puis v1 puis v2, etc...
            
            // ECOUTEURS D'EVENEMENTS POUR LES VIGNETTES //
            addElement.onmouseover = (e) => {       // en hover , ombre violette + léger zoom
                addElement.style.boxShadow = "0 0 15px rgba(128,0,128,0.7)";
                addElement.style.transform = "scale(1.08)";
            }
            addElement.onmouseout = (e) => {        // hors hover, ombre légère noire + no zoom
                addElement.style.boxShadow = "0 0 8px rgba(0,0,0,0.3)";
                addElement.style.transform = "scale(1)";
            }
            addElement.onclick = (e) => {changeZone1(element);};     // appel fonction changement zone 1 au clic d'une vignette
            
            addElement.appendChild(addImage);       // ajout de l'image dans la div vignette
            addElement.appendChild(addTitre);       // ajout du titre
            zone2.appendChild(addElement);      // ajout de la vignette complète dans la zone2
        }
    )
}

/************ MODIF ZONE 1 ************/

function changeZone1(e){
    zone1.style.background = `url(${e.image}) center/cover no-repeat`;
    zone1Nom.innerHTML = `${e.nom}`;
    zone1Cat.innerHTML = `${e.categorie}`;
    zone1Prix.innerHTML = `${e.prix} €`;
    
    
// AMELIORATION : intéraction avec le bandeau d'infos de la zone 1
zone1.onmouseover = resetInfos;   // on ferme le bandeau info au survol, pour mieux voir l'image
zone1.onmouseout = putInfos;  // on rouvre le bandeau info en dehors du survol
}

// AMELIORATION : fonctions pour l'intéraction avec le bandeau //
function resetInfos(){
    contenuInfos.style.display = "none";    // cache le contenu
    zoneInfos.style.width = "auto";        // rapticit le bandeau : elle fait la taille de la flèche + padding
    zoneInfos.style.padding = "10px";       // rapticit le padding pour la flèche
    
    let addFleche = document.createElement("span"); // création d'une flèche pour indiquer d'ouvrir le bandeau
    addFleche.style.fontSize = "8rem";
    addFleche.style.color = "white";
    addFleche.innerHTML = `&lt;`;
    addFleche.fontWeight = "bold";
    
    zoneInfos.appendChild(addFleche);
}
function putInfos(){
    let fleche = zoneInfos.querySelector("span");
    fleche.remove();        // on supprime la flèche créée par resetInfos()

    contenuInfos.style.display = "flex";    // on rétabli le contenu
    zoneInfos.style.width = "30%";          // on agrandit le bandeau
    zoneInfos.style.padding = "50px";       // on remet le padding
}

// APPEL CHARGEMENT DE PAGE //

majGalerie("");

// AMELIORATION : petit reset du select au rechargement de la page :
onload = () => { document.querySelector("#filtre").value = "" };