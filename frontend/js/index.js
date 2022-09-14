const login_modal = document.getElementById('login-modal');
const login_submit_btn = document.getElementById("login-submit");
const login_show_btn = document.getElementById("login-show");
const close_login = document.getElementById("close-login");

const signup_modal = document.getElementById('signup-modal');
const signup_submit_btn = document.getElementById('signup-submit');
const signup_show_btn = document.getElementById("signup-show");
const signup_show_link = document.getElementById('signup-link');
const close_signup = document.getElementById('close-signup');

// SIGN UP FUNCTIONS
const showSignupModal = ()=>{
    // make sure login-modal is hidden(add display-none) - hence we can go directly from login-modal to sign-up modal 
    login_modal.classList.add('display-none'); //note: it have no effect if class already exists
    signup_modal.classList.remove('display-none');
}
    // handle signup form submit
const createNewUser = (e)=>{
    e.preventDefault();
}

// LOGIN FUNCTIONS
const showLoginModal = ()=>{
    // there is no way to access login from signup page => no need to hide signup-modal hence it is already hidden
    login_modal.classList.remove('display-none')
}
    // handle login form submit
const loginUser = (e) => {
  e.preventDefault();
};


// SIGNUP EVENT LISTENERS
signup_show_btn.addEventListener('click',showSignupModal);
signup_show_link.addEventListener("click", showSignupModal);
signup_submit_btn.addEventListener('click',createNewUser);
close_signup.addEventListener("click", () =>signup_modal.classList.add("display-none"));
// LOGIN EVENT LISTENERS
login_show_btn.addEventListener("click", showLoginModal);
login_submit_btn.addEventListener("click", loginUser);
close_login.addEventListener("click", () =>login_modal.classList.add("display-none"));