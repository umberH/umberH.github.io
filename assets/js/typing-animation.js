// Typing Animation for Site Title
document.addEventListener('DOMContentLoaded', function() {
  const typingText = document.querySelector('.typing-text');
  const typingCursor = document.querySelector('.typing-cursor');
  
  if (typingText && typingCursor) {
    const text = typingText.getAttribute('data-text');
    let index = 0;
    
    // Clear initial text
    typingText.textContent = '';
    
    // Function to type the text character by character
    function typeText() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 80); // Adjust speed here (80ms per character)
      } else {
        // Show cursor after typing is complete
        typingCursor.style.opacity = '1';
      }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 300);
  }
});

// Reset animation when page is refreshed
window.addEventListener('beforeunload', function() {
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    typingText.textContent = '';
  }
}); 