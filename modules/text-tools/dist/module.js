const root = document.getElementById('app');
root.innerHTML = '<h2>Text Tools</h2><textarea id="text" rows="8" placeholder="Введите текст…"></textarea><p><button id="upper">ВЕРХНИЙ</button> <button id="lower">нижний</button> <button id="trim">Убрать пробелы</button> <button id="save">Сохранить</button></p><p id="stats"></p><p id="status"></p>';
const text = document.getElementById('text');
const stats = document.getElementById('stats');
const status = document.getElementById('status');
function update() {
  const words = text.value.trim() ? text.value.trim().split(/\s+/).length : 0;
  stats.textContent = `${text.value.length} символов · ${words} слов`;
}
text.addEventListener('input', update);
document.getElementById('upper').onclick = () => { text.value = text.value.toUpperCase(); update(); };
document.getElementById('lower').onclick = () => { text.value = text.value.toLowerCase(); update(); };
document.getElementById('trim').onclick = () => { text.value = text.value.split(/\s+/).map(x => x.trim()).filter(Boolean).join(' '); update(); };
document.getElementById('save').onclick = async () => {
  try { await fugu.call('storage.set', { key: 'draft', value: text.value }); status.textContent = 'Черновик сохранён в хранилище модуля.'; }
  catch (error) { status.textContent = String(error); }
};
fugu.call('storage.get', { key: 'draft' }).then(saved => {
  if (typeof saved === 'string') text.value = saved;
  update();
}).catch(error => { status.textContent = String(error); });
