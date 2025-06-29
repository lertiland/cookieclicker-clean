let count = 0;
let clickValue = 1;
let upgradeLevel = 0;
let upgradeCost = 10;

const countEl = document.getElementById('count');
const clickValEl = document.getElementById('clickValue');
const upgradeBtn = document.getElementById('upgradeBtn');
const upgradeLevelEl = document.getElementById('upgradeLevel');

// Carregar progresso
function loadGame() {
  const save = JSON.parse(localStorage.getItem('cookieClickerSave'));
  if (save) {
    count = save.count ?? 0;
    clickValue = save.clickValue ?? 1;
    upgradeLevel = save.upgradeLevel ?? 0;
    upgradeCost = save.upgradeCost ?? 10;
  }
}

// Salvar progresso
function saveGame() {
  const data = {
    count,
    clickValue,
    upgradeLevel,
    upgradeCost
  };
  localStorage.setItem('cookieClickerSave', JSON.stringify(data));
}

// Atualizar UI
function updateUI() {
  countEl.textContent = `${count} cookies`;
  clickValEl.textContent = `Valor por clique: ${clickValue}`;
  upgradeBtn.textContent = `Comprar upgrade (${upgradeCost} cookies)`;
  upgradeBtn.disabled = count < upgradeCost;
  upgradeLevelEl.textContent = `Nível do upgrade: ${upgradeLevel}`;

  // Estatísticas
  document.getElementById('statTotalCookies').textContent = count;
  document.getElementById('statClickValue').textContent = clickValue;
  document.getElementById('statUpgrades').textContent = upgradeLevel;

  saveGame();
}

// Clique no cookie
document.getElementById('cookie').addEventListener('click', () => {
  count += clickValue;
  updateUI();
});

// Comprar upgrade
upgradeBtn.addEventListener('click', () => {
  if (count >= upgradeCost) {
    count -= upgradeCost;
    upgradeLevel++;
    clickValue += 1;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    updateUI();
  }
});

// Troca de abas
document.querySelectorAll('.tabBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// Inicialização
loadGame();
updateUI();
