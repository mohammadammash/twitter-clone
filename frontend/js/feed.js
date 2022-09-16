const newtweet_text = document.getElementById('newtweet-text');
const newtweet_imgurl = document.getElementById('newtweet-imgurl');
const newtweet_submit = document.getElementById('newtweet-submit');
const newtweet_imgshow = document.getElementById('newtweet-imgshow');
var base64String;


// show image and save url (didn't use arrow function => 'this' doen't work well inside)
function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      newtweet_imgshow.src = e.target.result;
      newtweet_imgshow.classList.remove('display-none');
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




// whenever we change the image we add, recreate base64 and show the new image
newtweet_imgurl.addEventListener("change", uploadImage);
// submit the new tweet
// newtweet_submit.addEventListener('click',addNewTweet);