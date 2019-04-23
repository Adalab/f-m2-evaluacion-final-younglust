"use strict";

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
let listSeries = document.querySelector(".main__list");
const imgDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

let newArraySeries = [];

//let setNewAarray = [...new Set(newArraySeries)];
const favorite = document.querySelector(".list-favorits");

//Select favorites
function selectItem(e) {
  const currentItem = e.currentTarget;
  currentItem.classList.add("selected--series");
  const contentText = currentItem.innerText;
  const contentImg = currentItem.firstElementChild;
  const contentId = currentItem.id;
  const selectItem = document.getElementById("selectFace");

  //clonar el current target
  const cloneImg = contentImg.cloneNode();
  //let ttt = document.querySelector(".main__li");
  //console.dir(ttt);

  //add select item to array
  newArraySeries.push({
    name: contentText,
    showImg: cloneImg,
    showId: contentId
  });

  if (currentItem.classList.contains("selected--series")) {
    //clean list
    favorite.innerHTML = "";

    //add title favorites
    const titleFavorite = document.createElement("h3");
    const titleFavText = document.createTextNode("Mis series favoritas");
    titleFavorite.classList.add("main__favorites");
    titleFavorite.appendChild(titleFavText);
    favorite.appendChild(titleFavorite);

    //loop array favorite
    for (let i = 0; i < newArraySeries.length; i++) {
      let listFavorite = document.createElement("li");
      listFavorite.classList.add("myFav");
      favorite.append(listFavorite);
      listFavorite.append(newArraySeries[i].showImg, newArraySeries[i].name);

      //localStorage
      localStorage.setItem("myShow", JSON.stringify(newArraySeries));
      const saveShow = JSON.parse(localStorage.getItem("myShow"));
    //    if (saveShow) {
    //      newArraySeries = saveShow;
    //    }
    }
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
      let countId = 0;
      //cleanList
      listSeries.innerHTML = "";

      for (let i = 0; i < dataArray.length; i++) {
        const objSerie = dataArray[i].show;
        const nameSerie = objSerie.name;
        let objImg = objSerie.image;

        //create items
        let newLi = document.createElement("li");
        const newTitle = document.createElement("h2");
        const newImage = document.createElement("img");

        //add id to the li's
        countId++;
        newLi.setAttribute("id", `show${countId}`);

        //add classes to new items
        newLi.classList.add("main__li");
        newTitle.classList.add("main__second-title");
        newImage.classList.add("main__img");

        //appendchilds
        listSeries.appendChild(newLi);
        newLi.append(newImage, newTitle);
        newImage.src = imgDefault;

        //img: original or default
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
