const html = $<Element>(require("raw-loader!./card.html").default);

export default class Card {

    private _icon: string;
    private element: JQuery<Element>;
    private cardFront: JQuery<Element>;
    private cardBack: JQuery<Element>;

    constructor(icon: string) {
        this._icon = icon;
        this.element = html.clone();

        this.cardFront = this.element.find(".card-front");
        this.cardBack = this.element.find(".card-back");

        this.cardBack.hide();
        this.cardBack.find("i.fab").addClass(icon);
    }

    public addMe(root: JQuery<Element>) {
        root.append(this.element);
    }

    public setOnClickListener(listener: ((card: Card) => void)) {
        this.cardFront.click(() => {
            this.cardFront.hide(1000);
            this.cardBack.show(1000).promise().then(_ => {
                listener(this);
            });
        });
    }


    get icon(): string {
        return this._icon;
    }

    flip() {
        this.cardBack.hide(1000);
        this.cardFront.show(1000);
    }

    remove() {
        this.element.find(".flip-card").remove();
    }

}