const login_modal = document.getElementById("login-modal");
const login_submit_btn = document.getElementById("login-submit");
const login_show_btn = document.getElementById("login-show");
const close_login = document.getElementById("close-login");

const signup_modal = document.getElementById("signup-modal");
const signup_submit_btn = document.getElementById("signup-submit");
const signup_show_btn = document.getElementById("signup-show");
const signup_show_link = document.getElementById("signup-link");
const close_signup = document.getElementById("close-signup");
const daySelect = document.getElementById("signup-birthday");
const monthSelect = document.getElementById("signup-birthmonth");
const yearSelect = document.getElementById("signup-birthyear");

// SIGN UP FUNCTIONS
const showSignupModal = () => {
  // make sure login-modal is hidden(add display-none) - hence we can go directly from login-modal to sign-up modal
  login_modal.classList.add("display-none"); //note: it have no effect if class already exists
  signup_modal.classList.remove("display-none");
};
// handle signup form submit
const createNewUser = (e) => {
  e.preventDefault();
};

// add and manage data to signup-dropdowns (days-months-years)
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
// runs for the first time when page-loaded
populateDays(monthSelect.value);
populateYears();
