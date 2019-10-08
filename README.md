### Установка nodejs

1. Загрузите binary архив для вашей системы по [ссылке](https://nodejs.org/en/download/)
1. Распакуйте архив в папку thirdparty/
1. Переименуйте папку с нодой (в случае Linux это node-v10.16.3-linux-x64) в просто `node`
1. Используйте скрипты node/npm (в случае Windows node.cmd/npm.cmd)
1. В корне проекта вызовите `./npm install` (Linux, MacOS) / `./npm.cmd install` (Windows)
1. Укажите путь к nodejs в среде разработки


### NPM скрипты 

```
# Запуск сборки приложения и веб-сервера:
$ ./npm serve

# Сборка приложения без минификации: 
$ ./npm run build

# Сборка приложения с минификацией: 
$ ./npm run build:prod

# Запуск тестов
$ ./npm run test
```