// to show user data in the bottom of left sidebar
const user_img = document.getElementById("user_img");
const full_name = document.getElementById("name");
const username = document.getElementById("username");
// to handle search_query_text and content to show(users) below it
const search_bar = document.getElementById("search-text");
const search_content = document.getElementById("search-content");
const logout_btn = document.getElementById('logout');

// add the users to the search content in '../show/partials.html'
const showInSearchContent = (user) => {
  if(!user.avatar_url) user.avatar_url = '../assets/dummy-profile-pic.png';
  
  const user_HTML = `
      <div class="tweet-object img">
        <img class="pp" src="${user.avatar_url}" />
          <div class="tweet-obj-writer">
            <a href="" class="tweet-obj-name name">
              ${user.full_name}
              <span class="tweet-obj-username username"> @${user.username} </span>
                <span id='user_id' class="display-none"> ${user.id}</span>
            </a>
          </div>
          <div class="tweet-obj-text">
            <p>${user.bio}</p>
          </div>
      </div>`;
  search_content.innerHTML += user_HTML;
};

// fetch the users using search query
const getUsers = async () => {
  // clean the search-content each time and get new values
  search_content.innerHTML = "";
  const search_text = search_bar.value;
  // don't add any query when search text = ''
  if (!search_text) return;
    try {
      const url = `http://localhost/twitter-clone/backend/search_by_user.php?search_text=${search_text}`;
      const response = await fetch(url);
      const data = await response.json();
      for (let user of data) showInSearchContent(user);
    } catch (err) {
      console.log(err);
    }
};

// to check if there is a currentUser
const checkCurrentUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    if(!user.avatar_url) user.avatar_url = '../assets/dummy-profile-pic.png';
    [user_img.src, full_name.textContent, username.textContent] = [
      user.avatar_url,
      user.full_name,
      user.username,
    ];
  } else {
    // if there is no user => redirect to home page
    window.location.href = "../index.html";
  }
};

// logout:
const logUserOut = ()=>{
  localStorage.clear();
}

// check if there is a user(redirected from home/index) or if anyone tried to visit this page directly from URL
window.addEventListener("load", checkCurrentUser);
// listen to any change in search bar text immediately!:
search_bar.addEventListener("input", getUsers);
// logout:
logout_btn.addEventListener('click',logUserOut);
