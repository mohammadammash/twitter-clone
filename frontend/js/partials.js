const user_img = document.getElementById('user_img');
const full_name = document.getElementById("name");
const username = document.getElementById("username");

    let user = localStorage.getItem('user');
    if(user){
        user = JSON.parse(user);
    }
    else{
        // if there is no user => redirect to home page
        window.location.href = '../index.html';
    }
}

// check if there is a user(redirected from home/index) or if anyone tried to visit this page directly from URL
window.addEventListener('load',checkCurrentUser);