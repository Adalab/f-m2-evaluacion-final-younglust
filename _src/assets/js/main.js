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

// function callButton() {
//   const inputValue = input.value;

//   fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       const dataArray = data;

//       let newLi = "";
//       for (let i = 0; i < dataArray.length; i++) {
//         //create items
//         newLi = document.createElement("li");
//         const newTitle = document.createElement("h3");
//         const newImage = document.createElement("img");

//         newLi.classList.add("main_li");
//         newTitle.classList.add("main__title");
//         newImage.classList.add("main__img");

//         listSeries.appendChild(newLi);
//         newLi.append(newTitle, newImage);
//         newImage.src = imgDefault;
//         //creater items

//         const objSerie = dataArray[i].show;
//         const nameSerie = objSerie.name;
//         let objImg = objSerie.image;

//         if(objImg === null || objImg === undefined) {
//             newImage.src = imgDefault;
//             console.log(objImg);
//         } else {
//             newImage.src = objSerie.image.medium
//         }
//         newTitle.innerText = nameSerie;
//       }
//     });
// }
// btn.addEventListener("click", callButton);

function callButton() {
  const inputValue = input.value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      const dataArray = data;

      let newLi = "";
      for (let i = 0; i < dataArray.length; i++) {
        const objSerie = dataArray[i].show;
        const nameSerie = objSerie.name;
        let objImg = objSerie.image;
        //create items
        newLi = document.createElement("li");
        const newTitle = document.createElement("h3");
        const newImage = document.createElement("img");

        //add classes to new items
        newLi.classList.add("main_li");
        newTitle.classList.add("main__title");
        newImage.classList.add("main__img");

        //appendchilds
        listSeries.appendChild(newLi);
        newLi.append(newTitle, newImage);
        newImage.src = imgDefault;

        if (objImg === null || objImg === undefined) {
          newImage.src = imgDefault;
          console.log(objImg);
        } else {
          newImage.src = objSerie.image.medium;
        }
        newTitle.innerText = nameSerie;
      }
    });
}
btn.addEventListener("click", callButton);
