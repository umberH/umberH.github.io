// Typing Animation for Roles Only
// Only animates the roles, not the main title

document.addEventListener('DOMContentLoaded', function() {
  const typingTextRole = document.querySelector('.typing-text-role');
  const typingCursorRole = document.querySelector('.typing-cursor-role');

  // Add or edit your roles here!
  const roles = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Researcher',
    'Generative AI Engineer'
  ];

  let currentRoleIndex = 0;
  let isDeleting = false;
  let roleIndex = 0;

  function typeRole() {
    if (!typingTextRole || !typingCursorRole) return;

    const currentRole = roles[currentRoleIndex];

    if (!isDeleting) {
      // Typing
      if (roleIndex < currentRole.length) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex + 1);
        roleIndex++;
        setTimeout(typeRole, 100);
      } else {
        // Pause, then start deleting
        setTimeout(() => {
          isDeleting = true;
          typeRole();
        }, 2000);
      }
    } else {
      // Deleting
      if (roleIndex > 0) {
        typingTextRole.textContent = currentRole.substring(0, roleIndex - 1);
        roleIndex--;
        setTimeout(typeRole, 50);
      } else {
        // Next role
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        setTimeout(typeRole, 500);
      }
    }

    typingCursorRole.style.opacity = '1';
  }

  // Start animation
  typeRole();
});

// Optional: Reset on page refresh
window.addEventListener('beforeunload', function() {
  const typingTextRole = document.querySelector('.typing-text-role');
  if (typingTextRole) typingTextRole.textContent = '';
}); 