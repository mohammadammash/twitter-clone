// to show user data in the bottom of left sidebar 
const user_img = document.getElementById("user_img");
const full_name = document.getElementById("name");
const username = document.getElementById("username");
// to handle search_query_text and content to show(users) below it
const search_bar = document.getElementById('search-text');
const search_content = document.getElementById("search-content");

// add the users to the search content in '../show/partials.html'
const showInSearchContent = user=>{
  console.log(user);
}

// fetch the users using search query
const getUsers = async ()=>{
  const search_text = search_bar.value;
  try{
    const url = `http://localhost/twitter-clone/backend/search_by_user.php?search_text=${search_text}`
    const response = await fetch(url);
    const data = await response.json();
    for(let user of data) showInSearchContent(user);
  }
  catch(err){
    console.log(err);
  }
}

// to check if there is a currentUser
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
// listen to any change in search bar text immediately!:
search_bar.addEventListener('input',getUsers);
