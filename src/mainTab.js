import './mainTab.css';
import { addFlex, createHeading } from './pageload';

function mainTabLoad(ev) {
    let projectName = ev.path[0].innerHTML;
    const mainTab = document.getElementsByClassName("main")[0];
    mainTab.innerHTML = '';
    mainTab.classList.add("mainTab")
    addFlex(mainTab);
    createHeading(mainTab, `${projectName} task's`);
    createMainCont(mainTab);
    createMainInput(mainTab);
}

function createMainCont(mainTab) {
    const mainCont = document.createElement("div");
    mainCont.classList.add("mainCont");
    mainTab.appendChild(mainCont);
}

function createMainInput(mainTab) {
    const mainInputDiv = document.createElement("div");
    mainInputDiv.classList.add("mainInputDiv");
    const mainTask = document.createElement("input");
    const mainDate = document.createElement("input");
    mainDate.type = "date"
    const mainAdd = document.createElement("button");
    mainAdd.innerHTML = "Add task";
    mainInputDiv.appendChild(mainTask);
    mainInputDiv.appendChild(mainDate);
    mainInputDiv.appendChild(mainAdd);
    mainTab.appendChild(mainInputDiv);
}

export {
    mainTabLoad
}

