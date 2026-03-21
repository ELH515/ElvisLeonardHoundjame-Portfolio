// ==============================
// ELEMENTE HOLEN
// ==============================

// Jahr im Footer
const yearElement = document.getElementById("year");

// Burger-Menü Button
const menuButton = document.getElementById("menu-button");

// Navigationsliste
const navLinks = document.getElementById("nav-links");

// Alle Links in der Navigation
const allNavLinks = document.querySelectorAll(".nav-links a");

// Alle Bereiche mit ID, damit aktiver Nav-Link erkannt werden kann
const sections = document.querySelectorAll("section[id], header[id]");

// Alle Elemente mit Scroll-Animation
const revealElements = document.querySelectorAll(".reveal");

// ==============================
// 1) AKTUELLES JAHR IM FOOTER
// ==============================
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ==============================
// 2) MOBILE MENÜ FUNKTIONEN
// ==============================

// Menü schließen
function closeMenu() {
  if (!menuButton || !navLinks) return;

  navLinks.classList.remove("open");
  menuButton.classList.remove("active");
  menuButton.setAttribute("aria-expanded", "false");
}

// Menü öffnen / schließen
function toggleMenu() {
  if (!menuButton || !navLinks) return;

  const isOpen = navLinks.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
}

// Klick auf Burger-Menü
if (menuButton && navLinks) {
  menuButton.addEventListener("click", toggleMenu);

  // Menü schließen, wenn man außerhalb klickt
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {
      closeMenu();
    }
  });

  // Menü mit Escape-Taste schließen
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// Wenn ein Nav-Link angeklickt wird, Menü schließen
allNavLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// ==============================
// 3) AKTIVEN NAV-LINK MARKIEREN
// ==============================
function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.id;
    }
  });

  // Sonderfall: ganz unten auf der Seite = Kontakt aktiv
  const scrollBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

  if (scrollBottom) {
    currentSection = "kontakt";
  }

  // Passenden Link aktiv setzen
  allNavLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

// Direkt beim Laden einmal ausführen
setActiveLink();

// Beim Scrollen und Größenändern neu prüfen
window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink);

// ==============================
// 4) SCROLL-ANIMATIONEN
// ==============================
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          // Element nicht weiter beobachten, wenn es schon sichtbar wurde
          observerRef.unobserve(entry.target);
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
} else {
  // Falls alter Browser: Elemente einfach direkt anzeigen
  revealElements.forEach((element) => {
    element.classList.add("show");
  });
}
