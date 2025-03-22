//
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("passwordStrength");
  const signupMessage = document.getElementById("signupMessage");

  // Password strength check
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);
    passwordStrength.className = "strength";

    if (strength < 18) {
      passwordStrength.classList.add("red");
    } else if (strength < 24) {
      passwordStrength.classList.add("yellow");
    } else {
      passwordStrength.classList.add("green");
    }
  });

  // Form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    const existingName = localStorage.getItem("name");
    if (existingName === name) {
      signupMessage.textContent = "Name taken. Please choose a different name.";
      signupMessage.classList.remove("hidden");
      return;
    }

    if (checkPasswordStrength(password) >= 10) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      signupMessage.textContent =
        "Account created successfully! Redirecting to sign in...";
      signupMessage.classList.remove("hidden");
      setTimeout(() => {
        window.location.href = "signin.html";
      }, 2000);
    } else {
      alert("Password must be at least 10 characters long.");
    }
  });

  function checkPasswordStrength(password) {
    return password.length;
  }
});
