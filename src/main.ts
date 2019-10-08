import './app-thirdparty';
import './app.less';
import Card from './Card';

/**
 * Перемешать элементы массива (можно не вчитываться)
 * @param array
 */
function shuffle(array: string[]): string[] {
    return array
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
}

$(() => {

    // список возможных иконок
    let allIcons = ['fa-apple', 'fa-docker', 'fa-ebay', 'fa-discord',
        'fa-d-and-d', 'fa-d-and-d-beyond', 'fa-critical-role', 'fa-github',
        'fa-linux', 'fa-jenkins', 'fa-pied-piper-alt', 'fa-yandex'];

    // иконки, которые будут использоваться в игре
    let iconsForGame: string[] = [];

    // сколько картинок надо
    let variants = 8;

    // сколько карточек будет в игре
    let cards = variants * 2;

    for (let i = 0; i < variants; i++) {
        // выберем случайную картинку из ещё не использованных
        const randomIndex = Math.floor(Math.random() * allIcons.length);
        const randomValue = allIcons[randomIndex];

        // удалим из списка, чтобы не использовать её второй раз
        allIcons.splice(randomIndex, 1);

        // ииии просто добавим дважды в список иконок для игры
        iconsForGame.push(randomValue);
        iconsForGame.push(randomValue);
    }

    // перемешиваем список иконок, чтобы иконки не шли одна за другой
    iconsForGame = shuffle(iconsForGame);

    // получаем HTML-элемент, в который будем добавлять строки с картами
    const gameContainer = $('#game-container');

    // текущая добавляемая строка
    let row: JQuery<Element> = null;

    // какой по счёту элемент строки мы добавляем
    let item = 0;

    // последняя нажатая карточка
    let lastPressedCard: Card = null;

    // итерируемся по списку всех картинок ддя игры
    iconsForGame.forEach(icon => {
        if (row == null || item > 3) {
            // если мы только начали, либо это последний элемент в строке
            // создаём новую строку и начинаем отчёт с нуля

            // создаём "строку"
            row = $('<div class="row"></div>');

            // добавляем строку в контейнер строк
            gameContainer.append(row);
            item = 0;
        }

        // создаём карточку с картинкой
        const card = new Card(icon);

        // устанавливаем обработчик нажатия на карточку
        card.setOnClickListener((card: Card) => {
            if (lastPressedCard != null) {
                // у нас есть предыдущая нажатая карта
                if (card.icon === lastPressedCard.icon) {
                    // картинки совпадают, удаляем карточки
                    card.remove();
                    lastPressedCard.remove();

                    // обнуляем последнюю нажатую карточку
                    lastPressedCard = null;

                    // уменьшаем количество на две удалённые
                    cards -= 2;
                } else {
                    // картинки не совпадают, закрываем карточки
                    card.flip();
                    lastPressedCard.flip();

                    // обнуляем последнюю нажатую карточку
                    lastPressedCard = null;
                }
            } else {
                // сохраним нажатую карточку
                lastPressedCard = card;
            }

            if (cards === 0) {
                // закончили карточки – закончилась игра
                alert('You Won');
            }

        });

        // добавляем карточку в строку
        card.addMe(row);

        // увеличиваем счётчик элементов
        item++;
    });

});