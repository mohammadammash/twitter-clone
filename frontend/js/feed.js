const newtweet_text = document.getElementById("newtweet-text");
const newtweet_imgurl = document.getElementById("newtweet-imgurl");
const newtweet_submit = document.getElementById("newtweet-submit");
const newtweet_imgshow = document.getElementById("newtweet-imgshow");
var base64String;
const feed_content = document.getElementById("feed-content");

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

// find today's date as dd/mm/yyyy:
const getTodayDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
};

// handle newTweet addition
const addNewTweet = () => {
  const text = newtweet_text.value;
  const user_id = JSON.parse(localStorage.getItem("user"))[0].id;
  const created_datetime = getTodayDate(); //as:  dd/mm/yy
  const image_url = base64String ? base64String : "";

  const add_tweet = async () => {
    try {
      const url = "http://localhost/twitter-clone/backend/add_tweet.php";
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          text,
          image_url,
          user_id,
          created_datetime,
          nb_of_likes: "0",
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  add_tweet();
};

// GET and Show Tweets
const showTweets = () => {
  const user = JSON.parse(localStorage.getItem("user"))[0];

  const addTweet_to_feed = (tweet) => {
    const tweet_HTML = `
      <div class="tweet-object">
        <img class="pp" src="${tweet.avatar_url}" />
        <div class="tweet-obj-contents">
          <div class="tweet-obj-writer">
            <a href="" class="tweet-obj-name">
              ${tweet.tweet_user_name}
              <span class="tweet-obj-username"> @${tweet.tweet_username} </span>
              <span class="tweet-obj-time">
                &#183${tweet.created_datetime}
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
      </div>`
    feed_content.innerHTML += tweet_HTML;
  };
  //fetch tweets from API, and send tweet to be created as html element
  const get_tweets = async () => {
    try {
      const url = `http://localhost/twitter-clone/backend/get_tweets.php?user_id=${user.id}`;
      const response = await fetch(url);
      const data = await response.json();
      for (let tweet of data) {
        console.log(tweet);
        addTweet_to_feed(tweet);
      }
    } catch (err) {
      console.log(err);
    }
  };

  get_tweets();
};

// whenever we change the image we add, recreate base64 and show the new image
newtweet_imgurl.addEventListener("change", uploadImage);
// submit the new tweet
newtweet_submit.addEventListener("click", addNewTweet);
// showing tweets of followed users when page loads:
window.addEventListener("load", showTweets);
