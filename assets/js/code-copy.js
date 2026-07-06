// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('div.highlight');

  codeBlocks.forEach(function(codeBlock) {
    // Skip if button already exists
    if (codeBlock.querySelector('.copy-button')) {
      return;
    }

    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');

    // Add click event
    copyButton.addEventListener('click', function() {
      // Get the code text
      const code = codeBlock.querySelector('code');
      const text = code ? code.textContent : codeBlock.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(text).then(function() {
        // Show success feedback
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = 'Failed';
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });

    // Add button to code block
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
  });
});
