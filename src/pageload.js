import './pageload.css'

function pageload() {

    // Navbar
    const nav = document.getElementsByClassName("nav")[0];
    createHeading(nav, "TODO LIST");
    const innerList = createList();
    appendList(innerList);  
    addFlex(nav);

    // Project
    const project = document.getElementsByClassName("project")[0];
    createHeading(project, "Project");
    addFlex(project);
}

function createHeading(ele, str) {
    const heading = document.createElement("h2");
    heading.innerHTML = str;
    ele.appendChild(heading);
}

function createList() {
    const unlist = document.createElement("ul");
    const li_home = document.createElement("li");
    const li_week = document.createElement("li");
    li_home.innerHTML = "Home";
    li_week.innerHTML = "This week";
    unlist.appendChild(li_home);
    unlist.appendChild(li_week);

    return unlist;
}

function appendList(innerList) {
    const nav = document.getElementsByClassName("nav")[0];
    nav.appendChild(innerList);
}

function addFlex(ele) {
    ele.classList.add("flex");
}


export default pageload();