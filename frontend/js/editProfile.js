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
