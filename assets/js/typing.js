// assets/js/typing.js

document.addEventListener("DOMContentLoaded", function () {
  const typedTextElement = document.getElementById("typed-text");
  const cursorElement = document.querySelector(".cursor");

  const textArray = ["Data Scientist", "AI Researcher","Learner"]; // Texts to type
  const typingDelay = 100; // Delay between typing each character
  const erasingDelay = 50; // Delay between erasing each character
  const newTextDelay = 2000; // Delay between switching to a new text
  let textArrayIndex = 0; // Index to keep track of the current text
  let charIndex = 0; // Index to keep track of the current character

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      // Add next character
      typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      // Pause at the end of a word before erasing
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      // Remove character
      typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      // Move to the next word
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay + 1100);
    }
  }

  // Start the typing effect on page load
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
