var form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let urlForm = "https://pokeapi.co/api/v2/pokemon/";

  let name = document.getElementById("name");

  urlForm += this.name.value;

  let response = document.getElementById("content");

  let image = document.getElementById("imgPokemon");

  let html = "";

  fetch(urlForm)
    .then((response) => response.json())
    .then(function (data) {
      html = "ID: " + data.id + "<br>";
      html = html + "Nome: " + upper(data.forms[0].name) + "<br>";
      html = html + "Tipo: " + upper(data.types[0].type.name) + "<br>";
      html =
        html +
        "<a href='https://www.pokemon.com/br/pokedex/" +
        data.id +
        "' target='_blank'>Pokédex</a>";

      response.innerHTML = html;

      image.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src='" +
        data.sprites.back_default +
        "'>";

      name.value = "";
      name.focus();
    })
    .catch(function (err) {
      if (err == "SyntaxError: Unexpected token N in JSON at position 0") {
        html = "Pokémon não encontrado";
      } else {
        html = err;
      }
      response.innerHTML = html;

      image.innerHTML =
        "<img width='100px' height='100px' src='./img/placeholder.png'><img width='100px' height='100px' src='./img/placeholder.png'>";

      name.value = "";
      name.focus();
    });
});

function upper(value) {
  return value[0].toUpperCase() + value.substr(1);
}
