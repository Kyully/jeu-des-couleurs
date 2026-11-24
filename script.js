
const couleurs = ["#E63946", "#F4A261", "#FFD60A", "#2DC653", "#3A86FF", "#9D4EDD"];

let vies = 3;
let score = 0;
let record = 0;

let vitesse = 2000;

let couleurFond = "";
let couleurBouton = "";

let partieEnCours = false;

let minuteur = null;

const zoneJeu = document.querySelector("#zone-jeu");
const scoreElement = document.querySelector("#score");
const recordElement = document.querySelector("#meilleur-score");
const messageElement = document.querySelector("#message");

const boutonJeu = document.querySelector("#bouton-jeu");
const boutonRestart = document.querySelector("#bouton-restart");

const coeurs = document.querySelectorAll(".coeur");
const boutonsDifficulte = document.querySelectorAll(".choix");

function couleurAleatoire() {
    let numero = Math.floor(Math.random() * couleurs.length);
    return couleurs[numero];
}

function changerCouleurs() {
    couleurFond = couleurAleatoire();
    zoneJeu.style.backgroundColor = couleurFond;

    if (Math.random() < 0.5) {
        couleurBouton = couleurFond;
    } else {
        couleurBouton = couleurAleatoire();
    }
    boutonJeu.style.backgroundColor = couleurBouton;
}

function afficher() {
    scoreElement.textContent = score;
    recordElement.textContent = record;

    for (let i = 0; i < coeurs.length; i++) {
        if (i < vies) {
            coeurs[i].classList.remove("hidden");
        } else {
            coeurs[i].classList.add("hidden");
        }
    }
}

function lancerMinuteur() {
    clearInterval(minuteur);                 
    minuteur = setInterval(changerCouleurs, vitesse);  
}

function demarrerPartie() {
    score = 0;
    vies = 3;
    partieEnCours = true;
    boutonRestart.disabled = false;

    changerCouleurs();
    lancerMinuteur();
    afficher();

    messageElement.textContent = "Clique quand le bouton a la même couleur que le fond !";
}

function terminerPartie() {
    partieEnCours = false;
    clearInterval(minuteur);   

    if (score > record) {
        record = score;
    }

    afficher();
    messageElement.textContent = "Partie terminée !";
}

function jouer() {
    if (partieEnCours === false) {
        demarrerPartie();
        return;
    }

    if (couleurBouton === couleurFond) {
        score = score + 1;
        messageElement.textContent = "Bravo !" ;

        vitesse = vitesse - 40;
        if (vitesse < 600) {
            vitesse = 600;  
        }
    } else {
        vies = vies - 1;
        messageElement.textContent = "Oups !";
    }

    if(score > 2){
        scoreElement.classList.add("brille");
    }

    afficher();

    if (vies <= 0) {
        terminerPartie();
    } else {
        changerCouleurs();
        lancerMinuteur();
    }
}

function choisirDifficulte(nouvelleVitesse, boutonClique) {
    vitesse = nouvelleVitesse;

    for (let i = 0; i < boutonsDifficulte.length; i++) {
        boutonsDifficulte[i].classList.remove("actif");
    }

    boutonClique.classList.add("actif");

    if (partieEnCours === true) {
        demarrerPartie();
    }
}


boutonJeu.addEventListener("click", jouer);

boutonRestart.addEventListener("click", demarrerPartie);

boutonsDifficulte[0].addEventListener("click", function () {
    choisirDifficulte(2000, boutonsDifficulte[0]);   // Facile
});

boutonsDifficulte[1].addEventListener("click", function () {
    choisirDifficulte(1500, boutonsDifficulte[1]);   // Moyen
});

boutonsDifficulte[2].addEventListener("click", function () {
    choisirDifficulte(1000, boutonsDifficulte[2]);   // Difficile
});


afficher();