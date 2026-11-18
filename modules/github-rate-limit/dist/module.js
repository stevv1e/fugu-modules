const root = document.getElementById('app');
root.innerHTML = '<h2>GitHub Rate Limit</h2><p>Проверка публичного API без токена. Модуль может обратиться только к api.github.com.</p><button id="load">Проверить</button><pre id="result"></pre>';
const result = document.getElementById('result');
document.getElementById('load').onclick = async () => {
  result.textContent = 'Загрузка…';
  try {
    const response = await fugu.call('network.get', { url: 'https://api.github.com/rate_limit' });
    if (response.status !== 200) throw new Error(`GitHub HTTP ${response.status}`);
    const data = JSON.parse(response.text);
    const core = data.resources.core;
    const reset = new Date(core.reset * 1000).toLocaleString();
    result.textContent = `Осталось: ${core.remaining} из ${core.limit}\nСброс: ${reset}`;
  } catch (error) { result.textContent = String(error); }
};
