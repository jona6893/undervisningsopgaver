// Variabler

const url = "https://babushka-dd8a.restdb.io/rest/menu";
const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};
let category;
let filter = "alle";
const h1 = document.querySelector("h1");

//når siden loades starer funktionen renderMenu med ("navn") som parameter
document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded");
  start();
});

function start() {
  // vælger alle knapper i nav i html filen
  const filterKnapper = document.querySelectorAll("nav button");
  // placer eventlistener på hver knap i variablen filterKnapper, start derefter funktionen filterPersoner
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filterPersoner)
  );
  hentData();
}

// henter information fra url og bruger options som adgangskode
async function hentData() {
  console.log("hi");
  const responds = await fetch(url, options);
  category = await responds.json();
  console.log(category);
  renderMenu();
}

function filterPersoner() {
  console.log("filterknapper");
  //vælger vores klasse .valgt og fjerner den fra det element der har den.
  document.querySelector(".valgt").classList.remove("valgt");
  // "this" henviser til den knap som er klikket. vi rykker klassen over på "this"
  this.classList.add("valgt");
  //filter bliver nu til det der står i vores knap, ved at hente infomationerne i data-kategori="" ved brug af dataset.kategori
  filter = this.dataset.kategori;
  renderMenu();
  //ændre teksten af h1 til det som knappen hedder.
  h1.textContent = this.textContent;
}

async function renderMenu() {
  console.log();
  //henter json file fra hentData(
  const container = document.querySelector("#container");
  const temp1 = document.querySelector(".temp1");
  // tømmer container for alt infomation
  container.innerHTML = "";
  console.log("tøm");

  category.forEach((ret) => {
    if (filter == ret.kategori || filter == "alle") {
      const clone = temp1.cloneNode(true).content;
      clone.querySelector(".img1").src =
        "babushka_fotos/" + ret.billednavn + "-md.jpg";
      clone.querySelector(".img2").src =
        "babushka_fotos/" + ret.billednavn + "-md.jpg";
      clone.querySelector(".titel").textContent = ret.navn;
      clone.querySelector(".titel2").textContent = ret.navn;
      clone.querySelector(".short_description").textContent =
        ret.kortbeskrivelse;
      clone.querySelector(".short_description2").textContent =
        ret.kortbeskrivelse;
      clone.querySelector(".long_description").textContent =
        ret.langbeskrivelse;
      clone.querySelector(".place").textContent = ret.oprindelsesregion;
      clone.querySelector(".pris").textContent = ret.pris + " kr,-";
      container.appendChild(clone);
    }
  });

  // vælger alle de valgte klasserne i DOM og lave en variable
  const popup = document.querySelectorAll(".popup");
  const articles = document.querySelectorAll(".article");
  // Laver en Liste ud fra de varibler, med de valgte klasser
  let artArray = Array.from(articles);
  let popArray = Array.from(popup);
  // laver en funktion for hver element i listen.
  artArray.forEach(articleClick);
  popArray.forEach(popClick);
  // Funktion med en event listener. funktion tager "element" og "index" som parameter. "element" er et punkt fra listen.
  // "index" er det punkts nummer i listen, altså hvis der er 10 punkter og det 3 punkter er valgt så er index = 3.
  function articleClick(element, index) {
    element.addEventListener("click", () => {
      console.log(element + index);
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      // toggler klassen display på listen popArray, men kun på det punkt listen som har samme nummer som artArray. Det er det [index] gøt.
      popArray[index].classList.toggle("display");
    });
  }
  // gør det sammen som foroven men omvendt.
  function popClick(pop, index) {
    pop.addEventListener("click", () => {
      console.log(pop + index);
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      pop.classList.remove("display");
    });
  }
}
