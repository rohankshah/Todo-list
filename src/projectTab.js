import { addFlex, createHeading } from "./pageload";
import { mainTabLoad } from "./mainTab";
import './projectTab.css'

let project_list = [];

function projectTabLoad() {
    const project = document.getElementsByClassName("project")[0];
    addFlex(project);
    createHeading(project, "Project");
    createProjectCont(project);
    createProjectInput(project);
    // if (!localStorage.getItem('project_list')) {
    //     defaultProject();
    // }
    loadExistingProject();
    listenProjectClick();
}

function loadExistingProject() {
    if (localStorage.getItem('project_list')) {
        let existingProject = localStorage.getItem('project_list');
        let existingProjectParse = JSON.parse(existingProject);
        projectAddExisting(existingProjectParse);
    }
    else {
        defaultProject();
        let existingProject = localStorage.getItem('project_list');
        let existingProjectParse = JSON.parse(existingProject);
        projectAddExisting(existingProjectParse);
    }
}

function monitorProjectAdd() {
    const project = document.getElementsByClassName("project")[0];
    const projectAddBtn = project.children[2].children[1];

    projectAddBtn.addEventListener("click", projectAdd)
}

function defaultProject() {
    const project = document.getElementsByClassName("project")[0];
    const projectCont = project.children[1];
    let project_obj = {
        name: "Project 1",
        list_objs: []
    }

    project_list.push(project_obj);
    localStorage.setItem('project_list', JSON.stringify(project_list));
    // const projectName = document.createElement("p");
    // projectName.innerHTML = project_obj.name;
    // projectCont.appendChild(projectName);
}

function projectAdd() {
    removeListenProjectClick();
    const project = document.getElementsByClassName("project")[0];
    const projectCont = project.children[1];
    const projectInput = project.children[2].children[0];

    let project_obj = {
        name: projectInput.value,
        list_objs: []
    }
    console.log(project_list);
    project_list.push(project_obj);
    console.log(project_list);
    localStorage.setItem('project_list', JSON.stringify(project_list));

    const projectName = document.createElement("p");
    projectName.innerHTML = project_obj.name;
    projectInput.value = '';
    projectCont.appendChild(projectName);
    listenProjectClick();
}

function projectAddExisting(existingProjectParse) {
    const project = document.getElementsByClassName("project")[0];
    const projectCont = project.children[1];
    Array.from(existingProjectParse).forEach(ele => {
        let p_name = document.createElement("p");
        p_name.innerHTML = ele.name;
        projectCont.appendChild(p_name);
    });
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

// Project click

function listenProjectClick() {
    if (localStorage.getItem('project_list')) {
        const projectButtons = document.getElementsByClassName("project")[0].children[1].children;
        const projectButtonsArr = Array.from(projectButtons);
        projectButtonsArr.forEach(ele => {
            ele.addEventListener("click", mainTabLoad);
        })
    }
}

function removeListenProjectClick() {
    if (localStorage.getItem('project_list')) {
        const projectButtons = document.getElementsByClassName("project")[0].children[1].children;
        const projectButtonsArr = Array.from(projectButtons);
        projectButtonsArr.forEach(ele => {
            ele.removeEventListener("click", mainTabLoad);
        })
    }
}

export {
    projectTabLoad,
    monitorProjectAdd
}