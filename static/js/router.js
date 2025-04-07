export const initializeRouter = () => {
  function renderRoute() {
    const appDiv = document.getElementById("app");
    // Normalize route to remove trailing slash
    const route =
      window.location.pathname.slice(1).replace(/\/$/, "") || "login";
    appDiv.innerHTML = "";

    // Check for authenticated routes:
    if (route === "dashboard") {
      import("./auth.js").then((authModule) => {
        if (!authModule.isAuthenticated()) {
          // If not authenticated, redirect to login
          history.pushState({}, "", "/login");
          renderLogin(appDiv);
        } else {
          renderDashboard(appDiv);
        }
      });
    } else if (route === "login" || route === "createaccount") {
      // Non-authenticated routes
      if (route === "login") {
        renderLogin(appDiv);
      } else if (route === "createaccount") {
        renderCreateAccount(appDiv);
      }
    } else {
      appDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
  }

  // Make renderRoute accessible globally:
  window.renderRoute = renderRoute;
  window.addEventListener("popstate", renderRoute);
  renderRoute();
};

/* this is taking a paramater of container, which in the above is inside
of appDiv via the DOM. getting element by Id
*/
function renderLogin(container) {
  container.innerHTML = `
  <div class="login-wrapper">
  <h1>Login</h1>
  <form id="login-form">
    <div class="form-group">
      <label for="username">Username:</label>
      <input type="text" id="username" placeholder="username" required>
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" placeholder="password" required>
    </div>
    <div class="btn-grp">
      <button type="submit">Login</button>
      <button type="button" id="createaccount">Create Account</button>
    </div>
  </form>
</div>

    `;

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

  const goToCreate = document.getElementById("createaccount");
  if (goToCreate) {
    goToCreate.addEventListener("click", () => {
      history.pushState({}, "", "/createaccount");
      window.renderRoute();
    });
  }
}

// rendering the create account page and content
function renderCreateAccount(container) {
  container.innerHTML = `
    <div class="create-account-wrapper">
      <h1>Create Account</h1>
      <form id="create-account-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" placeholder="email" required>
          <span id="emailError" class="error"></span>
        </div>
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" placeholder="username" required minlength="5" maxlength="20">
          <span id="usernameError" class="error"></span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" placeholder="password" required minlength="8">
          <span id="passwordError" class="error"></span>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="confirm password">
          <span id="confirmPasswordError" class="error"></span>
        </div>
        <div class="btn-grp">
          <button type="submit">Create Account</button>
          <button type="button" id="backToLogin">Back To Login</button>
        </div>
      </form>
    </div>
  `;

  // Handle create account form submission
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

  // Attach navigation listener to go back to login
  const backToLogin = document.getElementById("backToLogin");
  if (backToLogin) {
    backToLogin.addEventListener("click", () => {
      history.pushState({}, "", "/login");
      window.renderRoute();
    });
  }
}

function renderDashboard(container) {
  container.innerHTML = `
    <div class="nav-container"></div>
    <div class="dashboard-content">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <button id="logout-btn">Logout</button>
    </div>
  `;

  // Render the navbar into the .nav-container.
  import("./navbar.js").then((navbarModule) => {
    // Assuming navbarModule exports a function named renderNavbar
    navbarModule.renderNavbar(document.querySelector(".nav-container"));
  });

  // Attach logout functionality if needed.
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      import("./auth.js").then((authModule) => {
        authModule.logout();
      });
    });
  }
}
