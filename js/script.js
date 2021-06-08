//TODO 1) Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.

//TODO 2) In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
//TODO Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.

//TODO 3) Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

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


// 2. Richiedere all'utente un numero tra 1 e 100 e verificare che non sia già stato scritto
var saveUserNum = [];
var endGame = false;

while(saveUserNum.length < bombeMax - numeroBombe && !endGame){
    var numUser = parseInt(prompt('Inserisci un numero tra 1 e 100'));
    if (!bombe.includes(numUser) && !saveUserNum.includes(numUser) && !isNaN(numUser) && checkRange(bombeMin,bombeMax,numUser)){
        saveUserNum.push(numUser);
    }
    else if(isNaN(numUser)){
        alert('Il dato inserito non è un numero!!!');
    }
    else if(saveUserNum.includes(numUser)){
        alert('Il numero "' + numUser + '" è già stato scritto in precedenza');
    }
    else if(!checkRange(bombeMin,bombeMax,numUser)){
        alert('Il numero ' + numUser + ' è fuori dai limiti imposti. Devi usare un numero tra ' + bombeMin + ' e ' + bombeMax)
    }
    else {
        alert('Hai perso');
        endGame = true;
    }
}

console.log(saveUserNum);

// 3. Comunicare quanti numeri sono stati scritti dall'utente prima di perdere
console.log('l\'utente è riuscito ad inserire ' + saveUserNum.length + ' numeri. La percentuale di vincita è pari a ' + winPercentage(bombeMax - numeroBombe,saveUserNum.length) + '%');





//! -----------SEZIONE PER LE FUNZIONI-----------
function rndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function checkRange(min,max,val){
    return val >= min && val <= max;
}

function winPercentage(max, val){
    return max / 100 * val;
}