// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toogle");
  const navMenu = document.getElementById("nav-menu");
  const navClose = document.getElementById("nav-close");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const darkIcon = document.getElementById("dark-icon");
  const lightIcon = document.getElementById("light-icon");

  // Function to toggle the navigation menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
  });

  // Function to close the navigation menu
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });

  // Load the saved theme from local storage
  const currentTheme = localStorage.getItem("theme") || "dark";
  body.classList.add(currentTheme);
  darkIcon.style.display = currentTheme === "dark" ? "inline" : "none";
  lightIcon.style.display = currentTheme === "light" ? "inline" : "none";

  // Function to toggle between light and dark mode
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("bg-gray-800");
    body.classList.toggle("bg-white");
    body.classList.toggle("text-white");
    body.classList.toggle("text-black");

    // Update icon visibility
    darkIcon.style.display = body.classList.contains("bg-gray-800")
      ? "inline"
      : "none";
    lightIcon.style.display = body.classList.contains("bg-white")
      ? "inline"
      : "none";

    // Save the current theme in local storage
    const theme = body.classList.contains("bg-gray-800") ? "dark" : "light";
    localStorage.setItem("theme", theme);
  });
});

//ABOUT PAGE STYLING
let slider = document.querySelector(".slider");
let indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;
let isDragging = false;
let startX, currentX;

function updateIndicators() {
  indicators.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  let screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    slider.style.transform = "translateX(0)";
  } else if (screenWidth >= 768) {
    slider.style.transform = `translateX(-${index * 50}%)`;
  } else {
    slider.style.transform = `translateX(-${index * 100}%)`;
  }
  updateIndicators();
}

function startDrag(event) {
  isDragging = true;
  startX = event.type.includes("touch")
    ? event.touches[0].clientX
    : event.clientX;
}

function onDrag(event) {
  if (!isDragging) return;
  currentX = event.type.includes("touch")
    ? event.touches[0].clientX
    : event.clientX;
}

function endDrag() {
  if (!isDragging) return;
  let difference = startX - currentX;

  if (difference > 50 && currentIndex < indicators.legth - 1) {
    goToSlide(currentIndex + 1);
  } else if (difference < -50 && currentIndex > 0) {
    goToSlide(currentIndex - 1);
  }
  isDragging = false;
}

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("mousemove", onDrag);
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("mouseleave", endDrag);
slider.addEventListener("touchstart", startDrag);
slider.addEventListener("touchmove", onDrag);
slider.addEventListener("touchend", endDrag);

window.addEventListener("resive", () => {
  let screenWidth = window.innerWidth;

  if (screenWidth >= 1024) {
    indicators.forEach((dot) => (dot.style.display = "none"));
  } else if (screenWidth >= 768) {
    indicators.forEach((dot, index) => {
      dot.style.display = index < 2 ? "block" : "none";
    });
  } else {
    indicators.forEach((dot) => (dot.style.display = "block"));
  }

  goToSlide(0);
});

//Enabling Go to Top

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 800) {
    goTopBtn.classList.add("active");
  } else {
    goTopBtn.classList.remove("active");
  }
});
