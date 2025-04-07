// navbar.js
export function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
    <h2>Plaid Platform</h2>
      <ul>
        <li><a href="/dashboard" data-link>Dashboard</a></li>
        <li><a href="/profile" data-link>Profile</a></li>
        <li><a href="/settings" data-link>Settings</a></li>
        <li><button id="nav-logout-btn" class="btn">Logout</button></li>
      </ul>
    </nav>
  `;

  // Optionally, attach a logout event here if you want to handle logout from the navbar.
  const navLogoutBtn = document.getElementById("nav-logout-btn");
  if (navLogoutBtn) {
    navLogoutBtn.addEventListener("click", () => {
      import("./auth.js").then((authModule) => {
        authModule.logout();
      });
    });
  }
}
