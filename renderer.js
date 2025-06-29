let count = 0;
document.getElementById('cookie').addEventListener('click', () => {
  count++;
  document.getElementById('count').textContent = `${count} cookies`;
});
