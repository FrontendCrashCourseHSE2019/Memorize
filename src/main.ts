import './app-thirdparty';
import './app.less';
import Task from "./Task";


$(() => {

    let itemsContainer = $("#items-container");

    let addButton = $("#add");

    let itemInput = $("#item-input");

    addButton.click(() => {

        let text: string = itemInput.val() as string;

        let task = new Task(text, new Date());
        task.addMe(itemsContainer);

        itemInput.val('');
    });

});