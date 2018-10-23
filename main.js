// console.log('hello there');

// let httpRequest = new XMLHttpRequest();

//example code below

// httpRequest.onreadystatechange = function(){
//     if (httpRequest.readyState == 4 && httpRequest.status == 200){
//         document.getElementById('demo').innerHTML = httpRequest.responseText;
//     }
// };
// httpRequest.open('GET','http://puppybarn.com/puppies',true);
// httpRequest.send();


// let pokemon;
//
// let httpRequest = new XMLHttpRequest();
// httpRequest.onreadystatechange = () => {
//     if (httpRequest.readyState == XMLHttpRequest.DONE){
//         let response = JSON.parse(httpRequest.response);
//         pokemon = response.results;
//         console.log(pokemon);
//     }
// };
// httpRequest.open('GET','https://pokeapi.co/api/v2/pokemon/');
// httpRequest.send();

//226 x 314 pixel card back needed

class Deck{
    constructor(deckID,pOneCards,pTwoCards,pOneScore,pTwoScore){
        this.deckID = deckID;
        this.pOneCards = pOneCards;
        this.pOneScore = pOneScore;
        this.pTwoCards = pTwoCards;
        this.pTwoScore = pTwoScore;
    }
}

class Card{
    constructor(value,face){
        this.value = value;
        this.face = face;
    }
}


let deckID;
let allCards;
let first = false;
let pOneCardsHere = document.getElementById('pOneCardsHere');
let pTwoCardsHere = document.getElementById('pTwoCardsHere');
let currentScore = 0;
let currentPlayer = 0;

function loseCheck(aScore){
    if (aScore > 21){
        return "You Lost!"
    }
    else{
        return "";
    }
}

function addScore(one,two){
    let score =0;
    switch (one[0]){
        case "2":
            score += 2;
            break;
        case "3":
            score += 3;
            break;
        case "4":
            score += 4;
            break;
        case "5":
            score += 5;
            break;
        case "6":
            score += 6;
            break;
        case "7":
            score += 7;
            break;
        case "8":
            score += 8;
            break;
        case "9":
            score += 9;
            break;
        case "0":
            score += 10;
            break;
        case "J":
            score += 10;
            break;
        case "Q":
            score += 10;
            break;
        case "K":
            score += 10;
            break;
        case "A":
            score += 1;
            break;
    }
    if (two != undefined){
        score += addScore(two);
        // currentScore += score;
    }
    return score;
}

