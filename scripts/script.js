document.addEventListener("DOMContentLoaded", () => {

const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    themeToggle.classList.add("is-switching");

    const isLight = root.getAttribute("data-theme") === "light";
    root.setAttribute("data-theme", isLight ? "dark" : "light");
    localStorage.setItem("theme", isLight ? "dark" : "light");
  });
}

function spawnParticles(x, y) {
  const count = 10;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "theme-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 20;

    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    p.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 700);
  }
}

const toggle = document.getElementById("themeToggle");

if (toggle) {
  toggle.addEventListener("click", e => {
    const rect = toggle.getBoundingClientRect();
    spawnParticles(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  });
}

  const menuAuth = document.getElementById("menuAuth");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (menuAuth) {
    if (currentUser) {
      menuAuth.innerHTML = `
        <div class="card" style="padding:14px;text-align:center;">
          <div class="muted" style="margin-bottom:6px;">Zalogowany jako</div>
          <strong style="font-size:1.1rem;">👤 ${currentUser.name}</strong>

          <a href="account.html" class="btn ghost full" style="margin-top:12px;">
            Moje konto
          </a>

          <button id="menuLogout" class="btn ghost full" style="margin-top:8px;">
            Wyloguj się
          </button>
        </div>
      `;

      const logoutBtn = document.getElementById("menuLogout");
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("currentUser");
        window.location.href = "index.html";
      });

    } else {
      menuAuth.innerHTML = `
        <a href="login.html" class="btn ghost full">Zaloguj się</a>
        <a href="register.html" class="btn primary full">Rejestracja</a>
      `;
    }
  }

  async function updateBrandCounts() {
    try {
      const response = await fetch("data/cars.json");
      const data = await response.json();

      const counts = {
        toyota: 0,
        nissan: 0,
        subaru: 0,
        mazda: 0
      };

      data.cars.forEach(car => {
        const brand = car.brand.toLowerCase();
        if (counts[brand] !== undefined) {
          counts[brand]++;
        }
      });

      const brandSelect = document.getElementById("brandSelect");
      if (!brandSelect) return;

      [...brandSelect.options].forEach(opt => {
        const val = opt.value.toLowerCase();
        if (counts[val] !== undefined) {
          opt.textContent = `${opt.textContent.split(" (")[0]} (${counts[val]})`;
        }
      });

    } catch (e) {
      console.error("Bląd pobieranie JSON:", e);
    }
  }

  updateBrandCounts();

const brandSelect = document.getElementById("brandSelect");
const modelSelect = document.getElementById("modelSelect");

if (brandSelect && modelSelect) {
  fetch("data/cars.json")
    .then(res => res.json())
    .then(data => {
      const cars = data.cars;

      const map = {};

      cars.forEach(car => {
        const brand = car.brand.toLowerCase();
        const model = car.model;

        if (!map[brand]) map[brand] = {};
        map[brand][model] = (map[brand][model] || 0) + 1;
      });

      brandSelect.addEventListener("change", () => {
        modelSelect.innerHTML = `<option value="">Wszystkie</option>`;

        const selectedBrand = brandSelect.value.toLowerCase();
        if (!map[selectedBrand]) return;

        Object.entries(map[selectedBrand]).forEach(([model, count]) => {
          const opt = document.createElement("option");
          opt.value = model.toLowerCase();
          opt.textContent = `${model} (${count})`;
          modelSelect.appendChild(opt);
        });
      });
    })
    .catch(err => console.error("Model filter error:", err));
}

  const cards = document.querySelectorAll(".car");

  const isHomePage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else if (isHomePage) {
          entry.target.classList.remove("visible");
        }
      });
    },
    { threshold: 0.25 }
  );

  cards.forEach(card => observer.observe(card));

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      alert("Dziękujemy! Skontaktujemy się z Tobą.");
      form.reset();
    });
  }

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuBtn && mobileMenu && closeMenu) {
    menuBtn.addEventListener("click", () => mobileMenu.classList.add("open"));
    closeMenu.addEventListener("click", () => mobileMenu.classList.remove("open"));

    document.addEventListener("click", e => {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove("open");
      }
    });
  }

  const mainImage = document.getElementById("carMainImage");
  const thumbs = document.querySelectorAll(".car-thumb");

  if (mainImage && thumbs.length) {
    thumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.dataset.image;
        thumbs.forEach(t => t.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });
    });
  }

});

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function initFavorites() {
  const user = getCurrentUser();
  if (!user) return;

  if (!Array.isArray(user.favorites)) {
    user.favorites = [];
    saveCurrentUser(user);
  }

  document.querySelectorAll(".fav-btn").forEach(btn => {
    const carId = btn.dataset.id;

    if (user.favorites.includes(carId)) {
      btn.classList.add("active");
      btn.textContent = "❤️";
    }

    btn.addEventListener("click", e => {
      e.stopPropagation();

      const index = user.favorites.indexOf(carId);

      if (index === -1) {
        user.favorites.push(carId);
        btn.classList.add("active");
        btn.textContent = "❤️";
      } else {
        user.favorites.splice(index, 1);
        btn.classList.remove("active");
        btn.textContent = "🤍";
      }

      saveCurrentUser(user);
      updateFavoriteCounter();
    });
  });
}

