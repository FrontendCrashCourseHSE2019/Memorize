// require с raw-loader загружает содержимое файла card.html в виде EcmaScript-модуля, поэтому нам нужно поле .default
// именно там будет строка с содержимым файла
let fileContent = require("raw-loader!./card.html").default;

// создаём HTML Element с помощью JQuery из строки (из строки создаём один раз, дальше будем его клонировать)
const html = $<Element>(fileContent);

export default class Card {

    /**
     * HTML элемент карточки
     */
    private readonly element: JQuery<Element>;

    /**
     * Элемент карточки с классом card-front (перед карты, сторона на которой не видно картинку)
     */
    private cardFront: JQuery<Element>;

    /**
     * Элемент карточки с классом card-back (задник карты, сторона на которой видно картинку)
     */
    private cardBack: JQuery<Element>;

    constructor(icon: string) {
        this._icon = icon;

        // создаём копию элемента карточки
        this.element = html.clone();

        // находим в элементе переднюю часть карточки
        this.cardFront = this.element.find(".card-front");

        // находим в элементе заднюю часть карточки
        this.cardBack = this.element.find(".card-back");

        // прячем задник карты
        this.cardBack.hide();

        // добавляем иконку
        this.cardBack.find("i.fab").addClass(icon);
    }

    /**
     * иконка на карточке
     */
    private readonly _icon: string;

    /**
     * Геттер иконки
     */
    get icon(): string {
        return this._icon;
    }

    /**
     *  Добавить
     * @param root
     */
    public addMe(root: JQuery<Element>) {
        root.append(this.element);
    }

    /**
     * Установить обработчика нажатия на переднюю сторону карточки
     * @param listener функция обработки нажатия на карточку
     */
    public setOnClickListener(listener: ((card: Card) => void)) {
        // установка обработчика
        this.cardFront.click(() => {
            // прячем переднюю часть карточки
            this.cardFront.hide(1000);
            // показываем заднюю часть, с картинкой
            this.cardBack.show(1000).promise().then(_ => {
                // ПОСЛЕ того как картинка будет показана -- обрабатываем нажатие
                listener(this);
            });
        });
    }

    /**
     * Показать переднюю часть карточки
     */
    flip() {
        // прячем заднюю часть
        this.cardBack.hide(1000);
        // показываем переднюю часть
        this.cardFront.show(1000);
    }

    /**
     * Спрятать карту, когда она больше не нужна
     */
    remove() {
        this.element.find(".flip-card").hide(100);
    }

}