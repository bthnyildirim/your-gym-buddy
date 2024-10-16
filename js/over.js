const score = localStorage.getItem("score") || 0;

document.getElementById("score-display").textContent = `Score: ${score}`;

function retryGame() {
  window.location.href = "index.html";
}
