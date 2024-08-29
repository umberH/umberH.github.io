// toc  resume 

document.addEventListener("DOMContentLoaded", function () {
  // Generate Table of Contents from Markdown Headings (##)
  const tocList = document.getElementById("toc-list");
  const headings = document.querySelectorAll(".resume-content h2");
  
  headings.forEach((heading, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#section-${index}" class="toc-link">${heading.textContent}</a>`;
    heading.setAttribute("id", `section-${index}`);
    tocList.appendChild(li);
  });

  // Highlight the current section in the Table of Contents
  const tocLinks = document.querySelectorAll(".toc-link");

  window.addEventListener("scroll", () => {
    let current = "";

    headings.forEach(heading => {
      const headingTop = heading.offsetTop - 100;
      if (scrollY >= headingTop) {
        current = heading.getAttribute("id");
      }
    });

    tocLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
});

