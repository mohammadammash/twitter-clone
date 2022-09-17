const modalBtn = document.getElementById('edit-p');
const modalBg=document.getElementById('modal-bg');
console.log("hhhhjhjhjhjh")
console.log(modalBtn);

modalBtn.addEventListener('click', function(){
    console.log("heree");
    console.log(modalBg);
    modalBg.classList.add('bg-active');
})