function drawCardPOne(deckID){
    let myRequestTwo = new XMLHttpRequest();
    myRequestTwo.onreadystatechange = function() {
        if (myRequestTwo.readyState == myRequestTwo.DONE){
            let myResponse = JSON.parse(myRequestTwo.response);
            if (myResponse.success){
                // var card = myResponse.cards[0].code;
                // var cIMG = myResponse.cards[0].image;
                theDeck.pOneCards.push(new Card(myResponse.cards[0].code,myResponse.cards[0].image));

                let someCards = '';
                for (let i = 0;i < theDeck.pOneCards.length;i++){
                    someCards += `<img src="./back.png" alt="a card here">`
                }
                pOneCardsHere.innerHTML = someCards;

                theDeck.pOneScore= theDeck.pOneScore + addScore(theDeck.pOneCards[0].value);
                // allCards += `<img src="${cIMG}" alt="a card">`;
                // cardsHere.innerHTML = allCards;

            }

            // console.log(myResponse);
            // console.log(card);
            // let myScore = addScore(card);
            // currentScore += myScore;
            // let ifLost = "";
            // ifLost = loseCheck(currentScore);
            // document.getElementById('playerScore').innerHTML = `Score: ${currentScore}`;
            // document.getElementById('loseHere').innerHTML = ifLost;
        }
    };
    myRequestTwo.open('GET',`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    myRequestTwo.send();
}

function showPOneCards(){
    let pOneCards = '';
    for (let i = 0;i < theDeck.pOneCards.length;i++){
        pOneCards += `<img src="${theDeck.pOneCards[i].face}" alt="a card here">`;
    }
    pOneCardsHere.innerHTML = pOneCards;
    document.getElementById('playerOneScore').style.display = 'block';
    document.getElementById('playerOneScore').innerHTML = `Score: ${theDeck.pOneScore}`;
}
function hideCards(){
    let allFaces = document.getElementsByTagName('img');
    for (let i = 0; i < allFaces.length; i++){
        allFaces[i].setAttribute('src','./back.png');
    }
    document.getElementById('playerOneScore').style.display = 'none';
    document.getElementById('playerTwoScore').style.display = 'none';
}

function drawCardPTwo(deckID){
    let myRequestTwo = new XMLHttpRequest();
    myRequestTwo.onreadystatechange = function() {
        if (myRequestTwo.readyState == myRequestTwo.DONE){
            let myResponse = JSON.parse(myRequestTwo.response);
            if (myResponse.success){
                // var card = myResponse.cards[0].code;
                // var cIMG = myResponse.cards[0].image;
                theDeck.pTwoCards.push(new Card(myResponse.cards[0].code,myResponse.cards[0].image));

                let someCards = '';
                for (let i = 0;i < theDeck.pTwoCards.length;i++){
                    someCards += `<img src="./back.png" alt="a card here">`
                }
                pTwoCardsHere.innerHTML = someCards;

                theDeck.pTwoScore= theDeck.pTwoScore + addScore(theDeck.pTwoCards[0].value);
                // allCards += `<img src="${cIMG}" alt="a card">`;
                // cardsHere.innerHTML = allCards;

            }

            // console.log(myResponse);
            // console.log(card);
            // let myScore = addScore(card);
            // currentScore += myScore;
            // let ifLost = "";
            // ifLost = loseCheck(currentScore);
            // document.getElementById('playerScore').innerHTML = `Score: ${currentScore}`;
            // document.getElementById('loseHere').innerHTML = ifLost;
        }
    };
    myRequestTwo.open('GET',`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
    myRequestTwo.send();
}

function showPTwoCards(){
    let pTwoCards = '';
    for (let i = 0;i < theDeck.pTwoCards.length;i++){
        pTwoCards += `<img src="${theDeck.pTwoCards[i].face}" alt="a card here">`;
    }
    pTwoCardsHere.innerHTML = pTwoCards;
    document.getElementById('playerTwoScore').style.display = 'block';
    document.getElementById('playerTwoScore').innerHTML = `Score: ${theDeck.pTwoScore}`;
}

// function drawCardPTwo(deckID){
//     let myRequestTwo = new XMLHttpRequest();
//     myRequestTwo.onreadystatechange = function() {
//         if (myRequestTwo.readyState == myRequestTwo.DONE){
//             let myResponse = JSON.parse(myRequestTwo.response);
//             if (myResponse.success){
//                 var card = myResponse.cards[0].code;
//                 var cIMG = myResponse.cards[0].image;
//
//                 allCards += `<img src="${cIMG}" alt="a card">`;
//                 cardsHere.innerHTML = allCards;
//
//             }
//
//             console.log(myResponse);
//             console.log(card);
//             let myScore = addScore(card);
//             currentScore += myScore;
//             let ifLost = "";
//             ifLost = loseCheck(currentScore);
//             document.getElementById('playerScore').innerHTML = `Score: ${currentScore}`;
//             document.getElementById('loseHere').innerHTML = ifLost;
//         }
//     };
//     myRequestTwo.open('GET',`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
//     myRequestTwo.send();
// }

function initialDrawCard(deckID){
    let myRequestThree = new XMLHttpRequest();
    myRequestThree.onreadystatechange = function() {
        if (myRequestThree.readyState == myRequestThree.DONE){
            let myResponse = JSON.parse(myRequestThree.response);
            if (myResponse.success){
                 var thecards = myResponse.cards;
                // var card = myResponse.cards[0].code;
                theDeck.pOneCards.push(new Card(thecards[0].code,thecards[0].image));
                // var cIMG = myResponse.cards[0].image;
                // var cardTwo = myResponse.cards[1].code;
                // var cIMGTwo = myResponse.cards[1].image;
                theDeck.pOneCards.push(new Card(thecards[1].code,thecards[1].image));
                theDeck.pTwoCards.push(new Card(thecards[2].code,thecards[2].image));
                theDeck.pTwoCards.push(new Card(thecards[3].code,thecards[3].image));
                if (first === false){
                    document.getElementById('cardIMG').setAttribute('src','./back.png');
                    document.getElementById('card2').setAttribute('src','./back.png');
                    document.getElementById('p2cardIMG').setAttribute('src','./back.png');
                    document.getElementById('p2card2').setAttribute('src','./back.png');
                    // allCards = cardsHere.innerHTML;
                    first = true;
                }
                else{
                    pOneCardsHere.innerHTML = '<img src="./back.png" alt="a card here"><img src="./back.png" alt="a card here">';
                    pTwoCardsHere.innerHTML = '<img src="./back.png" alt="a card here"><img src="./back.png" alt="a card here">';

                    // cardsHere.innerHTML = allCards;
                }
            }

            // console.log(myResponse);
            // console.log(card);
            // console.log(cardTwo);

            theDeck.pOneScore= addScore(theDeck.pOneCards[0].value,theDeck.pOneCards[1].value);
            theDeck.pTwoScore= addScore(theDeck.pTwoCards[0].value,theDeck.pTwoCards[1].value);
            // let myScore = addScore(card,cardTwo);
            // currentScore += myScore;
            // let ifLost = "";
            // ifLost = loseCheck(currentScore);
            // document.getElementById('playerScore').innerHTML = `Score: ${currentScore}`;
            // document.getElementById('loseHere').innerHTML = ifLost;

        }
    };
    myRequestThree.open('GET',`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`);
    myRequestThree.send();
}

let myRequest = new XMLHttpRequest();
myRequest.onreadystatechange = function() {
    // if (first === true){
    //     currentScore -= currentScore;
    //     allCards = "";
    //     pOneCardsHere.innerHTML = allCards;
    //     pTwoCardsHere.innerHTML = allCards;
    // }

    // first = false;
    if (myRequest.readyState == myRequest.DONE){
        let response = JSON.parse(myRequest.response);
        if (response.success){
            console.log(response);
            theDeck = undefined;
            let newDeck = new Deck(response.deck_id,[],[],0,0);
            theDeck = newDeck;
            // theDeck.deckID = response.deck_id;
            }
            console.log(response);
            console.log(theDeck.deckID);
            initialDrawCard(theDeck.deckID);
            hideCards();
            }
    };
myRequest.open('GET','https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
myRequest.send();

function newDeck(){
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function() {
        // if (first === true){
        //     currentScore -= currentScore;
        //     allCards = "";
        //     pOneCardsHere.innerHTML = allCards;
        //     pTwoCardsHere.innerHTML = allCards;
        // }

        // first = false;
        if (myRequest.readyState == myRequest.DONE){
            let response = JSON.parse(myRequest.response);
            if (response.success){
                console.log(response);
                theDeck = undefined;
                let newDeck = new Deck(response.deck_id,[],[],0,0);
                theDeck = newDeck;
                // theDeck.deckID = response.deck_id;
            }
            console.log(response);
            console.log(theDeck.deckID);
            initialDrawCard(theDeck.deckID);
            hideCards();
        }
    };
    myRequest.open('GET','https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    myRequest.send();
}


