// Edit profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('close-edit-profile');
const save_changes = document.getElementById('save-changes');
const edited_name = document.getElementById('edited-name');//name
const edited_bio = document.getElementById('edited-bio');//bio
// console.log("user in local storage " + JSON.parse(localStorage.getItem("user")));


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


//A function that retrieves user info from db and displays them in the input fields of the modal
//!document.getElementById("nameofid").value = "My value";

    //to change user_id = 1, to the below syntax since user's info is not showing on my device's local storage
    // const user = JSON.parse(localStorage.getItem("user"));

    const changeInputValue = async () => {
        try {
            // const url = `http://localhost/twitter-clone/backend/user_info.php?user_id=${user.id}`;
            const url = `http://localhost/twitter-clone/backend/user_info.php?user_id=1`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const original_name=data[0].full_name;
            console.log(original_name);
            const original_bio=data[0].bio;
            console.log(original_bio);
            const original_pp=data[0].banner;
            console.log(original_pp);
            const original_banner=data[0].avatar_url;
            console.log(original_banner);

            document.getElementById("edited-name").value = original_name;
            document.getElementById("edited-bio").value = original_bio;


        } catch (err) {
            console.log(err);
        }
    };

    changeInputValue();







//A function that gets user info from input fields and update the db accordingly
let getNameBioFrInput = (e) => {
    e.preventDefault();
    const full_name = edited_name.value;
    const bio = edited_bio.value;


    console.log("name");
    console.log(full_name);
    console.log("bio");
    console.log(bio);
    const user_id = 1;
    //to change user_id = 1, to the below syntax since user's info is not showing on my device's local storage
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

