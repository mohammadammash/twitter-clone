const newtweet_text = document.getElementById('newtweet-text');
const newtweet_imgurl = document.getElementById('newtweet-imgurl');
const newtweet_submit = document.getElementById('newtweet-submit');
const newtweet_imgshow = document.getElementById('newtweet-imgshow');
var base64String;

// show image and save url
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

// whenever we change the image we add, recreate base64 and show the new image
newtweet_imgurl.addEventListener("change", uploadImage);

