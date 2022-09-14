const login_modal = document.getElementById('login-modal');
const login_submit_btn = document.getElementById("login-submit");
const login_show_btn = document.getElementById("login-show");
const signup_modal = document.getElementById('signup-modal');
const signup_submit_btn = document.getElementById('signup-submit');
const signup_show_btn = document.getElementById("signup-show");
const signup_show_link = document.getElementById('signup-link');

const showSignupModal = ()=>{
    console.log('HEYYY')
    // make sure login-modal is hidden(add display-none) - hence we can go directly from login-modal to sign-up modal 
    login_modal.classList.add('display-none'); //note: it have no effect if class already exists
    signup_modal.classList.remove('display-none');
}

signup_show_btn.addEventListener('click',showSignupModal);
signup_show_link.addEventListener("click", showSignupModal);