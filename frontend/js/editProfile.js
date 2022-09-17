// To open and close the Edit profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('close-edit-profile');

modalBtn.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
})

modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
})


// On window load => check if page is in frame or without parent location
const checkIfPageIsInFrame = () => {
    // The page is not in an iframe => redirect to /partials.html
    if (window.location === window.parent.location)
        window.location.href = "./partials.html";
    // if the page is in an iframe continue normally
};


