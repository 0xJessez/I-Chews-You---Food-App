function renderSignUp() {
    document.querySelector('#page').innerHTML = `
    <section class='sign-up'>
        <form onSubmit="signUp(event)">
            <h2>Sign Up:</h2>

            <h3 class='error-message'></h3>
            <div class="signup-center">

            
                <label for="">First Name: </label>
                <input type="text" name="first_name" required value size="30" maxlength="50">
                    <br>
                <label for="">Last Name: </label>
                <input type="text" name="last_name" required value size="30" maxlength="50">
                <br>
            
                <label for="">Username: </label>
                <input class='username' type="text" name="username" required value size="30" maxlength="50">
                <br>
            
                <label for="">Email: </label>
                <input class='email' type="text" name="email" required value size="30" maxlength="50">
                <br>
            
                <label for="">Password: </label>
                <input class='password' type="password" name="password" required value size="30" maxlength="50">
                <br>
            
                <label for="">Confirm Password: </label>
                <input class='confirm_password' type="password" name="confirm_password" required value size="30" maxlength="50"> 
                <br>
            
            </div>

            <button>Sign Up</button>
        </form>
    </section>
    `
}

function signUp(event) {
    event.preventDefault()
    const form = event.target
    const data = Object.fromEntries(new FormData(form))

    // if (checkPassword()) {
    //     fetch('/api/users', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(() => renderHome())
    // } else {
    //     renderSignUpPasswordIssue()
    // }

    if (!checkPassword()) {
        // renderSignUpPasswordIssue()
        document.querySelector('.error-message').textContent = 'Passwords do not match'
        // } else if (checkExistingUser(data)) {
        //     document.querySelector('.error-message').textContent = 'A user with that email already exists'
    } else {
        fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => renderHome())
    }


}

function checkPassword() {
    const password = document.querySelector('.password').value
    const confirmPassword = document.querySelector('.confirm_password').value

    if (password === confirmPassword) {
        return true
    } else {
        return false
    }
}

// function checkExistingUser(data) {
//     fetch('/api/users', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     })
//         .then(res => res.json())
//         .then(user => {
//             if (user) {
//                 return true
//             } else {
//                 return false
//             }
//         })
// }


// cannot pass body into a get request, need to figure out how to pass email param through to server via get request