document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menuBtn");
  const navList = document.getElementById("navList");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", function () {
      navList.classList.toggle("open");
    });
    navList.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("open");
      });
    });
  }

  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  document.querySelectorAll(".photo-input").forEach(function (input) {
    input.addEventListener("change", function () {
      const file = input.files[0];
      if (!file || !file.type.startsWith("image/")) return;

      const slot = input.closest(".photo-slot");
      const img = slot.querySelector("img");
      const hint = slot.querySelector(".photo-hint");

      const reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
        img.hidden = false;
        hint.hidden = true;
      };
      reader.readAsDataURL(file);
    });
  });

  const sections = document.querySelectorAll(".page-section");
  const navLinks = document.querySelectorAll("#navList a");
  function highlightNav() {
    let current = "home";
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const topic = document.getElementById("topic");
      const message = document.getElementById("message");
      let valid = true;

      function setError(field, text) {
        document.getElementById(field.id + "Error").textContent = text;
        if (text) valid = false;
      }

      setError(name, name.value.trim().length < 2 ? "Please enter your name (at least 2 characters)." : "");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setError(email, !emailPattern.test(email.value.trim()) ? "Please enter a valid email address." : "");

      setError(topic, topic.value === "" ? "Please choose a topic." : "");

      setError(message, message.value.trim().length < 10 ? "Message must be at least 10 characters." : "");

      const success = document.getElementById("successMsg");
      if (valid) {
        success.style.display = "block";
        success.textContent = "Thank you, " + name.value.trim() + "! Your message has been received.";
        form.reset();
      } else {
        success.style.display = "none";
      }
    });
  }
});