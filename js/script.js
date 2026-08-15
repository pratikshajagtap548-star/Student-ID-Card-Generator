// Select Form
const form = document.getElementById("studentForm");

// Store Student Photo
let photoData = "";

// Store College Logo
let logoData = "";

// Inputs
const photoInput = document.getElementById("photo");
const logoInput = document.getElementById("collegeLogo");

// Student Photo Upload
photoInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoData = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// College Logo Upload
logoInput.addEventListener("change", function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      logoData = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Form Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!photoData) {
    alert("Please upload a student photo before generating the ID card.");
    photoInput.focus();
    return;
  }

  const student = {
    collegeName: document.getElementById("collegeName").value,
    logo: logoData,
    photo: photoData,

    name: document.getElementById("name").value,
    roll: document.getElementById("roll").value,
    department: document.getElementById("department").value,
    year: document.getElementById("year").value,
    blood: document.getElementById("blood").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    dob: document.getElementById("dob").value,
    address: document.getElementById("address").value
  };

  localStorage.setItem("studentData", JSON.stringify(student));

  window.location.href = "card.html";
});