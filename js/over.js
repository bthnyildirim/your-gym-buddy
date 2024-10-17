const score = localStorage.getItem("playerScore");
if (score.length === 0) {
  document.getElementById("score-display").textContent = `Score: '0'`;
} else {
  document.getElementById("score-display").textContent = `Score: ${score}`;
}
function retryGame() {
  window.location.href = "index.html";
  document.getElementsByName(score).reset(score);
}
