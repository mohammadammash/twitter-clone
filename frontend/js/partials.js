const user_img = document.getElementById("user_img");
const full_name = document.getElementById("name");
const username = document.getElementById("username");

const checkCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    [user_img.src,full_name.textContent,username.textContent] = [user[0].avatar_url,user[0].full_name, user[0].username];
  } else {
    // if there is no user => redirect to home page
    window.location.href = "../index.html";
  }
};

// check if there is a user(redirected from home/index) or if anyone tried to visit this page directly from URL
window.addEventListener("load", checkCurrentUser);
