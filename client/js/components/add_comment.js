// =======================================================================
// ADD COMMENTS
// =======================================================================

function renderAddComment(recipeId) {

  // replace below line with relevant position comments box should go
  document.querySelector('.new-comment').innerHTML = `
        <div class="comment-area">
            <form onSubmit="addComment(event)">
                
                <label for="ratings">Rating</label>
                <select name="ratings" id="ratings">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br>
                <label for="">Recipe ID</label>
                <input type="text" name="recipeId" value="${recipeId}" readonly>
                <br>

            
                <label for="">Comment</label>
                <textarea name="comment" id="" cols="50" rows="10"></textarea>
                <br>

                <button>Submit comment</button>
            </form>
        </div>
    `
}

// Need to pass in username to comment data

function addComment(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))

  fetch('/api/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    // confirm what function to call here
    .then(res => {
      if (res.error) {
        renderLogIn()
        renderError(res.error)
      }
      else {
        removeAddComment()
        // refresh page tbc
        // renderComments(recipeDataId)
        document.querySelector('.existing-comments').innerHTML = renderReviewList()
      }
    })
}

// consider rendering an error above the comment box

function renderError(errorMessage) {
  document.querySelector('#page').innerHTML = `<h2 style='color: red;'>${errorMessage}</h2>` + document.querySelector('#page').innerHTML
}

function removeAddComment(data) {
  // const recipeId = state.reviews[0].recipe_id
  const { ratings, recipeId, comment, reviewId } = data

  state.reviews.forEach(review => {
    if (review.review_id === Number(reviewId)) {
      review.rating = ratings
      review.review = comment
    }
  })

  return fetch(`/api/comments/${recipeId}`)
    .then(res => res.json())
    .then(reviews => {
      state.reviews = reviews
    })
    .then(document.querySelector('.existing-comments').innerHTML = renderReviewList())

  // renderComments(recipeId).then(console.log(state.reviews))

}

// =======================================================================
// EDIT COMMENTS
// =======================================================================


function renderEditComment(reviewId) {
  const comment = state.reviews.filter(review => { return review.review_id === reviewId })[0]

  // replace below line with relevant position comments box should go
  document.querySelector(`.review-${reviewId}`).innerHTML = `
        <div class="comment-area">
            <form onSubmit="editComment(event)">
            
                <div style='visibility:hidden'>
                    <label for="">Review ID</label>
                    <input type="text" name="reviewId" value="${reviewId}" readonly>
                </div>
            
                <div style='visibility:hidden'>
                    <label for="">Recipe ID</label>
                    <input type="text" name="recipeId" value="${comment.recipe_id}" readonly>
                </div>
        
                <div class="user-details">
                    <h4>${comment.username}</h4>
                    <div>
                        <fieldset>
                            <label for="ratings">Rating:</label>
                            <select name="ratings" id="ratings" value='${comment.rating}'>
                                <option ${ifSelected(comment.rating, 1)} value='1'>1</option>
                                <option ${ifSelected(comment.rating, 2)} value='2'>2</option>
                                <option ${ifSelected(comment.rating, 3)} value='3'>3</option>
                                <option ${ifSelected(comment.rating, 4)} value='4'>4</option>
                                <option ${ifSelected(comment.rating, 5)} value='5'>5</option>
                            </select>
                        </fieldset>
                    </div>
                </div>
                
                <div class="review-text">
                    <fieldset>
                        <label for="">Comment</label>
                        <textarea name="comment" id="" cols="50" rows="10">${comment.review}</textarea>
                    </fieldset>
                </div>
                
                <button>Edit comment</button>
            </form>
        </div>
    `
}

function editComment(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))
  console.log(data)

  fetch('/api/comments', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    // confirm what function to call here
    .then(res => {
      if (res.error) {
        renderLogIn()
        renderError(res.error)
      }
      else {
        removeAddComment(data)
        // refresh page tbc
        // renderComments(recipeDataId)
        document.querySelector('.existing-comments').innerHTML = renderReviewList()
      }
    })
}

// =======================================================================
// DELETE COMMENTS
// =======================================================================

function deleteReview(event) {
  const deleteBtn = event.target
  const recipeDOM = deleteBtn.closest('.review')
  const reviewId = recipeDOM.dataset.id

  fetch(`/api/comments/${reviewId}`, {
    method: 'DELETE'
  })
    .then(() => {
      state.reviews = state.reviews.filter(r => r.review_id != reviewId)
      // think of way to refresh page
      document.querySelector('.existing-comments').innerHTML = renderReviewList()

    })
}

function ifSelected(rating, option) {
  if (rating === option) {
    return 'selected'
  } else {
    return ''
  }
}