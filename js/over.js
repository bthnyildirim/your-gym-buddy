const score = localStorage.getItem("playerScore") || 0;

document.getElementById("score-display").textContent = `Score: ${score}`;

function retryGame() {
  window.location.href = "index.html";
}
