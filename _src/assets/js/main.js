"use strict";

const input = document.querySelector(".main__input");
const btn = document.querySelector(".main__button");
let listSeries = document.querySelector(".main__list");
const imgDefault = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
let newArraySeries = [];
let newLanguageArr = ["English", "Spanish", "Portuguese"];
const favorite = document.querySelector(".list-favorits");

//Select favorites
function selectItem(e) {
  const currentItem = e.currentTarget;
  currentItem.classList.add("selected--series");
  const contentText = currentItem.innerText;
  const contentImg = currentItem.firstElementChild;
  const contentId = currentItem.id;

  //clonar el current target to add for the list
  const cloneImg = contentImg.cloneNode();

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
      listFavorite.setAttribute("id", newArraySeries[i].showId);
      listFavorite.append(newArraySeries[i].showImg, newArraySeries[i].name);

      //localStorage
      localStorage.setItem("myShow", JSON.stringify(newArraySeries));
      const saveShow = JSON.parse(localStorage.getItem("myShow"));

      //Delete each fav
      listFavorite.addEventListener("click", deleteFav);

      console.log("newArraySeries: ", newArraySeries[i].name);
    }
  }
}

const butLog = document.querySelector('.butLog');
function countFavs() {
    const totalFav = document.querySelectorAll(".myFav");
    
}
butLog.addEventListener('click', countFavs);


//Delete each fav
function deleteFav(e) {
  const currentFav = e.currentTarget;
  let mainList = document.querySelectorAll(".main__li");

  for (let i = 0; i < mainList.length; i++) {
    if (currentFav.id === mainList[i].id) {
      mainList[i].classList.remove("selected--series");
      currentFav.remove();
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
        const language = dataArray[i].show.language;
        let objImg = objSerie.image;

        //create items
        let newLi = document.createElement("li");
        const newTitle = document.createElement("h2");
        const newImage = document.createElement("img");
        const newElLanguage = document.createElement("h3");

        //add id to the li's
        countId++;
        newLi.setAttribute("id", `show${countId}`);

        //add classes to new items
        newLi.classList.add("main__li");
        newTitle.classList.add("main__second-title");
        newImage.classList.add("main__img");
        newElLanguage.classList.add("main__lang");

        //appendchilds
        listSeries.appendChild(newLi);
        newLi.append(newImage, newTitle, newElLanguage);
        newImage.src = imgDefault;

        //img: original or default
        if (objImg === null || objImg === undefined) {
          newImage.src = imgDefault;
        } else {
          newImage.src = objSerie.image.medium;
        }
        newTitle.innerText = nameSerie;
        newElLanguage.innerText = language;

        //Select favorites
        newLi.addEventListener("click", selectItem);

        //loop language
        for (let j = 0; j < newLanguageArr.length; j++) {
          console.log(newLanguageArr[j]);

          if (newLanguageArr[j] === language) {
            newElLanguage.innerText = language + " Recomendado";
          }
        }
      }
    });
}
btn.addEventListener("click", callButton);
