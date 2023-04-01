// window.onload = function () {
//     load();
// }
// function hide() {
//   // disable scroll
//   document.body.style.overflow = "hidden";
//   $(document.getElementById("site-content")).animate({ opacity: 0 }, 1000);
//   document.getElementById("site-content").style.display = "none";
// }

// function show() {
//   document.body.style.overflow = "";
//   handleUrlQuery();
//   $(document.getElementById("site-content")).animate({ opacity: 1 }, 1000);
//   document.getElementById("site-content").style.display = "block";
// }

// function render(message) {
//     console.log(message);
//   if (document.getElementById("loading-text")) {
//     const loadingText = document.getElementById("loading-text");
//     loadingText.innerText = message;
//     return;
//   }
//   // ger contatiner
//   const contain = document.getElementById("loading");
//   const loadingText = document.createElement("p");
//   loadingText.id = "loading-text";
//   loadingText.innerText = message;
//   loadingText.classList.add("load-title");
//   contain.appendChild(loadingText);
// }

// async function load() {
//   console.log("load");
//   hide();
//   render("Loading...");
//   const startTime = Date.now();
//   new Promise((resolve, reject) => {
//     try {
//       init();
//       render("Loading projects...");
//       renderCertificates();
//       render("Loading Certificates...");
//       renderAwards();
//         render("Loading Awards...");
//       autoDetectProject();
//         render("Loading projects...");
//         Promise.resolve(checkAssets());
//         render("Checking assets...");
        
//     //   $(document).ready(function () {
//     //   check if everything is loaded
//         // TODO: code here
//         render("Loading compleate :) loading time: " + (Date.now() - startTime) + "ms");
//         setTimeout(() => {
//           resolve();
//         }, 1000);
//     //   });
//     } catch (error) {
//       reject(error);
//     }
//   }).then(resolve, reject).catch(reject);
// }

// function resolve() {
//   console.log("resolve");
//   show();
// }

// function reject(error) {
//   console.log("reject");
//   render(
//     'Error: "' +
//       error.message +
//       '"\n Please refresh the page. If the problem still appears, please contact me.'
//   );
//   // hide()
// }  



// function checkAssets(){
//     $("img").each(function() {
//         if (this.src.toLowerCase().endsWith(".gif")) {
//           // Image is a GIF
//           var img = this;
//           var frames = img.srcset ? img.srcset.split(",") : [img.src];
//           var numFramesLoaded = 0;
//           for (var i = 0; i < frames.length; i++) {
//             var frameImage = new Image();
//             frameImage.onload = function() {
//               numFramesLoaded++;
//               if (numFramesLoaded == frames.length) {
//                 // All frames have been loaded
//                 console.log("GIF has finished loading: ", img.src);
//               }
//             };
//             frameImage.onerror = function() {
//               console.log("Error loading GIF frame: ", img.src);
//             };
//             frameImage.src = frames[i].trim().split(" ")[0];
//           }
//         } else if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
//           // Image has not been fully loaded yet
//           console.log("Image has not been fully loaded: ", this.src);
//         }
//       });      
// }
window.onload = function () {
    load();
  }
  
  function hide() {
    // disable scroll
    document.body.style.overflow = "hidden";
    $(document.getElementById("site-content")).animate({ opacity: 0 }, 1000);
    document.getElementById("site-content").style.display = "none";
  }
  
  function show() {
    document.body.style.overflow = "";
    handleUrlQuery();
    $(document.getElementById("site-content")).animate({ opacity: 1 }, 1000);
    document.getElementById("site-content").style.display = "block";
  }
  
  function render(message) {
    console.log(message);
    if (document.getElementById("loading-text")) {
      const loadingText = document.getElementById("loading-text");
      loadingText.innerText = message;
      return;
    }
    // ger contatiner
    const contain = document.getElementById("loading");
    const loadingText = document.createElement("p");
    loadingText.id = "loading-text";
    loadingText.innerText = message;
    loadingText.classList.add("load-title");
    contain.appendChild(loadingText);
  }
  
  async function load() {
    console.log("load");
    hide();
    render("Loading...");
    const startTime = Date.now();
    new Promise((resolve, reject) => {
      try {
        init();
        render("Loading projects...");
        renderCertificates();
        render("Loading Certificates...");
        renderAwards();
        render("Loading Awards...");
        autoDetectProject();
        render("Loading projects...");
        setTimeout(() => {
            checkAssets(resolve, reject, startTime);
        }, 1000);
      } catch (error) {
        reject(error);
      }
    })
      .then(resolve)
      .catch(reject);
  }
  
  function resolve() {
    console.log("resolve");
    show();
  }
  
  function reject(error) {
    console.log("reject");
    render(
      'Error: "' +
        error.message +
        '"\n Please refresh the page. If the problem still appears, please contact me.'
    );
    // hide()
  }
  function checkAssets(resolve, reject, startTime) {
    let totalImages = $("img").length;
    let loadedImages = 0;
    let done1 = false;
    let done2 = false;

    const interval = setInterval(() => {
      let allImagesLoaded = true;
      $("img").each(function () {
        if (this.src.toLowerCase().endsWith(".gif")) {
          // Image is a GIF
          if (this.complete) {
            console.log("GIF has finished loading: ", this.src);
          } else {
            console.log("GIF is still loading: ", this.src);
            allImagesLoaded = false;
          }
        } else if (
          this.complete &&
          typeof this.naturalWidth !== "undefined" &&
          this.naturalWidth !== 0
        ) {
          // Normal image has finished loading
          console.log("Image has finished loading: ", this.src);
          if(loadedImages>=totalImages)loadedImages == totalImages;
            else loadedImages++;
        } else {
          // Normal image is still loading
          console.log("Image is still loading: ", this.src);
          allImagesLoaded = false;
        }
      });
  
      if (allImagesLoaded) {
        clearInterval(interval);
        render(
          `Loading complete :) loading time: ${Date.now() - startTime}ms`
        );
        setTimeout(() => {
          resolve();
        }, 1000);
      } else {
        if(loadedImages>=totalImages)render(`Checking assets...`);else render(`Loading assets... ${totalImages}/${totalImages}`);
      }
    }, 500);
  }
  