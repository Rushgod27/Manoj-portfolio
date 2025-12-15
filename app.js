document.addEventListener("DOMContentLoaded", () => {

  /* SMOOTH SCROLL */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior:"smooth", block:"start" });
    });
  });

  /* ACTIVE NAV */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let y = window.scrollY;

    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (y >= top && y < top + height) {
        navLinks.forEach(a => a.classList.remove("active"));
        const active = document.querySelector(`nav a[href="#${sec.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  });

  /* HEADER SHRINK */
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("shrink", window.scrollY > 80);
  });

  /* SECTION FADE-IN */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll("section").forEach(sec => observer.observe(sec));

  /* DARK MODE */
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    if (localStorage.getItem("theme") === "dark")
      document.body.classList.add("dark");

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme",
        document.body.classList.contains("dark") ? "dark" : "light");
    });
  }
});