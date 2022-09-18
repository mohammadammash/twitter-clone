const newtweet_text = document.getElementById("newtweet-text");
const newtweet_imgurl = document.getElementById("newtweet-imgurl");
const newtweet_submit = document.getElementById("newtweet-submit");
const newtweet_imgshow = document.getElementById("newtweet-imgshow");
var base64String;
const feed_content = document.getElementById("feed-content");

// on window load => check if page is in frame or without parent location
const checkIfPageIsInFrame = () => {
  // The page is not in an iframe => redirect to /partials.html
  if (window.location === window.parent.location)
    window.location.href = "./partials.html";
  // if the page is in an iframe continue normally
};

// show image and save url (didn't use arrow function => 'this' doen't work well inside)
function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      newtweet_imgshow.src = e.target.result;
      newtweet_imgshow.classList.remove("display-none");
    };
    reader.readAsDataURL(this.files[0]);
  }
}

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

// add tweet to feed
const addTweet_to_feed = (tweet) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dateDiff = timeDifference(tweet.created_datetime);
  if(!tweet.avatar_url) tweet.avatar_url = '../assets/dummy-profile-pic.png'; 

  const tweet_HTML = `
      <div class="tweet-object">
        <img class="pp" src="${tweet.avatar_url}" />
        <div class="tweet-obj-contents">
          <div class="tweet-obj-writer">
            <a href="" class="tweet-obj-name">
              ${tweet.tweet_user_name}
              <span class="tweet-obj-username"> @${tweet.tweet_username} </span>
              <span class="tweet-obj-time">
                &#183 ${dateDiff}
              </span>
              <span id='tweet_user_id' class="display-none">
                &#183${tweet.tweet_user_id}
              </span>
            </a>
          </div>
          <div class="tweet-obj-text">
            <p>${tweet.tweet_text}</p>
          </div>
          <div class="tweet-obj-img">
            <img class="tweet-img" src="${tweet.tweet_img}" />
          </div>
          <div class="tweet-obj-heart-likes">
            <i class="fa-regular fa-heart"></i>
            <p>${tweet.nb_of_likes}</p>
          </div>
        </div>
      </div>`;
  feed_content.innerHTML += tweet_HTML;
};

// GET and Show Tweets
const showTweets = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  //fetch tweets from API, and send tweet to be created as html element
  const get_tweets = async () => {
    try {
      const url = `http://localhost/twitter-clone/backend/get_tweets.php?user_id=${user.id}`;
      const response = await fetch(url);
      const data = await response.json();
      const tweets = [];
      // add tweets to local storage inside the "user['tweets']"
      for (let tweet of data) {
        tweets.push(tweet);
        addTweet_to_feed(tweet);
      }
      user["tweets"] = tweets;
      localStorage.setItem("user", JSON.stringify(user)); //update localstorage
      console.log(user)
    } catch (err) {
      console.log(err);
    }
  };

  get_tweets();
};

// handle newTweet addition
const addNewTweet = () => {
  const text = newtweet_text.value;
  const user = JSON.parse(localStorage.getItem("user"));
  const created_datetime = Date.now();
  const image_url = base64String ? base64String : "";

  const add_tweet = async () => {
    try {
      const url = "http://localhost/twitter-clone/backend/add_tweet.php";
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          text,
          image_url,
          user_id: user.id,
          created_datetime,
          nb_of_likes: "0",
        }),
      });
      const data = await response.json();
      console.log(data);
      // append to user['tweets'] in localStorage the new added tweet
      user["tweets"].push({
        'text': text,
        'image_url': image_url,
        'user_id': user.id,
        'created_datetime': created_datetime,
        'nb_of_likes': "0",
      });
      localStorage.setItem("user", JSON.stringify(user)); //update localstorage
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  add_tweet();
};

// whenever we change the image we add, recreate base64 and show the new image
newtweet_imgurl.addEventListener("change", uploadImage);
// submit the new tweet
newtweet_submit.addEventListener("click", addNewTweet);
// showing tweets of followed users when page loads:
window.addEventListener("load", showTweets);
// each time page loads, check if the user tries to access the page without partials page(outside of frame=>redirect to partials)
window.addEventListener("load", checkIfPageIsInFrame);
