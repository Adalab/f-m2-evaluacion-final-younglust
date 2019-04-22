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

const input = document.querySelector(".main__input");
const btn = document.querySelector(".main__button");
const listSeries = document.querySelector(".main__list");
const imgDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

function createItems() {
  const newLi = document.createElement("li");
  newLi.classList.add("news__item");
  listSeries.appendChild(newLi);
  console.log(newLi);
}
createItems();

function callButton() {
  const inputValue = input.value;
  let listContent = "";

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const dataArray = data;

      for (let i = 0; i < dataArray.length; i++) {
        const objSerie = dataArray[i].show;
        const nameSerie = objSerie.name;
        let objImg = Object.keys(objSerie.image);

        for (let img of objImg) {
          const myImg = objSerie.image[img];
          console.log(objSerie.image[img]);
        }
      }
    });
}

btn.addEventListener("click", callButton);
