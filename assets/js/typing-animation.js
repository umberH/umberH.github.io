// Typing Animation for Hero Title and Cycling Roles
document.addEventListener('DOMContentLoaded', function() {
  const typingText = document.querySelector('.typing-text');
  const typingCursor = document.querySelector('.typing-cursor');
  const typingTextRole = document.querySelector('.typing-text-role');
  const typingCursorRole = document.querySelector('.typing-cursor-role');
  
  // Array of roles to cycle through
  const roles = [
    'Data Scientist',
    'Machine Learning Engineer', 
    'Mother'
  ];
  
  let currentRoleIndex = 0;
  let isDeleting = false;
  let roleIndex = 0;
  
  // Function to type the main title
  function typeMainTitle() {
    if (typingText && typingCursor) {
      const text = typingText.getAttribute('data-text');
      let index = 0;
      
      // Clear initial text
      typingText.textContent = '';
      
      function typeText() {
        if (index < text.length) {
          typingText.textContent += text.charAt(index);
          index++;
          setTimeout(typeText, 80);
        } else {
          // Show cursor after typing is complete
          typingCursor.style.opacity = '1';
          // Start the role cycling animation after main title is done
          setTimeout(startRoleAnimation, 1000);
        }
      }
      
      setTimeout(typeText, 500);
    }
  }
  
  // Function to handle role typing animation
  function startRoleAnimation() {
    if (!typingTextRole || !typingCursorRole) return;
    
    const currentRole = roles[currentRoleIndex];
    
    if (!isDeleting) {
      // Typing mode
      if (roleIndex < currentRole.length) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex + 1);
        roleIndex++;
        setTimeout(startRoleAnimation, 100);
      } else {
        // Finished typing, wait then start deleting
        setTimeout(() => {
          isDeleting = true;
          startRoleAnimation();
        }, 2000);
      }
    } else {
      // Deleting mode
      if (roleIndex > 0) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex - 1);
        roleIndex--;
        setTimeout(startRoleAnimation, 50);
      } else {
        // Finished deleting, move to next role
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(startRoleAnimation, 500);
      }
    }
    
    // Show cursor during animation
    typingCursorRole.style.opacity = '1';
  }
  
  // Start the main title animation
  typeMainTitle();
});

// Reset animation when page is refreshed
window.addEventListener('beforeunload', function() {
  const typingText = document.querySelector('.typing-text');
  const typingTextRole = document.querySelector('.typing-text-role');
  if (typingText) {
    typingText.textContent = '';
  }
  if (typingTextRole) {
    typingTextRole.textContent = '';
  }
}); 