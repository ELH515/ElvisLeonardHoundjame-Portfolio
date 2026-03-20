// ==============================
// 1) AKTUELLES JAHR IM FOOTER
// ==============================
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==============================
// 2) MOBILE MENÜ ÖFFNEN / SCHLIESSEN
// ==============================
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const allNavLinks = document.querySelectorAll(".nav-links a");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuButton.classList.toggle("active");

    const isOpen = navLinks.classList.contains("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
}

allNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks && menuButton) {
      navLinks.classList.remove("open");
      menuButton.classList.remove("active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
});

// ==============================
// 3) AKTIVEN NAV-LINK BEIM SCROLLEN MARKIEREN
// ==============================
const sections = document.querySelectorAll("section[id], header[id]");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // WICHTIG:
  // Wenn man fast ganz unten auf der Seite ist,
  // soll automatisch "kontakt" aktiv werden.
  const scrollBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

  if (scrollBottom) {
    currentSection = "kontakt";
  }

  allNavLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

setActiveLink();
window.addEventListener("scroll", setActiveLink);
window.addEventListener("resize", setActiveLink);

// ==============================
// 4) SCROLL-ANIMATIONEN
// ==============================
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});