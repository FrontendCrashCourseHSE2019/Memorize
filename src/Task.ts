// require с raw-loader загружает содержимое файла card.html в виде EcmaScript-модуля, поэтому нам нужно поле .default
// именно там будет строка с содержимым файла
let fileContent = require('raw-loader!./task.html').default;

// создаём HTML Element с помощью JQuery из строки (из строки создаём один раз, дальше будем его клонировать)
const html = $<Element>(fileContent);

export default class Task {

    private text: string;

    private date: Date;

    private element: JQuery<Element>;

    constructor(text: string, date: Date) {
        this.text = text;
        this.date = date;

        this.element = html.clone();

        this.element.find('.text').text(text);
    }

    public addMe(root: JQuery<Element>) {
        root.append(this.element);
    }

}