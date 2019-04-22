"use strict";

console.log(">> Ready :)");

//1. Una vez creado el html con input, button y listado
//2. recoger los valores del input
//3. añadir listener al botón y ver que se escucha
//4. crear elementos
//crear li de las pelis
//crear h3 para el título
//crear img para el cartel
//mirar la documentacion de la api
//hacer el fetch
//llamar al nombre de la película
//llamar al cartel de la película
//si li seleccionado
//guardar en el array
//crear el listado de favoritos con el array

const input = document.querySelector(".main__input");
const btn = document.querySelector(".main__button");
const listSeries = document.querySelector(".main__list");
const imgDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
const newArraySeries = [];

// function saveArray() {
//   let totalDays = 0;
//   let totalArray = [];

//   for (let i = 0; i < 8; i++) {
//     totalDays += 1;
//     totalArray[i] = totalDays;
//   }
//   console.log(totalArray);
// }
// saveArray();

//Select favorites
function selectItem(e) {
  const currentItem = e.currentTarget;
  currentItem.classList.toggle("selected--series");

  //add select item to array
  if (currentItem.classList.contains("selected--series")) {
    console.log(currentItem);
  }
}

function callButton() {
  const inputValue = input.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const dataArray = data;
      let cleanList = "";

      for (let i = 0; i < dataArray.length; i++) {
        const objSerie = dataArray[i].show;
        const nameSerie = objSerie.name;
        let objImg = objSerie.image;

        //create items
        let newLi = document.createElement("li");
        const newTitle = document.createElement("h3");
        const newImage = document.createElement("img");

        //add classes to new items
        newLi.classList.add("main__li");
        newTitle.classList.add("main__second-title");
        newImage.classList.add("main__img");

        //appendchilds
        listSeries.appendChild(newLi);
        newLi.append(newImage, newTitle);
        newImage.src = imgDefault;

        if (objImg === null || objImg === undefined) {
          newImage.src = imgDefault;
        } else {
          newImage.src = objSerie.image.medium;
        }
        newTitle.innerText = nameSerie;

        //Select favorites
        newLi.addEventListener("click", selectItem);
      }
    });
}
btn.addEventListener("click", callButton);



// function saveArray() {
//   let totalDays = 0;
//   let totalArray = [];

//   for (let i = 0; i < 8; i++) {
//     totalDays += 1;
//     totalArray[i] = totalDays;
//   }
//   console.log(totalArray);
// }
// saveArray();

// let initialDate = 2017;
// let lunas = [];
// for (let i = 0; i < 8; i++) {
//     initialDate += 3;
//     lunas[i] = initialDate;
// }
// console.log(`Las próximas lunas serán en: ${lunas}.`);
