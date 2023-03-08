// navbar

navbarsmall = false

function handleNavbarSize(){
    if (window.innerWidth <= 768){
        if (!navbarsmall){
            navbarsmall = true
            document.getElementById("navbar").classList.add("navbar-small")
        }
    } else {
        if (navbarsmall){
            navbarsmall = false
        }
    }
}

function setSectionQuery(section){
    var url = new URL(window.location.href)
    url.searchParams.set("section", section)
    window.history.pushState({}, "", url)
}


// handle url query
function handleUrlQuery(){
    var url = new URL(window.location.href)
    var query = url.searchParams.get("section")
    if (query == "about"){
        about()
    } else if (query == "projects"){
        projects()
    } else {
        home()
    }
}


function home(){
    document.getElementById("home").scrollIntoView({behavior: "smooth"})
    setSectionQuery("home")
}

function about(){
    document.getElementById("about").scrollIntoView({behavior: "smooth"})
    setSectionQuery("about")
}

function projects(){
    document.getElementById("projects").scrollIntoView({behavior: "smooth"})
    setSectionQuery("projects")
}

// detect which section is in view
function detectSection(){
    var home = document.getElementById("home")
    var about = document.getElementById("about")
    var projects = document.getElementById("projects")
    var homeRect = home.getBoundingClientRect()
    var aboutRect = about.getBoundingClientRect()
    var projectsRect = projects.getBoundingClientRect()
    var navbarLinks = document.getElementsByClassName("navbar-link")
    if (homeRect.top <= 0 && homeRect.bottom > 0){
        navbarLinks[0].classList.add("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        setSectionQuery("home")
    } else if (aboutRect.top <= 0 && aboutRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.add("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        setSectionQuery("about")
    } else if (projectsRect.top <= 0 && projectsRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.add("navbar-link-active")
        setSectionQuery("projects")
    } else {
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
    }
}

handleUrlQuery()
window.addEventListener("scroll", detectSection)
window.addEventListener("resize", handleNavbarSize)