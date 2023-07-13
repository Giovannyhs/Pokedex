//Elemento HTML donde se guardaran las tarjetas
const poke_container = document.getElementById("poke-container");
//Cantidad total de pokemon
const pokemon_count = 151;
//Definicion de colores por cada tipo de pokemon
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};
const main_types = Object.keys(colors);

//Optiene la informacion de cada pokemon
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};
//estilos de la card
const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");
  pokemonDiv.style.backgroundColor = colors[pokemon.types[0].type.name];
  //imagen correspondiente al pokemon con su respectivo nombre
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  const img = document.createElement("img");
  img.src = pokemon.sprites.other["official-artwork"].front_default;
  img.alt = pokemon.name;
  imgContainer.appendChild(img);
  //informacion del pokemon con su estilo CSS
  const info = document.createElement("div");
  info.classList.add("info");
  //numero del pokemon
  const number = document.createElement("span");
  number.classList.add("number");
  number.textContent = "#" + padNumber(pokemon.id, 3);
  info.appendChild(number);
  //nombre del pokemon
  const name = document.createElement("h3");
  name.classList.add("name");
  name.textContent = capitalizeFirstLetter(pokemon.name);
  info.appendChild(name);
  //tipo de pkemon
  const type = document.createElement("small");
  type.classList.add("type");
  type.innerHTML = `Type: <span>${pokemon.types
    .map((type) => type.type.name)
    .join(", ")}</span>`;
  info.appendChild(type);
  //organizacion de los elementos creados en el contenedor principal
  pokemonDiv.appendChild(imgContainer);
  pokemonDiv.appendChild(info);

  poke_container.appendChild(pokemonDiv);
};
//funciones auxiliares que resetea los datos de los pokemon
const padNumber = (number, length) => {
  return String(number).padStart(length, "0");
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

fetchPokemons();
