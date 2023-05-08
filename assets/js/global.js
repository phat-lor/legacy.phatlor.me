// navbar

navbarsmall = false
navsmallenable = false
darkmode = false

function initLightDarkMode(){
    darkmode = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (darkmode){
        initDarkMode()
    }
    else {
        initLightMode()
    }
}

function toggleDarkMode(){
    darkmode = !darkmode
    if (darkmode){
        initDarkMode()
    }
    else {
        initLightMode()
    }
}

function initLightMode(){
    document.getElementById("main").classList.remove("dark-mode")
    document.getElementById("lightdarktoggle").classList.remove("fa-moon")
    document.getElementById("lightdarktoggle").classList.add("fa-solid")
    document.getElementById("lightdarktoggle").classList.add("fa-lightbulb")
    document.body.classList.remove("darkmode")
}

function initDarkMode(){
    document.getElementById("lightdarktoggle").classList.remove("fa-lightbulb")
    document.getElementById("lightdarktoggle").classList.add("fa-solid")
    document.getElementById("lightdarktoggle").classList.add("fa-moon")
    // add darkmode class to html
    document.getElementById("main").classList.add("dark-mode")
}


function handleNavbarSize(){
    if (window.innerWidth <= 768){
        if (!navbarsmall){
            navbarsmall = true
            // hide navbar
            document.getElementById("navitems").style.display = "none"
        }
    } else {
        // 
        if (navbarsmall){
            navbarsmall = false
        }
    }
}

function toggleNavbar(){
    navsmallenable = !navsmallenable
    if (navsmallenable){
        document.getElementById("navitems").style.display = "flex"
        document.getElementById("navitems").classList.remove("navitems--hide")
        document.getElementById("navitems").classList.add("navitems--show")
    }else {
        document.getElementById("navitems").classList.remove("navitems--show")
        document.getElementById("navitems").classList.add("navitems--hide")
        // setTimeout(() => {
        //     document.getElementById("navitems").style.display = "none"
        // }
        // , 700);
    }
}

function setSectionQuery(section){
    var url = new URL(window.location.href)
    url.searchParams.set("section", section)
    window.history.pushState({}, "", url)
}

var curSectionIndex = 0

// detect which section is in view
function detectSection(){
    handleNavbarSize()
    var home = document.getElementById("home")
    var about = document.getElementById("about")
    var projects = document.getElementById("projects")
    var achievement = document.getElementById("achievement")
    var homeRect = home.getBoundingClientRect()
    var aboutRect = about.getBoundingClientRect()
    var projectsRect = projects.getBoundingClientRect()
    var achievementRect = achievement.getBoundingClientRect()
    var navbarLinks = document.getElementsByClassName("navbar-link")
    if (homeRect.top <= 0 && homeRect.bottom > 0){
        navbarLinks[0].classList.add("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        curSectionIndex = 0;
        // setSectionQuery("home")
    } else if (aboutRect.top <= 0 && aboutRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.add("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        curSectionIndex = 1;
        // setSectionQuery("about")
    } else if (projectsRect.top <= 0 && projectsRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.add("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        curSectionIndex = 2;
        // setSectionQuery("projects")
    } else if(achievementRect.top <= 0 && achievementRect.bottom > 0){
        navbarLinks[0].classList.remove("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.add("navbar-link-active")
        curSectionIndex = 3;
        // setSectionQuery("achievement")
    }else {
        navbarLinks[0].classList.add("navbar-link-active")
        navbarLinks[1].classList.remove("navbar-link-active")
        navbarLinks[2].classList.remove("navbar-link-active")
        navbarLinks[3].classList.remove("navbar-link-active")
        curSectionIndex = 0;
    }
}

// handle url query
function handleUrlQuery(){
    var url = new URL(window.location.href)
    var query = url.searchParams.get("section")
    if (query == "about"){
        toabout()
    } else if (query == "projects"){
        toprojects()
    } else if (query == "achievement"){
        toachievement()
    }else {
        tohome()
    }
}


function tohome(){
    if(navsmallenable && navbarsmall){
        toggleNavbar()
    }
    console.log("tohome")
    document.getElementById("home").scrollIntoView({behavior: "smooth"})
    setSectionQuery("home")
}

function toabout(){
    if(navsmallenable && navbarsmall){
        toggleNavbar()
    }
    console.log("toabout")
    document.getElementById("about").scrollIntoView({behavior: "smooth"})
    setSectionQuery("about")
}

function toprojects(){
    if(navsmallenable && navbarsmall){
        toggleNavbar()
    }
    console.log("toprojects")
    document.getElementById("projects").scrollIntoView({behavior: "smooth"})
    setSectionQuery("projects")
}

function toachievement(){
    if(navsmallenable && navbarsmall){
        toggleNavbar()
    }
    console.log("toachievement")
    document.getElementById("achievement").scrollIntoView({behavior: "smooth"})
    setSectionQuery("achievement")
}

function langEN(){
    lang("en")
}

function langTH(){
    lang("th")
}

function lang(lang){
    setIndexSection (curSectionIndex)
    var url = new URL(window.location.href)
    url.searchParams.set("lang", lang)
    window.history.pushState({}, "", url)
    location.reload()
}

var lastScrollTop = 0
var currentSectionIndex = 0
var lastScrolled = 0
// 
function lockScrollToSection(){
    // disable scrolling


    var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if (st > lastScrollTop) {
       if (Date.now() - lastScrolled > 1000){
        console.log("scrolling down")
           if (currentSectionIndex < 3){
               currentSectionIndex += 1
               setIndexSection(currentSectionIndex)
           }
           lastScrolled = Date.now()
       }
    } else if (st < lastScrollTop) {
        if (Date.now() - lastScrolled > 1000){
            console.log("scrolling up")
            if (currentSectionIndex > 0){
                currentSectionIndex -= 1
                setIndexSection(currentSectionIndex)
            }
            lastScrolled = Date.now()
        }
    } // else was horizontal scroll
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}

function setIndexSection(index){
    console.log("setIndexSection " + index)
    switch (index) {
        case 0:
            tohome()
            break;
        case 1:
            toabout()
            break;
        case 2:
            toprojects()
            break;
        case 3:
            toachievement()
            break;
    }
}


// window.addEventListener("scroll", lockScrollToSection)
// window.addEventListener("load", handleUrlQuery)
window.addEventListener("load", initLightDarkMode)
window.addEventListener("load", detectSection)
window.addEventListener("scroll", detectSection)
window.addEventListener("resize", handleNavbarSize)