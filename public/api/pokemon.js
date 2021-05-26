function test() {
  console.log("test");
}

test();

$("#submit").on("click", function () {
  var pokemon = $("#search").val();

  console.log(pokemon);
  apiCall(pokemon);
});

function apiCall(pokemon) {
  // search();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const card = $(`<h1>test </h1>`);

      $("#card").append(card);
      console.log(data);
    });
}

// var search = function () {
//   const btn = document.getElementById("submit");

//   btn.addEventListener("click", (e) => {
//     e.preventDefault();
//     const pokemon = document.getElementById("search").value;

//     console.log(pokemon);
//     apiCall(pokemon);
//   });
// };

// function apiCall(pokemon) {
//   // search();
//   fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     });
// }
