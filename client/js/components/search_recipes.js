function renderSearch() {
  document.querySelector('#page').innerHTML = `
  <div class="display-image">
    <img class="search-image" src="./css/images/search-image-resized.png" alt="">
    <div class="div-form">
    <h2> WHAT'S COOKING? </h2>
    <form action="">
      <input placeholder="search by recipe or ingredient..." type="text">
      <button class="search-recipe">SEARCH</button>
    </form>
  </div>
  
  <span class="search-results"></span>
  `
  const searchResults = document.querySelector('.search-results')
  const searchButton = document.querySelector('.search-recipe')

  searchButton.addEventListener('click', event => {
    event.preventDefault()
    const searchInput = document.querySelector('input').value
    console.log(searchInput)

    findRecipe(searchInput)
  })
}

function findRecipe(searchInput) {
  fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=247841a848f5433ba355a9d1cb38b293`)
    .then(response => response.json())
    .then(searchResults => {
      const searchOutput = searchResults.results
      fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&apiKey=247841a848f5433ba355a9d1cb38b293`)
        .then(response => response.json())
        .then(searchResults => {
          const searchOutput = searchResults.results

          console.log(searchOutput)
          renderSearchList(searchOutput)

        })
    }

function findRecipeById(recipeId) {
        fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=f07421ca41354737bcd3dadbe61cbb52`)
          .then(response => response.json())
          .then(searchResult => {
            return searchResult
          })
      }
// function renderSearchList(searchOutput) {
//     document.querySelector('#page').innerHTML = `
//     <section class='search-rslt'>
//       ${renderSearchResults(searchOutput)}
//     </section>
//   `
// }

// function renderSearchResults(searchOutput) {
//     return searchOutput.map(output => `
//    <section onClick='renderSingleRecipe(event)' class="recipe" data-id='${output.id}'>
//       <h2>${output.title}</h2>
//       <img src='${output.image}' alt=''>
//    </section>
//   `).join(" ")
// }
