<<<<<<< HEAD
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
=======
// On window load => check if page is in frame or without parent location
const checkIfPageIsInFrame = () => {
    // The page is not in an iframe => redirect to /partials.html
    if (window.location === window.parent.location)
        window.location.href = "./partials.html";
    // if the page is in an iframe continue normally
};


// Edit Profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('close-edit-profile');
const save_changes=document.getElementById('save-changes'); //save button
const edited_name=document.getElementById('edited-name');//name
const edited_bio=document.getElementById('edited-bio');//bio


//Edit Profile Event Listeners
modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
})
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
})
>>>>>>> ab48ab88fc776f911a566e71c76ec59f707e9fdf




<<<<<<< HEAD
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

=======

//!------------------------------------------------------------------------------------
//!------------------------------------------------------------------------------------

//TODO when save is clicked
let getNameBioFrInput = (e) => {
    e.preventDefault();
    const full_name = edited_name.value;
    const bio = edited_bio.value;

    console.log("NAMEEEEE");
    console.log(full_name);
    console.log("BIOOOOO");
    console.log(bio);


}
save_changes.addEventListener("click", getNameBioFrInput);
>>>>>>> ab48ab88fc776f911a566e71c76ec59f707e9fdf
