const cards = document.querySelectorAll('.cards');
let flipped = false;
let complete = false;
let firstCard, secondCard;
let count = 0;
let score = 0;
let turn = 0;
let message = 'You won'
function flipCard() {
    turn = turn + 1;
    if (complete) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!flipped) {
        flipped = true;
        firstCard = this;


    } else {

        flipped = false;
        secondCard = this;
        console.log(firstCard.dataset, secondCard.dataset);
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            count = count + 1;
            score = score + 4;
            firstCard.removeEventListener('click', flipCard, true);
            secondCard.removeEventListener('click', flipCard, true);

            resetGame()
        } else {
            complete = true;
            score = score - 1;

            setTimeout(() => {

                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                if (score < 0 && turn > 6) {
                    message = 'You loose'
                    endGame()
                }
                resetGame()
            }, 550);


        }

    }

    if (count === 6) {
        endGame()

    }
    document.getElementById('score').innerHTML = `Your Score:${score}`;
}

function resetGame() {
    [flipped, complete] = [false, false];
    [firstCard, secondCard] = [null, null]
}
function endGame() {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flip');
        })

        resetGame();
        count = 0;
        turn = 0;
        score = 0;
        shuffle();
        document.getElementById('score').innerHTML = `Your Score:${score}`;
        alert(`Game Over ${message}`)
        message = 'You won'
    }, 300);

}

function shuffle() {
    cards.forEach(card => {
        let randomNumber = Math.floor(Math.random() * 12);
        card.style.order = randomNumber;
    })
}
cards.forEach(card => {
    card.addEventListener('click', flipCard)
})

