/*
 * Adds a link to a font family to the head of the page.
 */
function addFontFamily(){
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");

    link.href = "https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap";
    link.rel = "stylesheet";

    head.appendChild(link);
}

/*
 * Adds a common header to the body of the page.
 */
function addHeader(body){
    let header = document.createElement("header");
    let h1 = document.createElement("h1");
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");

    let pageNames = ["portfolio", "about", "contact"];

    for(let i = 0; i < pageNames.length; i++){
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.innerHTML = pageNames[i];
        a.href = i == 0 ? "index.html" : `${pageNames[i]}.html`;

        li.appendChild(a);
        ul.appendChild(li);
    }

    h1.innerHTML = "brent kroeker";
    nav.title = "Site Navigation";

    nav.appendChild(ul);
    header.appendChild(h1);
    header.appendChild(nav);

    let main = document.getElementsByTagName("main")[0];
    body.insertBefore(header, main);
}

/*
 * Adds a common footer to the body of the page.
 */
function addFooter(body){
    let footer = document.createElement("footer");
    let h1 = document.createElement("h1");
    let nav = document.createElement("nav");
    let ul = document.createElement("ul");

    let pageNames = ["portfolio", "about", "contact"];

    for(let i = 0; i < pageNames.length; i++){
        let li = document.createElement("li");
        let a = document.createElement("a");

        a.innerHTML = pageNames[i];
        a.href = i == 0 ? "index.html" : `${pageNames[i]}.html`;

        li.appendChild(a);
        ul.appendChild(li);
    }

    h1.innerHTML = "copyright 2023";

    nav.appendChild(ul);
    footer.appendChild(nav);
    footer.appendChild(h1);

    body.appendChild(footer);
}

/*
 * Increases the space taken by a course section if it contains multiple portfolio items.
 */
function spacePortfolio(){
    let courses = document.getElementsByClassName("course");
    
    for (let i = 0; i < courses.length; i++){
        let items = courses[i].getElementsByClassName("portfolio_item");

        if (items.length > 1){
            courses[i].setAttribute("style", "flex-basis: 100%;");
        }
    }
}

/*
 * Handles the load event of the document.
 */
function load(){
    let body = document.getElementsByTagName("body")[0];

    addHeader(body);
    addFooter(body);
    addFontFamily();

    spacePortfolio();
}

document.addEventListener("DOMContentLoaded", load);