async function getAwards() {
  return inData.Achievement.items.Awards.items;
}

async function renderAwards() {
  const awardsContainer = document.querySelector(".awards-container");
  getAwards().then((data) => {
    data.forEach((award) => {
      awardsContainer.appendChild(createAward(award));
    });
  });
}

// template
// {
//     "Compitition": "Gamer To Coder",
//     "Team": "2randomstudents",
//     "Year": "2022/??",
//     "Orginiztion": "Garena & Ministry of Education Thailand",
//     "Position": "Honorable Mention",
//     "Price": "4,000 THB",
//     "image": "/img/award/gamertocoder.png",
//     "source": "https://www.facebook.com/GarenaThailand/photos/a.219360234839206/5265852116856634/?type=3"
// }
// function createAward(data) {
//     const award = document.createElement('div');
//     award.classList.add('award');
//     const image = document.createElement('img');
//     image.src = data.image;
//     const Compitition = document.createElement('p');
//     Compitition.textContent = data.Compitition;
//     const Team = document.createElement('p');
//     Team.textContent = data.Team;
//     const Year = document.createElement('p');
//     Year.textContent = data.Year;
//     const Orginiztion = document.createElement('p');
//     Orginiztion.textContent = data.Orginiztion;
//     const Position = document.createElement('p');
//     Position.textContent = data.Position;
//     const Price = document.createElement('p');
//     Price.textContent = data.Price;
//     award.appendChild(Compitition);
//     award.appendChild(Team);
//     award.appendChild(Year);
//     award.appendChild(Orginiztion);
//     award.appendChild(Position);
//     award.appendChild(Price);
//     award.appendChild(image);
//     award.addEventListener('click', () => {
//         window.open(data.source, '_blank');
//     });
//     return award;
// }

// only render if the value is not null
function createAward(data) {
  const aos = document.createElement("div");
  // aos
  aos.setAttribute("data-aos", "fade-up");
  aos.setAttribute("data-aos-duration", "1000");

  const award = document.createElement("div");
  award.classList.add("award");
  const image = document.createElement("img");
  image.src = data.image;
  const Compitition = document.createElement("p");
  Compitition.textContent = data.Compitition;
  const Team = document.createElement("p");
  Team.textContent = data.Team;
  const Year = document.createElement("p");
  Year.textContent = data.Year;
  const Orginiztion = document.createElement("p");
  Orginiztion.textContent = data.Orginiztion;
  const Position = document.createElement("p");
  Position.textContent = data.Position;
  const Price = document.createElement("p");
  Price.textContent = data.Price;
  if (data.Compitition != "") {
    award.appendChild(Compitition);
  }
  if (data.Team != "") {
    award.appendChild(Team);
  }
  if (data.Year != "") {
    award.appendChild(Year);
  }
  if (data.Orginiztion != "") {
    award.appendChild(Orginiztion);
  }
  if (data.Position != "") {
    award.appendChild(Position);
  }
  if (data.Price != "") {
    award.appendChild(Price);
  }
  if (data.image != "") {
    award.appendChild(image);
    award.addEventListener("click", () => {
      window.open(data.source, "_blank");
    });
  }

  // award div inside aos div
  aos.appendChild(award);
  return aos;
}
