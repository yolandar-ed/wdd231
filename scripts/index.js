
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});


const filterButtons = document.querySelectorAll(".filter-btn");
const courseRows = document.querySelectorAll(".course-row");
const creditTotalEl = document.getElementById("creditTotal");

function creditsFor(rows) {
  let total = 0;
  rows.forEach((row) => {
    const text = row.querySelector(".course-credits").textContent;
    const match = text.match(/\d+/);
    if (match) total += Number(match[0]);
  });
  return total;
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => {
      b.classList.remove("is-active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("is-active");
    btn.setAttribute("aria-pressed", "true");

    const visibleRows = [];
    courseRows.forEach((row) => {
      const matches = filter === "all" || row.dataset.category === filter;
      row.classList.toggle("is-hidden", !matches);
      if (matches) visibleRows.push(row);
    });

    creditTotalEl.textContent = creditsFor(visibleRows);
  });
});


document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;