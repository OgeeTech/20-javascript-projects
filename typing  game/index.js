window.addEventListener('load', init);

let time = 5;
let score = 0;
let isPlaying;


const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = ['hat',
'river',
'lucky',
'statue',
'generate',
'stubborn',
'cocktail',
'runaway',
'joke',
'developer',
'establishment',
'hero',
'javascript',
'nutrition',
'revolver',
'echo',
'siblings',
'investigate',
'horrendous',
'symptom', 
'laughter',
'magic',
'space',
'definition'
];

function init(){
    //load words from array
    showWord(words);

    //match word from input
    wordInput.addEventListener('input', startMatch);

    // call count down
    setInterval(countdown,1000);

    // check game status
    setInterval(checkStatus, 50)
}

//start match
function startMatch() {
    if(matchWords()) {
        isPlaying = true;
        time = 6;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    //if score is -1, display 0
    if (score === -1){
       scoreDisplay.innerHTML = 0;
         
    } else {
      scoreDisplay.innerHTML = score;
      
    }
}

//match current word
function matchWords() {
    if(wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

//pick a random word
function showWord(word) {
  const randIndex = Math.floor(Math.random() * words.length);
   currentWord.innerHTML = words[randIndex];
}

// countdown timer
function countdown(){
    if(time > 0){
        time--;
    } else if(time ==0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

// check interval
function checkStatus (){
    if(!isPlaying && time === 0 ){
        message.innerHTML="Game over!!";
        score = -1;

    }
}
