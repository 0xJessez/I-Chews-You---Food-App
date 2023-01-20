function renderHome() {
    // document.querySelector('#page').innerHTML = ``
    randomRecipe()
}

function randomRecipe() {

    fetch(`https://api.spoonacular.com/recipes/random?apiKey=74435912eadc4e1782439aa61108dc41`)
        .then(response => response.json())
        .then(response => {
            var food = response.recipes[0]
            document.querySelector('#page').innerHTML = `
      <section class="random-icon">
      <button class="  random-button" onClick="randomRecipe()">
      Chews Another Recipe</button>
      </section>
      <div class="break"> </div>
      <section onclick='renderSingleRecipe(event)' class='feature-recipe' data-id='${food.id}'>
      <img src='${food.image}' alt=''>
      <div class="heading">
        <h2>${food.title}</h2>
      </div>
      </section>
      `
        })
}