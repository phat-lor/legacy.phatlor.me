async function getWorks() {
  return inData.About.Experiences.Works;
}

function renderWorks() {
  const worksContainer = document.getElementById("works-container");
  getWorks().then((data) => {
    data.forEach((work) => {
      worksContainer.appendChild(createWork(work));
    });
  });
}

function createWork(data) {
  const aos = document.createElement("div");
  // aos
  aos.setAttribute("data-aos", "zoom-in-up");
  aos.setAttribute("data-aos-delay", "100");
  aos.setAttribute("data-aos-duration", "500");
  aos.setAttribute("data-aos-anchor-placement", "top-bottom");

  const work = document.createElement("div");
  work.classList.add("work");
  const title = document.createElement("button");
  title.classList.add("collapsible");
  title.textContent = data.title;

  const content = document.createElement("div");
  content.classList.add("content");
  const description = document.createElement("p");
  description.textContent = data.details;

  var sumImgHeight = 0;
  data.images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image.src;
    img.classList.add("work-image");
    content.appendChild(img);

    sumImgHeight += image.height;

    console.log("sumImgHeight: ", sumImgHeight);

    const br = document.createElement("br");
    content.appendChild(br);
  });

  title.addEventListener("click", () => {
    console.log("collapsible");
    title.classList.toggle("active");
    var content = title.nextElementSibling;
    // if active set display to block else set to none
    content.style.display = "flex";

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      // + margin and padding
      content.style.maxHeight = content.scrollHeight + sumImgHeight + "px";
    }
  });

  content.appendChild(description);
  work.appendChild(title);

  work.appendChild(content);

  aos.appendChild(work);
  return aos;
}
