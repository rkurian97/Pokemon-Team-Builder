// teamNames = ["charmander", "ditto", 'lapras', "lugia", "pikachu", "squirtle"];
teamData = []

fetch("/getTeam")
    .then(response => response.json())
    .then(data=> {
        for(pokemon of data.teamNames){
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const card = $(`
              <div class="col-6">
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
                 <div>
                     <button class="release-btn" type="button" onclick="releasePokemon('${data.forms[0].name}')" >RELEASE</button>
                 </div>
              </div>
          </div>
        </div> 
        </div> `);
        
              $("#teamContainer").append(card);
            });
        }
    });

    function releasePokemon(name){
        fetch("/release", {
            method: "DELETE",
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, 
            body: JSON.stringify( {name: name})})
        .then(res=> {
            console.log(res)
        })
        location.reload()
    }
