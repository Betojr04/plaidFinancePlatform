export const login = (username, password) => {
  localStorage.setItem("authToken", "demo-token");

  window.location.hash = "dashboard";
};

export const logout = () => {
  localStorage.removeItem("authToken");

  window.location.pathname = "login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const validateUserPassword = () => {
  const passwordInput = document.getElementById("password");
  if (passwordInput.value.trim() === "") {
    document.getElementById("passwordError").textContent =
      "Password is required.";
    // isValid = false;
  } else if (passwordInput.value.length < 8) {
    document.getElementById("passwordError").textContext =
      "Password must be at least 8 Characters";
    // isValid = false;
  }
};

/**
 * Validates password confirmation input field including error handling.
 *
 * @param {}
 * @param {}
 * @returns {} Creating account for user successfully.
 */
export const confirmPasswordInput = () => {
  const passwordInput = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (confirmPassword.value.trim === "") {
    document.getElementById("confirmPasswordError").textContent =
      "Confirm Password is required.";
  } else if (passwordInput.value != confirmPassword.value) {
    document.getElementById("confirmedPasswordError").textContent =
      "Passwords do not match";
  }
};

export const createAccount = (email, username, password) => {
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!emailInput) {
    document.getElementById("emailError").textContent =
      "You must enter an email address";
  }
};
