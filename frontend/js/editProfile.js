// Edit profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('close-edit-profile');
const save_changes=document.getElementById('save-changes');
const edited_name = document.getElementById('edited-name');//name
const edited_bio = document.getElementById('edited-bio');//bio
console.log("user in local storage " + JSON.parse(localStorage.getItem("user")));


// On window load => check if page is in frame or without parent location
const checkIfPageIsInFrame = () => {
    // The page is not in an iframe => redirect to /partials.html
    if (window.location === window.parent.location)
        window.location.href = "./partials.html";
    // if the page is in an iframe continue normally
};

// Edit Profile Modal EventListeners
modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
})
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
})

//!----------------------------------------------------------------------------------
//TODO when save is clicked
let getNameBioFrInput = (e) => {
    e.preventDefault();
    const full_name = edited_name.value;
    const bio = edited_bio.value;


    console.log("name");
    console.log(full_name);
    console.log("bio");
    console.log(bio);
    const user_id = 1;
    //to change user_id = 1, to the below syntax since user's info is not showing on my device
    // const user = JSON.parse(localStorage.getItem("user"));
    // console.log("user in local storage " + JSON.parse(localStorage.getItem("user")));

    const update_db = async () => {
        try {
            console.log("here?");
            const url = "http://localhost/twitter-clone/backend/edit_profile.php";
            const response = await fetch(url, {
                method: "POST",
                body: new URLSearchParams({
                    user_id: user_id,
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

};



save_changes.addEventListener("click", getNameBioFrInput);

//!----------------------------------------------------------------------------------






// each time page loads, check if the user tries to access the page without partials page(outside of frame=>redirect to partials)
window.addEventListener("load", checkIfPageIsInFrame);

