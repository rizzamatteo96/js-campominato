//TODO Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.
//TODO In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
//TODO Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
//TODO Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
//TODO BONUS: (da fare solo se funziona tutto il resto) all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali: con difficoltà 0 => tra 1 e 100 con difficoltà 1 => tra 1 e 80 con difficoltà 2 => tra 1 e 50


// 1. Generare i 16 numeri casuali che andranno a definire le "bombe"
var bombe = [];
var bombeMin = 1;
var bombeMax = 100;
var numeroBombe = 16;
while (bombe.length < numeroBombe){
    var numGen = rndNumber(bombeMin,bombeMax);
    if(!bombe.includes(numGen)){
        bombe.push(numGen);
    }
}
console.log(bombe);







//! -----------SEZIONE PER LE FUNZIONI-----------
function rndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }