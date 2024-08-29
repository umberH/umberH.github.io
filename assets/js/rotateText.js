document.addEventListener("DOMContentLoaded", function () {
  const rotatingWords = ["Data Scientist", "AI Researcher", "Student"];
  let index = 0; // Initialize starting index

  function rotateText() {
    const rotatingTextElement = document.getElementById("rotating-words");
    rotatingTextElement.style.opacity = 0; // Start fade-out effect

    setTimeout(() => {
      rotatingTextElement.textContent = rotatingWords[index]; // Update text content
      rotatingTextElement.style.opacity = 1; // Start fade-in effect

      index = (index + 1) % rotatingWords.length; // Update index, loop back to start
    }, 500); // Delay to match the fade-out effect duration
  }

  // Call rotateText function every 2 seconds
  setInterval(rotateText, 2000);
});
