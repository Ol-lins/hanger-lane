(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message"),
      };
      var valid = true;

      function setError(id, message) {
        var node = document.getElementById(id + "-error");
        if (node) node.textContent = message || "";
      }

      Object.keys(fields).forEach(function (key) {
        setError(key, "");
      });

      if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
        setError("name", "Please enter your full name.");
        valid = false;
      }

      var emailValue = fields.email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        setError("email", "Please enter a valid email address.");
        valid = false;
      }

      if (!fields.subject.value) {
        setError("subject", "Please choose a subject.");
        valid = false;
      }

      if (fields.message.value.trim().length < 12) {
        setError("message", "Please write a short message (at least 12 characters).");
        valid = false;
      }

      var status = document.getElementById("form-status");
      if (!valid) {
        status.className = "form-status bad";
        status.textContent = "Please correct the highlighted fields and try again.";
        return;
      }

      status.className = "form-status ok";
      status.textContent = "Thank you. We have your request and will reply soon.";
      form.reset();
    });
  }

  var filterButtons = document.querySelectorAll(".filter-btn");
  var galleryCards = document.querySelectorAll(".gallery-card");
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");
      var group = button.getAttribute("data-filter");
      galleryCards.forEach(function (card) {
        var show = group === "all" || card.getAttribute("data-group") === group;
        card.style.display = show ? "" : "none";
      });
    });
  });

  var lightbox = document.getElementById("lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxClose = document.querySelector(".lightbox-close");

  galleryCards.forEach(function (card) {
    card.addEventListener("click", function () {
      var image = card.querySelector("img");
      if (!lightbox || !lightboxImage || !image) return;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
    });
  });

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("open");
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
})();
