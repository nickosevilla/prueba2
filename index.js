let id;

async function searchChar(val) {
  try {
    let url = `https://swapi.dev/api/people/?search=${val}`;
    let res = await fetch(url);
    let data = await res.json();

    return data.results;
  } catch {
    console.log("algo salió mal");
  }
}

async function fetchImage(character) {
  try {
    const url = `https://swapi.dev/api/people/?search=${character.name}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results.length > 0) {
      const characterData = data.results[0];
      character.image = `https://starwars-visualguide.com/assets/img/characters/${characterData.url.split('/')[5]}.jpg`;
    }
  } catch {
    console.log('Algo salió mal al obtener la imagen del personaje.');
  }
}

async function main() {
  let val = document.querySelector("#myin").value;
  let response = searchChar(val);
  let data = await response;
  
  for (const character of data) {
    await fetchImage(character);
  }

  document.querySelector("#searchbar").innerHTML = null;
  if (data === undefined) {
    return false;
  }
  data.forEach(function (el) {
    let name = document.createElement("p");
    name.innerHTML = el.name;
    name.setAttribute("class", "searchres");
    name.addEventListener("click", function () {
      myfun(el);
    });
    document.querySelector("#searchbar").append(name);
  });
}

function debounce(fun, delay) {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(function () {
    fun();
  }, delay);
}

function myfun(el) {
  document.getElementById("main").innerHTML = "";
  let char = document.createElement("h1");
  char.innerHTML = el.name;
  let maindiv = document.createElement("div");
  maindiv.setAttribute("id", "maindiv");
  maindiv.style.border = "2px solid rgb(255, 235, 0)";
  
  // 
  const image = document.createElement('img');
  image.src = el.image;
  image.alt = el.name;
  maindiv.prepend(image);
  
  let birth = document.createElement("p");
  birth.innerHTML = "Año de nacimiento: " + el.birth_year;
  let gender = document.createElement("p");
  gender.innerHTML = "Género: " + el.gender;
  let height = document.createElement("p");
  height.innerHTML = "Altura: " + el.height;
  let eye_color = document.createElement("p");
  eye_color.innerHTML = "Color de ojos: " + el.eye_color;
  let weight = document.createElement("p");
  weight.innerHTML = "Peso: " + el.mass;
  let hair = document.createElement("p");
  hair.innerHTML = "Color de cabello: " + el.hair_color;
  let skin = document.createElement("p");
  skin.innerHTML = "Color de piel: " + el.skin_color;
  maindiv.append(birth, gender, height, eye_color, weight, hair, skin);
  let btn = document.createElement("button");
  btn.innerHTML = "Volver";
  btn.setAttribute("id", "go");
  btn.addEventListener("click", function () {
    goBack();
  });
  document.querySelector("#main").append(char, maindiv, btn);
}

function goBack() {
  window.location.reload();
}
