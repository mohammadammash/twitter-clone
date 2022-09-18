// Edit profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('close-edit-profile');
// To replace the contents with the modified data
const newtweet_text = document.getElementById("newtweet-text"); //name
const newtweet_imgurl = document.getElementById("newtweet-imgurl"); //bio
const newtweet_submit = document.getElementById("newtweet-submit"); //pp
const newtweet_imgshow = document.getElementById("newtweet-imgshow"); //banner

var base64String;
const feed_content = document.getElementById("feed-content");




// Edit Profile Modal EventListeners
modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
})
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
})




//now need to apply name and bio changes to the profile section




// each time page loads, check if the user tries to access the page without partials page(outside of frame=>redirect to partials)
window.addEventListener("load", checkIfPageIsInFrame);

