const sidebar = document.querySelector(".sidebar");
const toggleButton = document.getElementById("toggle-button");

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});