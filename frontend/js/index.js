//login
const login_modal = document.getElementById("login-modal");
const login_submit_btn = document.getElementById("login-submit");
const login_show_btn = document.getElementById("login-show");
const close_login = document.getElementById("close-login");
// login-inputs
const login_username = document.getElementById("login-username");
const login_password = document.getElementById("login-password");
// signup
const signup_modal = document.getElementById("signup-modal");
const signup_submit_btn = document.getElementById("signup-submit");
const signup_show_btn = document.getElementById("signup-show");
const signup_show_link = document.getElementById("signup-link");
const close_signup = document.getElementById("close-signup");
// signup-dropdowns
const daySelect = document.getElementById("signup-birthday");
const monthSelect = document.getElementById("signup-birthmonth");
const yearSelect = document.getElementById("signup-birthyear");
// signup-inputs
const signup_full_name = document.getElementById("signup-name");
const signup_phone_nb = document.getElementById("signup-phone");
const signup_username = document.getElementById("signup-username");
const signup_password = document.getElementById("signup-password");
const signup_email = document.getElementById("signup-email");
const signup_img_url = document.getElementById("signup-imgurl");
const signup_img_show = document.getElementById("signup-img");
const birthday = document.getElementById("signup-birthday");
const birthmonth = document.getElementById("signup-birthmonth");
const birthyear = document.getElementById("signup-birthyear");
var base64String;

// global localStorage - check if user exists(on page load - or after login or after sign up)
const checkCurrentUser = () => {
  let user = window.localStorage.getItem("user");
  if (!user) {
    console.log("nop");

  } else {
    console.log("yup");
    current = JSON.parse(localStorage.getItem("user"));
    console.log(current);
    // REDIRECT TO HOME PAGE /FEED PAGE
  }
};

// show image and save url
function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      signup_img_show.src = e.target.result;
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

// SIGN UP FUNCTIONS
const showSignupModal = () => {
  // make sure login-modal is hidden(add display-none) - hence we can go directly from login-modal to sign-up modal
  login_modal.classList.add("display-none"); //note: it have no effect if class already exists
  signup_modal.classList.remove("display-none");
};
// handle signup form submit
const createNewUser = (e) => {
  e.preventDefault();
  const full_name = signup_full_name.value;
  const phone_nbr = signup_phone_nb.value;
  const username = signup_username.value;
  const password = signup_password.value;
  const email = signup_email.value;
  const birthday = daySelect.options[daySelect.selectedIndex].value;
  const birthmonth = monthSelect.options[monthSelect.selectedIndex].value;
  const birthyear = yearSelect.options[yearSelect.selectedIndex].value;
  const joined_in_date = getTodayDate(); //as:  dd/mm/yy
  const avatar_url = base64String ? base64String : "";

  const add_user = async () => {
    try {
      const url = "http://localhost/twitter-clone/backend/signup.php";
      const response = await fetch(url, {
        method: "POST",
        body: new URLSearchParams({
          full_name,
          email,
          phone_nbr,
          username,
          password,
          date_of_birth: `${birthday}/${birthmonth}/${birthyear}`,
          joined_in_date,
          avatar_url,
        }),
      });
      const data = await response.json();
      const user = {
        full_name: full_name,
        email: email,
        phone_nbr: phone_nbr,
        username: username,
        password: password,
        date_of_birth: `${birthday}/${birthmonth}/${birthyear}`,
        joined_in_date: joined_in_date,
        avatar_url: avatar_url,
      };
      localStorage.setItem("user", JSON.stringify(user));
      checkCurrentUser(); //to redirect to home page if user added
    } catch (err) {
      console.log(err);
    }
  };

  add_user();
};

// add and manage data to signup-dropdowns (days-months-years)
function populateDays(month) {
  //Delete all of the children of the day dropdown
  //if they do exist
  while (daySelect.firstChild) {
    daySelect.removeChild(daySelect.firstChild);
  }
  //Holds the number of days in the month
  let dayNum;
  //Get the current year
  let year = yearSelect.value;

  if (
    month === "January" ||
    month === "March" ||
    month === "May" ||
    month === "July" ||
    month === "August" ||
    month === "October" ||
    month === "December"
  ) {
    dayNum = 31;
  } else if (
    month === "April" ||
    month === "June" ||
    month === "September" ||
    month === "November"
  ) {
    dayNum = 30;
  } else {
    //Check for a leap year
    if (new Date(year, 1, 29).getMonth() === 1) {
      dayNum = 29;
    } else {
      dayNum = 28;
    }
  }
  //Insert the correct days into the day <select>
  for (let i = 1; i <= dayNum; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    daySelect.appendChild(option);
  }
  if (previousDay) {
    daySelect.value = previousDay;
    if (daySelect.value === "") {
      daySelect.value = previousDay - 1;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 2;
    }
    if (daySelect.value === "") {
      daySelect.value = previousDay - 3;
    }
  }
}
function populateYears() {
  //Get the current year as a number
  let year = new Date().getFullYear();
  //Make the previous 100 years be an option
  for (let i = 0; i < 101; i++) {
    const option = document.createElement("option");
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}

// LOGIN FUNCTIONS
const showLoginModal = () => {
  // there is no way to access login from signup page => no need to hide signup-modal hence it is already hidden
  login_modal.classList.remove("display-none");
};
// handle login form submit
const loginUser = (e) => {
  e.preventDefault();
  const username = login_username.value;
  const password = login_password.value;
  const user_login = async () => {
    try {
      const url = `http://localhost/twitter-clone/backend/login.php?username=${username}&password=${password}`;
      const response = await fetch(url);
      const data = await response.json();
      // add user as currentUser
      localStorage.setItem("user", JSON.stringify(data));
      checkCurrentUser(); //to redirect to home page if user added
    } catch (err) {
      console.log(err);
    }
  };
  user_login();
};

// SIGNUP EVENT LISTENERS
signup_show_btn.addEventListener("click", showSignupModal);
signup_show_link.addEventListener("click", showSignupModal);
signup_submit_btn.addEventListener("click", createNewUser);
close_signup.addEventListener("click", () =>
  signup_modal.classList.add("display-none")
);
// LOGIN EVENT LISTENERS
login_show_btn.addEventListener("click", showLoginModal);
login_submit_btn.addEventListener("click", loginUser);
close_login.addEventListener("click", () =>
  login_modal.classList.add("display-none")
);
signup_img_url.addEventListener("change", uploadImage);

// local Storage - check when loading if there is a user
window.addEventListener("load", checkCurrentUser);

// DATE-OF-BIRTH DROPDOWNS:
// check data of dropdowns on change
yearSelect.onchange = function () {
  populateDays(monthSelect.value);
};
monthSelect.onchange = function () {
  populateDays(monthSelect.value);
};
daySelect.onchange = function () {
  previousDay = daySelect.value;
};
// runs for the first time when page-loaded to generate dropdowns
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
for (let i = 0; i < months.length; i++) {
  const option = document.createElement("option");
  option.textContent = months[i];
  monthSelect.appendChild(option);
  monthSelect.value = "January";
}
let previousDay;
populateDays(monthSelect.value);
populateYears();
