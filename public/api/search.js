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
      const card = $(`
      <div class="card">
      <img class="card-img-top" src="${data.sprites.other.dream_world.front_default}" alt="Card image cap">
      <div class="card-body">
          <section class="heading">
              <h1 class="main-heading">${data.forms[0].name}</h1>
              <p class="stats">HP ${data.stats[0].base_stat} | XP ${data.base_experience}</p>
          </section>
         <section class="sub-heading">
             <div>
                 <p class="description">${data.types[0].type.name}</p>
                 <p class="title">Type</p>
             </div>
             <div class="div-border">
                 <p class="description">${data.weight}hg</p>
                 <p class="title">Weight</p>
             </div>
             <div>
                 <p class="description">${data.height}dm</p>
                 <p class="title">Height</p>
             </div>
         </section>
      </div>
  </div>
</div>  `);

      $("#card-container").append(card);
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
