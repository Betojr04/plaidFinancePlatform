export const initializeRouter = () => {
  function renderRoute() {
    const appDiv = document.getElementById("app");

    const route = window.location.hash.slice(1) || "login";

    appDiv.innerHTML = "";

    if (route === "login") {
      renderLogin(appDiv);
    } else if (route === "dashboard") {
      renderDashboard(appDiv);
    } else if (route === "createaccount") {
      renderCreateAccount(appDiv);
    } else {
      appDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
  }

  window.addEventListener("hashchange", renderRoute);

  renderRoute();
};

/* this is taking a paramater of container, which in the above is inside
of appDiv via the DOM. getting element by Id
*/
function renderLogin(container) {
  container.innerHTML = `
    <h1>Login</h1>
    <form id="login-form">
        <input type="text" id="username"  placeholder="username" required>
        <input type="password" id="password" placeholder="password" required>
        <button type="submit">Login</button>
        <button type="submit">Create Account</button>
    </form>
    `;
}

function renderCreateAccount(container) {
  container.innerHTML = `
        <h1>Create Account</h1>
        <form id="create-account-form">
            <label for="email">Email:</label>
            <input type="text" id="email" placeholder="email" required>
            <span id="emailError" class="error" ></span>

            <label for="username">Username:</label>
            <input type="text" id="username" placeholder="username" required minLength="5" maxLength="20"> 
            <span id="usernameError" class="error" ></span>

            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="password" required minLength="8">
            <span id="passwordError" class="error"></span>

            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <span id="confirmPasswordError" class="error"></span>


            <button type="submit">Create Account</button>
        </form>
    `;
}

// this is handling when the create account button is clicked
const createAccountForm = document.getElementById("create-account-form");
if (createAccountForm) {
  createAccountForm.addEventListener("submit", (e) => {
    e.preventDefault();
    import("./auth.js").then((authModule) => {
      authModule.createAccount(
        document.getElementById("email").value,
        document.getElementById("username").value,
        document.getElementById("password").value
      );
    });
  });
}

// this takes the login info typed in and logs the user in
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    import("./auth.js").then((authModule) => {
      authModule.login(
        document.getElementById("username").value,
        document.getElementById("password").value
      );
    });
  });
}

function renderDashboard(container) {
  container.innerHTML = `
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard</p>
        <button id="logout-btn">Logout</button>
    `;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      import("./auth.js").then((authModule) => {
        authModule.logout();
      });
    });
  }
}
