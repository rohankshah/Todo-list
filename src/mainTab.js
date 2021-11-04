import './mainTab.css';
import { addFlex, createHeading } from './pageload';

let list = [];
let projectName = '';

function mainTabLoad(ev) {
    projectName = ev.path[0].innerHTML;
    const mainTab = document.getElementsByClassName("main")[0];
    mainTab.innerHTML = '';
    mainTab.classList.add("mainTab")
    addFlex(mainTab);
    createHeading(mainTab, `${projectName} task's`);
    createMainCont(mainTab);
    createMainInput(mainTab);
    updateList();
    monitorMainAdd();
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

function monitorMainAdd() {
    const mainInputDiv = document.getElementsByClassName("main")[0];
    const mainTaskAdd = mainInputDiv.children[2].children[2];
    mainTaskAdd.addEventListener('click', addTask);
}

function addTask() {
    const mainInputDiv = document.getElementsByClassName("main")[0];
    const mainTaskInput = mainInputDiv.children[2].children[0].value;
    const mainTaskDate = mainInputDiv.children[2].children[1].value;
    // console.log(mainTaskInput);
    // console.log(mainTaskDate);
    let list_obj = {
        task: mainTaskInput,
        due_date: mainTaskDate
    }
    list.push(list_obj);
    pushTask();
}

function pushTask() {
    let unparsed = localStorage.getItem('project_list');
    let parsed = JSON.parse(unparsed);
    for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].name === projectName) {
            parsed[i].list_objs = list;
            localStorage.setItem("project_list", JSON.stringify(parsed));
        }
    }
    console.log(JSON.parse(localStorage.getItem("project_list")));
}

function updateList() {
    let project_data = JSON.parse(localStorage.getItem('project_list'));
    for (let i = 0; i < project_data.length; i++) {
        if (project_data[i].name === projectName) {
            list = project_data[i].list_objs;
        }
    }
}



export {
    mainTabLoad,
    monitorMainAdd
}

