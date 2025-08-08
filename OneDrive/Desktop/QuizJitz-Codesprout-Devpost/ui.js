// ui.js
const categories = [
  "Mathematics",
  "Science",
  "Technology",
  "Philosophy",
  "Arts",
  "Engineering",
  "Psychology",
  "Geography"
];

const categorySection = document.getElementById("category-selector");

categories.forEach(cat => {
  const button = document.createElement("button");
  button.className = "category-btn";
  button.textContent = cat;
  button.onclick = () => {
    localStorage.setItem("selectedCategory", cat.toLowerCase());
    window.location.href = "quiz.html";
  };
  categorySection.appendChild(button);
});
