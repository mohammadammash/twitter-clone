// Edit profile Modal
const modalBtn = document.getElementById("edit-p");
const modalBg = document.getElementById("modal-bg");
const modalClose = document.getElementById("close-edit-profile");
const save_changes = document.getElementById("save-changes");
const edited_name = document.getElementById("edited-name"); //name
const edited_bio = document.getElementById("edited-bio"); //bio
const name_on_page = document.getElementById("name-on-page");
const bio_on_page = document.getElementById("bio-on-page");
const left_arrow = document.getElementById("left-arrow");
const profile_picture = document.getElementById("profile-picture");
const username = document.getElementById("username");
const joined_at = document.getElementById("joined-at");

//to redirect to feed page if left arrow is clicked
left_arrow.addEventListener("click", function () {
  window.location.href = "./feed.html";
});

//load profile
const loadProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  profile_picture.style.backgroundImage = `url(${user.avatar_url})`;
  if (user.bio) bio_on_page.textContent = user.bio;
  name_on_page.textContent = user.full_name;
  username.textContent = user.username;
  joined_at.textContent = user.joined_in_date;
};

// On window load => check if page is in frame or without parent location
const checkIfPageIsInFrame = () => {
  // The page is not in an iframe => redirect to /partials.html
  if (window.location === window.parent.location)
    window.location.href = "./partials.html";
  // if the page is in an iframe continue normally
};

// Edit Profile Modal EventListeners
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
});
modalClose.addEventListener("click", function () {
  modalBg.classList.remove("bg-active");
});

const loadUserTweets = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const url = `http://localhost/twitter-clone/backend/user_info.php?get_user_tweets=${user.id}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data[0]);
};

//A function that retrieves user info from db and displays them in the input fields of the modal
const changeInputValue = async () => {
  try {
    const original_name = data[0].full_name;
    const original_bio = data[0].bio;
    const original_pp = data[0].banner;
    const original_banner = data[0].avatar_url;

    name_on_page.innerHTML = original_name;
    bio_on_page.innerHTML = original_bio;
    edited_name.value = original_name;
    edited_bio.value = original_bio;
  } catch (err) {
    console.log(err);
  }
};

// changeInputValue();

//A function that gets user info from input fields and update the db accordingly
let getNameBioFrInput = (e) => {
  e.preventDefault();
  const full_name = edited_name.value;
  const bio = edited_bio.value;

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("name");
  console.log(full_name);
  console.log("bio");
  console.log(bio);

  const update_db = async () => {
    try {
      console.log("here?");
      const url = "http://localhost/twitter-clone/backend/edit_profile.php";
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          user_id: user.id,
          edited_name: full_name,
          edited_bio: bio,
          edited_pp: "",
          edited_banner: "",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  update_db();

  //To display the updated info on the page
  const update_page_info = () => {
    name_on_page.innerHTML = full_name;
    bio_on_page.innerHTML = bio;
  };

  update_page_info();
  modalBg.classList.remove("bg-active");
};

save_changes.addEventListener("click", getNameBioFrInput);

// each time page loads, check if the user tries to access the page without partials page(outside of frame=>redirect to partials)
window.addEventListener("load", checkIfPageIsInFrame);
window.addEventListener("load", loadProfile);
window.addEventListener("load", loadUserTweets);