function updateFavoriteCounter() {
  const user = getCurrentUser();
  if (!user) return;

  const counter = document.getElementById("favCount");
  if (counter) {
    counter.textContent = user.favorites.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initFavorites();
  updateFavoriteCounter();
});

const searchForm = document.getElementById('searchForm');

if (searchForm) {
  searchForm.addEventListener('submit', e => {
    e.preventDefault();

    const query = searchForm.q.value.trim();
    if (!query) return;

    window.location.href = `cars.html?q=${encodeURIComponent(query)}`;
  });
}

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get('q');

if (searchQuery) {
  const query = searchQuery.toLowerCase();
  const cars = document.querySelectorAll('.car');
  let found = false;

  cars.forEach(car => {
    const text = car.innerText.toLowerCase();

    if (text.includes(query)) {
      car.style.display = '';
      found = true;
    } else {
      car.style.display = 'none';
    }
  });

  if (!found) {
    const container = document.querySelector('.cars, .cars-scroll');
    if (container) {
      const msg = document.createElement('div');
      msg.className = 'no-results';
      msg.innerText = `Brak wyników dla: "${searchQuery}"`;
      container.appendChild(msg);
    }
  }
}

const filterBtn = document.querySelector(".filter-btn");
const resetBtn = document.querySelector(".reset-filter-btn");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {

    const brand = document.querySelector('[data-filter="brand"]')?.value || "";
    const model = document.querySelector('[data-filter="model"]')?.value || "";
    const yearFrom = parseInt(document.querySelector('[data-filter="year-from"]')?.value) || null;
    const yearTo = parseInt(document.querySelector('[data-filter="year-to"]')?.value) || null;
    const mileage = document.querySelector('[data-filter="mileage"]')?.value || "";
    const steering = document.querySelector('[data-filter="steering"]')?.value.toLowerCase() || "";

    document.querySelectorAll(".car").forEach(car => {
      let visible = true;

      const titleEl = car.querySelector(".car-title");
      const specsEl = car.querySelector(".car-specs");

      if (!titleEl || !specsEl) return;

      const title = titleEl.innerText.toLowerCase();
      const specs = specsEl.innerText.toLowerCase();
      const carBrand = car.dataset.brand;

      if (brand && carBrand !== brand) visible = false;

      if (model && !title.includes(model)) visible = false;

      const yearMatch = specs.match(/\b(19|20)\d{2}\b/);
      const year = yearMatch ? parseInt(yearMatch[0]) : null;

      if (yearFrom && (!year || year < yearFrom)) visible = false;
      if (yearTo && (!year || year > yearTo)) visible = false;

      const kmMatch = specs.match(/(\d{1,3}(?:,\d{3})*)\s?km/);
      const km = kmMatch ? parseInt(kmMatch[1].replace(/,/g, "")) : null;

      if (mileage === "low" && km !== null && km > 50000) visible = false;
      if (mileage === "mid" && km !== null && (km < 50000 || km > 100000)) visible = false;
      if (mileage === "high" && km !== null && km < 100000) visible = false;

      if (steering && !specs.includes(steering)) visible = false;

      car.style.display = visible ? "" : "none";
    });
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document.querySelectorAll(".filter-input").forEach(input => {
      input.value = "";
    });

    document.querySelectorAll(".car").forEach(car => {
      car.style.display = "";
    });
  });
}