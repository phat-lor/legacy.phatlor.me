function init(){
    var width = window.innerWidth;
    console.log("Width: " + width);
    if (width < 800) {
        console.log("Your screen is too small to view this website. Please use a larger screen.");
        alert("This site is currently incompatible with your screen size this may cause some styling issue.")
        // redirect to 404 page
        //window.location.href = "/error?error=unsupportedscreen | Your screen is too small to view this website. Please use a larger screen. | this website will be available on mobile devices soon.";
        // document.getElementById("unsupportedscreen").style.display = "block";
    }
    
    else {
        // document.getElementById("unsupportedscreen").style.display = "none";
    }
    
}
