export const login = (username, password) => {
  localStorage.setItem("authToken", "demo-token");

  window.location.hash = "dashboard";
};

export const logout = () => {
  localStorage.removeItem("authToken");

  window.location.hash = "login";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};

export const createAccount = (email, username, password) => {};
