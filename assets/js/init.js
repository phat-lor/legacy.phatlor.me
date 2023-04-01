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

function load() {
  console.log("load");
  hide();
  render("Loading...");
  const startTime = Date.now();
  new Promise((resolve, reject) => {
    try {
      init();
      renderCertificates();
      renderAwards();
      autoDetectProject();
      $(document).ready(function () {
        render("Loading compleate :) loading time: " + (Date.now() - startTime) + "ms");
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    } catch (error) {
      reject(error);
    }
  }).then(resolve, reject);
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
