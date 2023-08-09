const options = ["gunting", "batu", "kertas"];

function computerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "Seri!";
    } else if (
        (playerChoice === "gunting" && computerChoice === "kertas") ||
        (playerChoice === "batu" && computerChoice === "gunting") ||
        (playerChoice === "kertas" && computerChoice === "batu")
    ) {
        return "Kamu Menang!";
    } else {
        return "Kamu Kalah!";
    }
}

function playGame(playerChoice) {
    const compChoice = computerChoice();
    const result = determineWinner(playerChoice, compChoice);
    
    return {
        player: playerChoice,
        computer: compChoice,
        result: result
    };
}

// Contoh penggunaan:
const playerChoice = "gunting"; // Ganti dengan pilihanmu (gunting, batu, atau kertas)
const gameResult = playGame(playerChoice);
console.log("Kamu memilih:", gameResult.player);
console.log("Komputer memilih:", gameResult.computer);
console.log("Hasil:", gameResult.result);
