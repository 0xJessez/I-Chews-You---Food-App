function renderRecipeLikes(recipeId) {
    fetch(`/api/likes/${recipeId}`)
        .then(res => res.json())
        .then(numLikes => {
            state.likes = Number(numLikes.number_of_likes)
        })
}

function renderAddLike(recipeId) {
    fetch(`/api/likes/${recipeId}`, {
        method: 'POST'
    })
        .then(res => res.json())
        .then(ifLoggedIn())
        .then(
            document.querySelector('.like-counter').textContent = state.likes
        )
        // .then(state.likes += 1)

}

function ifLoggedIn() {
    if (state.loggedInUserName != null) {
        state.likes += 1
    }
}