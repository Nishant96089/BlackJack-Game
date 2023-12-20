             // BLACKJACK GAME           

// Displaying the Rules Prompt
alert("Welcome to Blackjack!\n\n" +
  "Objective:\n" +
  "Your goal is to build a hand with a total value as close to 21 as possible without going over.\n\n" +
  
  "How to Play:\n" +
  "1. Enter your name to start the game.\n" +
  "2. Click 'Start Game' to draw two initial cards.\n" +
  "3. Choose 'New Card' to draw additional cards or 'Stand' to end your turn.\n" +
  "4. Aim for a hand value close to 21 without exceeding it.\n\n" +
  
  "Card Values:\n" +
  "- Number cards: Face value (2-10)\n" +
  "- Face cards (King, Queen, Jack): 10\n" +
  "- Aces: 1 or 11 (whichever benefits your hand more)\n\n" +
  
  "Winning:\n" +
  "- Blackjack (21 with initial cards): Win 100 chips.\n" +
  "- Normal Win: Closer to 21 than the dealer without exceeding it.\n" +
  "- Bust (Exceeding 21): Lose the round.\n\n" );
  
alert("Chips:\n" +
  "- Start with 200 chips.\n" +
  "- Win rounds to earn chips, lose rounds to deduct chips.\n\n" +
  
  "Messages:\n" +
  "- 'Do you want to draw a new card?' - If your hand is less than 21.\n" +
  "- 'You've got Blackjack!' - If you get 21 with the initial two cards.\n" +
  "- 'You're out of the game!' - If your hand exceeds 21.\n\n" +
  
  "Restart the Game:\n" +
  "Click 'Start Game' to begin a new round. Your chips will reset, and the game state will be cleared.\n\n" +
  
  "Enjoy the game and good luck!");
  
const cardImages = {
  1: 'cards/ace.jpg',
  2: 'cards/2.jpg',
  3: 'cards/3.jpg',
  4: 'cards/4.jpg',
  5: 'cards/5.jpg',
  6: 'cards/six.jpg',
  7: 'cards/seven.jpg',
  8: 'cards/8.jpg',
  9: 'cards/9.jpg',
  10:'cards/10.jpg',
  11:'cards/J.jpg',
  12:'cards/Q.jpg',
  13:'cards/K.jpg'
}


let playerName = prompt("Please Enter Your Name :")

let player = {
  name: playerName,
  chips: 200
}

let cards = [];      // Array for storing all the cards. Cards are not dealt yet.
let sum = 0;         // Hence the sum of cards is 0.
let hasBlackJack = false;
let isAlive = false;  // Will turn true once the game starts.
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": " + "₹" + player.chips;

function randomCard(){
  let randomNum = Math.floor(Math.random()*13) + 1;    // A random number btw 1 and 13.
  if(randomNum > 10){
    return 10;          // Three cards are above 10 i.e King,Queen and Joker,but in BlackJack their value is 10.
  }else if(randomNum === 1){
    return 11;          // In BlackJack "A" is taken as either 1 or 11.
  }else{
    return randomNum;   //  Every other card remains btw 2 and 10.
  }
}

// function startGame(){
//   if(isAlive === false){
//     isAlive = true;
//     let firstCard = randomCard();  
//     let secondCard = randomCard();
//     cards.push(firstCard,secondCard);
//     sum = cards[0] + cards[1];
//     gameLogic();    
//   }
// }

function startGame() {
  if (!isAlive || hasBlackJack) {
    // Reset game state
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = true;
    message = "";
    
    // Clear UI
    sumEl.textContent = "Sum : " + sum;
    cardsEl.textContent = "Cards : ";
    messageEl.textContent = message;

    // Draw two initial cards
    let firstCard = randomCard();  // Calling the randomCard() function.
    let secondCard = randomCard();
    cards.push(firstCard, secondCard);
    sum = cards[0] + cards[1];

    // Update UI and check game logic
    gameLogic();  // To call gameLogic function from the start,not the updated value.
  }
}

function gameLogic() {
  sumEl.textContent = "Sum : " + sum;
  cardsEl.textContent = "Cards : ";  // Outside the for loop bcoz we don't want 'Cards:' to repeat itself.
  for(let i=0; i<cards.length; i++){
    // cardsEl.textContent += cards[i] + " ";  
    const cardValue = cards[i];
    const cardImageUrl = cardImages[cardValue];

    // Create an image element for each card
    const cardImage = document.createElement('img');
    cardImage.src = cardImageUrl;
    cardImage.alt = `Card ${cardValue}`;

     // Set the width and height of the card image to 100px
     cardImage.style.width = '85px';
     cardImage.style.height = '100px';
     cardImage.style.margin = '5px';

    // Append the image to cardsEl
    cardsEl.appendChild(cardImage);   
  }

  if(sum <= 20){
    message = "Do you want to draw a new card?";
  }else if(sum === 21){
    message = "You've got Blackjack!";
    hasBlackJack = true;
    player.chips += 100;
  }else{
    message = "You're out of the game!";
    isAlive = false;
    player.chips -= 25;
  }
  // Updating Player Chips in the UI

  playerEl.textContent = player.name + ": " + "₹" + player.chips;
  messageEl.textContent = message;
}

function newCard() {
  if(isAlive === true && hasBlackJack === false){  // Setting condition such as New Card button operates according to the game logic.
  let card = randomCard();  // Calling the randomCard() function for a new card.
  sum += card;

   // Create an image element for the new card
   const cardImage = document.createElement('img');
   cardImage.src = cardImages[card];
   cardImage.alt = `Card ${card}`;

  // Set the width and height of the card image to 100px
    cardImage.style.width = '85px';
    cardImage.style.height = '100px';
    cardImage.style.margin = '5px';

   // Append the image to cardsEl
   cardsEl.appendChild(cardImage);

  cards.push(card);
  gameLogic()   //Calling gameLogic function with updated values.
  }
}
