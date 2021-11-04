import { addFlex, createHeading } from "./pageload";
import './projectTab.css'

let project_list = [];

function projectTabLoad() {
    const project = document.getElementsByClassName("project")[0];
    addFlex(project);
    createHeading(project, "Project");
    createProjectCont(project);
    createProjectInput(project);
}

function monitorProjectAdd() {
    const project = document.getElementsByClassName("project")[0];
    const projectAddBtn = project.children[2].children[1];

    projectAddBtn.addEventListener("click", projectAdd)
}

function projectAdd() {
    const project = document.getElementsByClassName("project")[0];
    const projectCont = project.children[1];
    const projectInput = project.children[2].children[0];

    let project_obj = {
        name: projectInput.value,
        list_objs: []
    }

    project_list.push(project_obj);
    console.log(project_list);
    localStorage.setItem('project_list', JSON.stringify(project_list));

    const projectName = document.createElement("p");
    projectName.innerHTML = project_obj.name;
    projectInput.value = '';
    projectCont.appendChild(projectName);
}

function createProjectCont(project) {
    const project_cont = document.createElement("div");
    project_cont.classList.add("project_cont");
    project.appendChild(project_cont)
}

function createProjectInput(project) {
    const projectInputDiv = document.createElement("div");
    projectInputDiv.classList.add("flex_row");
    const projectInput = document.createElement("input");
    projectInput.classList.add("projectInput");
    const projectAdd = document.createElement("button");
    projectAdd.classList.add("projectAdd");
    projectAdd.innerHTML = "Add";
    projectInputDiv.appendChild(projectInput);
    projectInputDiv.appendChild(projectAdd);
    project.appendChild(projectInputDiv);
}

export {
    projectTabLoad,
    monitorProjectAdd
}