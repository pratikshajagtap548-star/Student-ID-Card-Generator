// Get Student Data
const student = JSON.parse(localStorage.getItem("studentData"));

if (!student) {
  alert("No Student Data Found!");
  window.location.href = "index.html";
}

// College Name
if (student.collegeName) {
  document.getElementById("cardCollegeName").textContent = student.collegeName;
  document.title = student.collegeName + " - Student ID Card";
}

// College Logo (optional - hide if not provided)
const logoImg = document.getElementById("collegeLogo");
if (student.logo) {
  logoImg.src = student.logo;
  logoImg.classList.add("show");
} else {
  logoImg.classList.remove("show");
}

// Student Photo (always provided - required on the form)
const photoImg = document.getElementById("studentPhoto");
if (student.photo) {
  photoImg.src = student.photo;
}

// Show Details (PRN intentionally excluded)
document.getElementById("name").textContent = student.name;
document.getElementById("roll").textContent = student.roll;
document.getElementById("department").textContent = student.department;
document.getElementById("year").textContent = student.year;
document.getElementById("blood").textContent = student.blood;
document.getElementById("mobile").textContent = student.mobile;
document.getElementById("email").textContent = student.email;
document.getElementById("dob").textContent = student.dob;
document.getElementById("address").textContent = student.address;

document.getElementById("barcodeLabel").textContent =
  [student.roll, student.department, student.year].filter(Boolean).join(" \u2022 ");

// ---------- Download PDF ----------
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", function () {
  const card = document.querySelector(".idcard");

  const options = {
    margin: 0,
    filename: (student.name ? student.name.replace(/\s+/g, "_") : "Student") + "_ID_Card.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(options).from(card).save();
});

// ---------- Animations (from the ID card template) ----------
const card = document.getElementById("card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Card entrance animation
window.addEventListener("load", () => {
  card.style.opacity = "1";
  card.style.transform = "scale(1)";
});

if (!reduceMotion) {
  // Mouse tilt effect
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 30;
    const y = (window.innerHeight / 2 - e.clientY) / 30;
    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
  });

  document.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });

  // Photo hover animation
  photoImg.addEventListener("mouseenter", () => {
    photoImg.style.transform = "scale(1.12) rotate(4deg)";
  });

  photoImg.addEventListener("mouseleave", () => {
    photoImg.style.transform = "scale(1) rotate(0deg)";
  });

  // Gentle floating animation
  let move = 0;
  setInterval(() => {
    move += 0.05;
    card.style.marginTop = Math.sin(move) * 6 + "px";
  }, 30);
}