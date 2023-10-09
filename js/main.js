//Example fetch using pokemonapi.co
document.querySelector('#start').addEventListener('click', deal)
document.querySelector('#throw').addEventListener('click',throwDown)

let deckId = '';
let p1 = 0;
let p2 = 0;
let p1Count = 0;
let p2Count = 0;
let playerOneCards = [];
let playerTwoCards = [];
let win = [];
let warNumber = 3;

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deckId = data.deck_id
})

.catch(err => {
    console.log(`error ${err}`)
});

function deal(){
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`

fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        for(let i=0; i<52; i++){
          if(i%2 === 0){
            playerOneCards.push(data.cards[i]) 
          }else{
            playerTwoCards.push(data.cards[i])
          }
      }
      document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
      document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
       
      })
      
      .catch(err => {
          console.log(`error ${err}`)
      });
  }

  function throwDown(){
        p1 = convert(playerOneCards[0].value)
        p2 = convert(playerTwoCards[0].value) 
        document.querySelector('#playerOne').src = playerOneCards[0].image; 
        document.querySelector('#playerTwo').src = playerTwoCards[0].image;
        compare(p1,p2)
        document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
        document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
        }

  function convert(value){
    if(value === 'ACE'){
      value = 14;
    }
    else if(value === 'KING'){
      value = 13;
    }else if(value === 'QUEEN'){
      value = 12;
    }else if(value === 'JACK'){
      value = 11;
    }else{
      value = Number(value);
    }
    return value
  }

  function compare(p1, p2){
    console.log(playerOneCards)
        console.log(playerTwoCards)
      if(p1>p2){
        p1Count += 1
        playerOneCards.push(playerOneCards[0],playerTwoCards[0]);
        playerOneCards.shift();
        playerTwoCards.shift();
        document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
        document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
        document.querySelector('#playerOneCardTwo').src =  '';
        document.querySelector('#playerOneCardThree').src = '';
        document.querySelector('#playerOneCardFour').src =  '';
        document.querySelector('#playerTwoCardTwo').src =  '';
        document.querySelector('#playerTwoCardThree').src = '';
        document.querySelector('#playerTwoCardFour').src =  '';
      }
      else if(p1<p2){
        p2Count += 1
        playerTwoCards.push(playerOneCards[0],playerTwoCards[0])
        playerOneCards.shift();
        playerTwoCards.shift();
        document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
        document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
        document.querySelector('#playerOneCardTwo').src =  '';
        document.querySelector('#playerOneCardThree').src = '';
        document.querySelector('#playerOneCardFour').src =  '';
        document.querySelector('#playerTwoCardTwo').src =  '';
        document.querySelector('#playerTwoCardThree').src = '';
        document.querySelector('#playerTwoCardFour').src =  '';
      }
      else if(p1 === p2){
        document.querySelector('#playerOneCardTwo').src = playerOneCards[1].image;
        document.querySelector('#playerOneCardThree').src = playerOneCards[2].image;
        document.querySelector('#playerOneCardFour').src = playerOneCards[3].image; 
        document.querySelector('#playerTwoCardTwo').src = playerTwoCards[1].image;
        document.querySelector('#playerTwoCardThree').src = playerTwoCards[2].image;
        document.querySelector('#playerTwoCardFour').src = playerTwoCards[3].image;
        alert('war')
        console.log('its war')
        war(convert(playerOneCards[3].value), convert(playerTwoCards[3].value))
      }
  }
 
  function war(player1,player2){
    let warComparePlayerOne = convert(playerOneCards[3].value)
    let warComparePlayerTwo = convert(playerTwoCards[3].value)
    if(playerOneCards.length >= 4 && playerTwoCards.length >= 4){  
      console.log(playerOneCards[3].value)
      console.log(playerTwoCards[3].value)
      if( warComparePlayerOne > warComparePlayerTwo){
        p1Count += 1;
        console.log('player 1')
        playerOneCards.splice(0,4);
        playerTwoCards.splice(0,4);
        playerOneCards.push(playerOneCards[0],playerOneCards[1],playerOneCards[2],playerOneCards[3],playerTwoCards[0],playerTwoCards[1],playerTwoCards[2],playerTwoCards[3])
        document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
        document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
      }else if( warComparePlayerOne < warComparePlayerTwo){
        p2Count += 1;
        console.log(playerOneCards[3].value)
      console.log(playerTwoCards[3].value)
        playerOneCards.splice(0,4);
        playerTwoCards.splice(0,4);
        playerTwoCards.push(playerOneCards[0],playerOneCards[1],playerOneCards[2],playerOneCards[3],playerTwoCards[0],playerTwoCards[1],playerTwoCards[2],playerTwoCards[3])
        console.log('player 2')
        document.querySelector('#p1Count').innerText = `Player 1 : ${p1Count} Cards left: ${playerOneCards.length}`
        document.querySelector('#p2Count').innerText = `Player 2 : ${p2Count} Cards left: ${playerTwoCards.length}`
      }
      else if( warComparePlayerOne === warComparePlayerTwo){
        console.log(playerOneCards[3].value)
      console.log(playerTwoCards[3].value)
        war(convert(playerOneCards[warNumber += 4].value), convert(playerTwoCards[ warNumber += 4].value))
      }
  }
  else if(playerOneCards.length < 4){
    alert('player two wins')
  }else if(playerTwoCards.length < 4){
    alert('player one wins')
  }
}


