// // <!-- js/state.js -->
// <script>
const DEFAULT_STATE = {
  lastPeriodStart: null,
  cycleLength: 28,
  periodLength: 5,
  googleConnected: false
};

function loadState() {
  return JSON.parse(localStorage.getItem("cycleState")) || DEFAULT_STATE;
}

function saveState(state) {
  localStorage.setItem("cycleState", JSON.stringify(state));
}

let appState = loadState();
// </script>