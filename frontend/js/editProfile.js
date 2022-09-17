// To open and close the Edit profile Modal
const modalBtn = document.getElementById('edit-p');
const modalBg=document.getElementById('modal-bg');
const modalClose=document.getElementById('close-edit-profile');

modalBtn.addEventListener('click', function(){
    modalBg.classList.add('bg-active');
})

modalClose.addEventListener('click', function(){
    modalBg.classList.remove('bg-active');
})

