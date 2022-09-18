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
const own_tweets_content = document.getElementById("own-tweets");
const all_tweets_content = document.getElementById("all-tweets");
const own_tweets_button = document.getElementById("own-tweets-btn");
const all_tweets_button = document.getElementById("all-tweets-btn");
const new_profile_pic = document.getElementById("new-profile-pic");
const new_profile_banner = document.getElementById("new-banner-pic");
const new_profile_pic_show = document.getElementById("profile-show");
const new_profile_banner_show = document.getElementById("profile-banner");
var base64StringProfile, base64StringBanner;

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

//places users info in edit input fields
const show_edit_modal_data = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  edited_bio.value = user.bio ? user.bio : "No Bio";
  edited_name.value = user.username;
  if (user.avatar_url)
    new_profile_pic_show.style.backgroundImage = `url(${user.avatar_url})`;
  if (user.banner)
    new_profile_banner_show.style.backgroundImage = `url(${user.banner})`;
};

// Edit Profile Modal EventListeners
modalBtn.addEventListener("click", function () {
  modalBg.classList.add("bg-active");
  show_edit_modal_data();
});
modalClose.addEventListener("click", function () {
  modalBg.classList.remove("bg-active");
});

// return diff between now and tweet creation/post time:
function timeDifference(tweetDate) {
  const rightnow = Date.now();

  //difference in sec
  const sec = Math.abs(rightnow - tweetDate) / 1000;
  // get total days between two dates:
  const days = Math.floor(sec / 86400);
  // months:
  const months = Math.floor(days / 30);
  //years:
  const years = Math.floor(months / 12);
  // get hours
  const hours = Math.floor(sec / 3600);
  // get minutes
  const minutes = Math.floor(sec / 60);
  // get seconds

  if (years > 0) return `${years}y`;
  else if (months > 0) return `${months}m`;
  else if (days > 0) return `${days}d`;
  else if (hours > 0) return `${hours}h`;
  else if (minutes > 0) return `${minutes}m`;
  return `${Math.floor(sec)}s`;
}

// append user tweets to html:
const createTweet = (tweet, user) => {
  let tweet_HTML = `
    <div class="tweet-object">
        <img class="pp" src="${user.avatar_url}" />
        <div class="tweet-obj-contents">
          <div class="tweet-obj-writer">
            <a href="" class="tweet-obj-name">${user.full_name}
              <span class="tweet-obj-username"> ${user.username} </span>
              <span class="tweet-obj-time"> ${timeDifference(
                tweet.created_datetime
              )}</span>
            </a>
          </div>
          <div class="tweet-obj-text">
            <p>
              ${tweet.text}
            </p>
          </div>`;
  if (tweet.image_url) {
    tweet_HTML += `<div class="tweet-obj-img">
      <img class="tweet-img" src="${tweet.image_url}" alt=''/>
    </div>`;
  }
  tweet_HTML += `<div class="tweet-obj-heart-likes">
            <i class="fa-regular fa-heart"></i>
            <p>${tweet.nb_of_likes}</p>
          </div>
        </div>
      </div>
    `;
  own_tweets_content.innerHTML += tweet_HTML;
};

// append the followed tweets in allTweets:
const createFollowedTweets = (tweet) => {
  let tweet_HTML = `
    <div class="tweet-object">
        <img class="pp" src="${tweet.avatar_url}" />
        <div class="tweet-obj-contents">
          <div class="tweet-obj-writer">
            <a href="" class="tweet-obj-name">${tweet.tweet_user_name}
              <span class="tweet-obj-username"> ${tweet.tweet_username} </span>
              <span class="tweet-obj-time"> ${timeDifference(
                tweet.created_datetime
              )}</span>
            </a>
          </div>
          <div class="tweet-obj-text">
            <p>
              ${tweet.tweet_text}
            </p>
          </div>`;
  if (tweet.tweet_img) {
    tweet_HTML += `<div class="tweet-obj-img">
      <img class="tweet-img" src="${tweet.tweet_img}" alt=''/>
    </div>`;
  }
  tweet_HTML += `<div class="tweet-obj-heart-likes">
            <i class="fa-regular fa-heart"></i>
            <p>${tweet.nb_of_likes}</p>
          </div>
        </div>
      </div>
    `;
  all_tweets_content.innerHTML += tweet_HTML;
};

const loadUserTweets = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `http://localhost/twitter-clone/backend/get_user_tweets.php?user_id=${user.id}`;
    const response = await fetch(url);
    const data = await response.json();
    for (let own_tweet of data) {
      createTweet(own_tweet, user);
    }
  } catch (err) {
    console.log(err);
  }
};

const loadFollowedTweets = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.tweets) return;
  for (let tweet of user.tweets) {
    createFollowedTweets(tweet);
  }
  own_tweets_content.classList.add("display-none");
  all_tweets_content.classList.remove("display-none");
};

const showFollowedTweets = () => {
  own_tweets_content.classList.add("display-none");
  all_tweets_content.classList.remove("display-none");
};
const showUserTweets = () => {
  all_tweets_content.classList.add("display-none");
  own_tweets_content.classList.remove("display-none");
};

// show profile image directly after choosing new image in edit_modal and save url
function uploadProfileImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64StringProfile = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      new_profile_pic_show.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(this.files[0]);
  }
}
// show profile image directly after choosing new image in edit_modal and save url
function uploadBannerImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64StringBanner = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      new_profile_banner_show.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(this.files[0]);
  }
}
const update_user = async () => {
  // try {
  //   const url = "http://localhost/twitter-clone/backend/edit_profile.php";
  //   const response = await fetch(url, {
  //     method: "POST",
  //     body: new URLSearchParams({
  //       user_id: user.id,
  //       edited_name: full_name,
  //       edited_bio: bio,
  //       edited_pp: "",
  //       edited_banner: "",
  //     }),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }
};

// //To display the updated info on the page
// const update_page_info = () => {
//   name_on_page.innerHTML = full_name;
//   bio_on_page.innerHTML = bio;
// };

// update_page_info();
// modalBg.classList.remove("bg-active");

save_changes.addEventListener("click", update_user);

// each time page loads, check if the user tries to access the page without partials page(outside of frame=>redirect to partials)
window.addEventListener("load", checkIfPageIsInFrame);
window.addEventListener("load", loadProfile);
window.addEventListener("load", loadFollowedTweets);
window.addEventListener("load", loadUserTweets);
own_tweets_button.addEventListener("click", showUserTweets);
all_tweets_button.addEventListener("click", showFollowedTweets);
// whenever profile image or banner changes => update the picture shown:
new_profile_pic.addEventListener("change", uploadProfileImage);
new_profile_banner.addEventListener("change", uploadBannerImage);
