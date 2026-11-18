# Fugu Modules

Официальный каталог модулей для Fugu Deck на Android и Windows.

Приложение загружает `index.json` по конкретному commit, затем читает `module.json` и JS entry модуля. SHA-256 entry обязан совпасть с манифестом. Обновления устанавливаются вручную.

## Эталонные модули

- `text-tools` — редактор текста и черновик через разрешение `storage`.
- `github-rate-limit` — запрос `/rate_limit` через разрешение сети только на `api.github.com`.

## Манифест `fugu-module/1`

```json
{
  "format": "fugu-module/1",
  "id": "my-module",
  "name": "My Module",
  "version": "1.0.0",
  "description": "Что делает модуль",
  "entry": "dist/module.js",
  "sha256": "SHA-256 файла dist/module.js в нижнем регистре",
  "min_app": "0.1.0",
  "permissions": {
    "storage": false,
    "network": ["api.example.com"]
  }
}
```

В MVP поддерживаются только `storage` и `network`. Неизвестные разрешения отклоняются. Сетевой код модуля не имеет прямого `fetch`: host-приложение разрешает только GET по HTTPS на перечисленные домены.

## RPC в песочнице

```js
await fugu.call("storage.get", { key: "draft" });
await fugu.call("storage.set", { key: "draft", value: "text" });
const response = await fugu.call("network.get", { url: "https://api.example.com/data" });
```

Код запускается в WebView/iframe без same-origin доступа к Fugu Deck, без Node.js, нативных библиотек, Git и SSH. API-ключи приложения модулю не передаются.
