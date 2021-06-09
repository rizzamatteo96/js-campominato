//TODO 1) Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.

//TODO 2) In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
//TODO Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero. La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.

//TODO 3) Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

//TODO BONUS: (da fare solo se funziona tutto il resto) all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali: con difficoltà 0 => tra 1 e 100 con difficoltà 1 => tra 1 e 80 con difficoltà 2 => tra 1 e 50


// dichiarazione delle variabili globali
var bombeMin;
var bombeMax;
var bombe = [];
var numeroBombe = 16;
var saveUserNum = [];
var endGame = false;


//*BONUS Impostare livello di difficoltà del gioco
document.getElementById('btn-lvl').addEventListener('click', function(){
    var userLvl = parseInt(document.getElementById('level').value);
    console.log(userLvl);
    // Check se il numero inserito può essere accettato o meno dal sistema
    if(checkRange(0,2,userLvl)){
        switch (userLvl){
            case 0:
                //imposta valori per la difficoltà 0
                bombeMin = 1;
                bombeMax = 100;
                break;
            case 1:
                //imposta valori per la difficoltà 1
                bombeMin = 1;
                bombeMax = 80;
                break;
            case 2:
                //imposta valori per la difficoltà 2
                bombeMin = 1;
                bombeMax = 50;
                break;
        }
        console.log('min' + bombeMin);
        console.log('max' + bombeMax);
    } 
    else{
        alert('Attenzione!!!! Non hai inserito un livello coerente');
        document.getElementById('level').value = '';
    }

    // 1. Generare i 16 numeri casuali che andranno a definire le "bombe"
    while (bombe.length < numeroBombe){
        // genera un numero random
        var numGen = rndNumber(bombeMin,bombeMax);
        if(!bombe.includes(numGen)){
            //controllo che il numero generato non sia già presente e lo inserisco nell'array di riferimento
            bombe.push(numGen);
        }
    }
    console.log(bombe);

    // faccio scomparire la sezione di selezione del livello e faccio apparire quella di gioco
    document.getElementById('game-lvl').className = 'd-none';
    document.getElementById('game').className = 'text-center d-block pt-1';

});


// Dopo aver inserito un numero e aver premuto il tasto, il programma controlla le varie condizioni del caso per fare in modo di dare un allarme, inserire il numero o bloccare il gioco
document.getElementById('btn-game').addEventListener('click', function(){
    if(saveUserNum.length < bombeMax - numeroBombe && !endGame){
        var numUser = parseInt(document.getElementById('user-number').value);
        document.getElementById('user-number').value = '';
        if (!bombe.includes(numUser) && !saveUserNum.includes(numUser) && !isNaN(numUser) && checkRange(bombeMin,bombeMax,numUser)){
            //il numero è accettato dal sistema quindi lo salvo nell'array
            saveUserNum.push(numUser);
            document.getElementById('added-numbers').innerHTML = saveUserNum;
        }
        else if(isNaN(numUser)){
            //il dato inserito dall'utente non è un numero
            alert('Il dato inserito non è un numero!!!');
        }
        else if(saveUserNum.includes(numUser)){
            //il numero inserito dall'utente era già stato scritto in precedenza
            alert('Il numero "' + numUser + '" è già stato scritto in precedenza');
        }
        else if(!checkRange(bombeMin,bombeMax,numUser)){
            //il numero inserito dall'utente non è compreso tra i numeri minimi e massimi
            alert('Il numero ' + numUser + ' è fuori dai limiti imposti. Devi usare un numero tra ' + bombeMin + ' e ' + bombeMax)
        }
        else {
            //l'utente ha "preso una bomba" e quindi ha perso
            endGame = true;
            document.getElementById('main-container').className = 'd-none';
            document.getElementById('esplosione').className = 'd-block text-center';
            document.getElementById('user-score').innerHTML += saveUserNum.length + ' numeri prima di morire';
            alert('Hai perso');
        }
    }
    else {
        // l'utente ha vinto
    }
});

/*
while(saveUserNum.length < bombeMax - numeroBombe && !endGame){
    var numUser = parseInt(prompt('Inserisci un numero tra ' + bombeMin + ' e ' + bombeMax));
    if (!bombe.includes(numUser) && !saveUserNum.includes(numUser) && !isNaN(numUser) && checkRange(bombeMin,bombeMax,numUser)){
        //il numero è accettato dal sistema quindi lo salvo nell'array
        saveUserNum.push(numUser);
    }
    else if(isNaN(numUser)){
        //il dato inserito dall'utente non è un numero
        alert('Il dato inserito non è un numero!!!');
    }
    else if(saveUserNum.includes(numUser)){
        //il numero inserito dall'utente era già stato scritto in precedenza
        alert('Il numero "' + numUser + '" è già stato scritto in precedenza');
    }
    else if(!checkRange(bombeMin,bombeMax,numUser)){
        //il numero inserito dall'utente non è compreso tra i numeri minimi e massimi
        alert('Il numero ' + numUser + ' è fuori dai limiti imposti. Devi usare un numero tra ' + bombeMin + ' e ' + bombeMax)
    }
    else {
        //l'utente ha "preso una bomba" e quindi ha perso
        alert('Hai perso');
        endGame = true;
    }
}

if(!endGame){
    console.log('Hai vinto!!!!!!');
}
console.log(saveUserNum);

// 3. Comunicare quanti numeri sono stati scritti dall'utente prima di perdere
console.log('l\'utente è riuscito ad inserire ' + saveUserNum.length + ' numeri. La percentuale di vincita è pari a ' + numPercentage(bombeMax - numeroBombe,saveUserNum.length) + '%');*/






//! -----------SEZIONE PER LE FUNZIONI-----------
function rndNumber(min, max) {
    // funzione che genera un numero random compreso tra min e max inclusi
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkRange(min,max,val){
    // funzione che verifica che val sia compreso tra min e max
    return val >= min && val <= max;
}

function numPercentage(max, val){
    // funzione che restituisce la percentuale di val considerando max come 100%
    return (max / 100 * val).toFixed(2);
}