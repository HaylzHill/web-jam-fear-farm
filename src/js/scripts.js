const navButton = document.getElementById("nav-button");
const navLinks = document.getElementById("nav-links");

navButton.addEventListener("click", (e) => {
  navButton.classList.toggle("nav-button-close");
  navLinks.classList.toggle("nav-links-active");
});
