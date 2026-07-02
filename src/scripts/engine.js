const emojis = [
    "👾",
    "👾", 
    "🏆",
    "🏆", 
    "💀",
    "💀", 
    "🎉",
    "🎉", 
    "🏀",
    "🏀", 
    "🥾",
    "🥾",
    "⚽",
    "⚽",
    "🎈",
    "🎈"
    ];

let openCards = [];
let errors = 0;
const maxErrors = 5; // quantidade de erros permitidos antes de perder
let gameOver = false;

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojis.length; i++)
{
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function handleClick() {
    if(gameOver) return; // impede cliques depois que o jogo acabou

    if(openCards.length < 2 && !this.classList.contains("boxOpen") && !this.classList.contains("boxMatch")){
        this.classList.add("boxOpen");
        openCards.push(this);
    }
    if(openCards.length == 2){
        setTimeout(checkMatch, 500); 
  }  
}

function checkMatch() {
    if(gameOver) return;

    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");

        errors++;

        if(errors >= maxErrors){
            gameOver = true;
            setTimeout(() => alert("Você perdeu! Número máximo de 5 erros atingido, reset para jogar novamente!!!"), 100);
            openCards = [];
            return;
        }
    }
    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        gameOver = true;
        alert("Você ganhou!");
    }
}