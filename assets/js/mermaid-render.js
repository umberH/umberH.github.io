// Convert fenced ```mermaid code blocks into rendered diagrams
document.addEventListener('DOMContentLoaded', function () {
  var codeBlocks = document.querySelectorAll('div.language-mermaid pre code');
  if (!codeBlocks.length || !window.mermaid) {
    return;
  }

  codeBlocks.forEach(function (code) {
    var wrapper = code.closest('div.language-mermaid');
    var container = document.createElement('div');
    container.className = 'mermaid';
    container.textContent = code.textContent;
    wrapper.replaceWith(container);
  });

  mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });
  mermaid.run({ querySelector: '.mermaid' });
});
