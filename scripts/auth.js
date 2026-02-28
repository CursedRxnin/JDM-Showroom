const auth = {
  isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
  },

  getUser() {
    return localStorage.getItem("username");
  },

  login(username) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
  },

  logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "index.html";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const userBlock = document.querySelector("[data-user]");
  if (!userBlock) return;

  if (auth.isLoggedIn()) {
    userBlock.innerHTML = `
      <span class="user-name">👤 ${auth.getUser()}</span>
      <button class="btn ghost small" id="logoutBtn">Wyloguj</button>
    `;

    document
      .getElementById("logoutBtn")
      .addEventListener("click", auth.logout);
  } else {
    userBlock.innerHTML = `
      <a href="login.html" class="btn ghost small">Zaloguj</a>
      <a href="register.html" class="btn primary small">Rejestracja</a>
    `;
  }
});