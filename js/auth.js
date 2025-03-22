//
document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signinForm");
  const signinMessage = document.getElementById("signinMessage");

  // Form submission
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    const storedName = localStorage.getItem("name");
    const storedPassword = localStorage.getItem("password");

    if (name === storedName && password === storedPassword) {
      window.location.href = "indexe.html"; // Redirect to homepage
    } else {
      signinMessage.textContent = "Invalid name or password. Please try again.";
      signinMessage.classList.remove("hidden");
    }
  });
});
