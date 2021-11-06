import './mainTab.css';
import { addFlex, createHeading } from './pageload';

let index = 0;
let list = [];
let projectName = '';

function mainTabLoad(ev) {
    projectName = ev.path[0].innerHTML;
    const mainTab = document.getElementsByClassName("main")[0];
    mainTab.innerHTML = '';
    mainTab.classList.add("mainTab")
    addFlex(mainTab);
    createHeading(mainTab, `${projectName} Task List`);
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
    mainTask.classList.add("mainTask");
    mainTask.placeholder = "Enter task details"
    const mainDate = document.createElement("input");
    mainDate.type = "date";
    mainDate.classList.add("mainDate");
    const mainAdd = document.createElement("button");
    mainAdd.innerHTML = "Add task";
    mainAdd.classList.add("mainAdd");
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
    const mainTaskInput = mainInputDiv.children[2].children[0];
    const mainTaskDate = mainInputDiv.children[2].children[1];

    let list_obj = {
        task: mainTaskInput.value,
        due_date: mainTaskDate.value
    }
    list.push(list_obj);
    pushTask();
    showTask();

    mainTaskInput.value = '';
    mainTaskDate.value = '';
}

function pushTask() {
    let unparsed = localStorage.getItem('project_list');
    let parsed = JSON.parse(unparsed);
    for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].name === projectName) {
            index = i;
            parsed[i].list_objs = list;
            localStorage.setItem("project_list", JSON.stringify(parsed));
        }
    }
}

function showTask() {
    const taskHeading = document.getElementsByClassName("main")[0].children[0].innerHTML;
    const mainInputDiv = document.getElementsByClassName("main")[0].children[1];
    mainInputDiv.innerHTML = '';
    const unparsed = localStorage.getItem('project_list');
    const parsed = JSON.parse(unparsed);
    for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].name == taskHeading.split(" Task List")[0]) {
            index = i;
            break;
        }
    }
    const parsedList = parsed[index].list_objs;
    for (let i = 0; i < parsedList.length; i++) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("taskDiv");

        let taskDetails = document.createElement("p");
        taskDetails.innerHTML = parsedList[i].task;
        taskDetails.classList.add("taskDetails");

        let taskDate = document.createElement("button");
        taskDate.innerHTML = "Due: " + parsedList[i].due_date;
        taskDate.classList.add("taskDate")

        let taskDelete = document.createElement("button");
        taskDelete.classList.add("taskDelete");
        taskDelete.innerHTML = "Delete";

        taskDiv.appendChild(taskDetails);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(taskDelete);
        mainInputDiv.appendChild(taskDiv);
    }
    monitorDeleteBtn();
}

function monitorDeleteBtn() {
    const mainInputDiv = document.getElementsByClassName("main")[0].children[1];
    const tasks = mainInputDiv.children;
    Array.from(tasks).forEach(ele => {
        let taskDeletebtn = ele.children[2];
        taskDeletebtn.addEventListener('click', taskDelete);
    })
}

function taskDelete(ev) {
    let taskDetail = ev.path[1].children[0].innerHTML;
    let projectList = localStorage.getItem('project_list');
    let parsedProjectList = JSON.parse(projectList);
    let currentProject = parsedProjectList[index];
    let currentProjectList = currentProject.list_objs;

    const filteredList = currentProjectList.filter(function(el) { return el.task != taskDetail; }); 
    list = filteredList;
    let tempProjectList = parsedProjectList;
    tempProjectList[index].list_objs = filteredList;
    let newProjectList = JSON.stringify(tempProjectList);
    localStorage.setItem('project_list', newProjectList);
    showTask();
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

