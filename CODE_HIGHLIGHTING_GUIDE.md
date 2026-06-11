# Code Syntax Highlighting Guide

## ✅ Setup Complete!

Your site now has beautiful GitHub Dark-themed syntax highlighting with copy buttons.

## How to Use

### 1. Basic Code Blocks

Use triple backticks with a language identifier:

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

### 2. Supported Languages

The most common languages:
- `python` - Python
- `javascript` or `js` - JavaScript
- `typescript` or `ts` - TypeScript
- `bash` or `shell` - Shell/Bash scripts
- `sql` - SQL
- `yaml` or `yml` - YAML
- `json` - JSON
- `html` - HTML
- `css` - CSS
- `ruby` - Ruby
- `java` - Java
- `cpp` or `c++` - C++
- `go` - Go
- `rust` - Rust
- `php` - PHP

### 3. Inline Code

Use single backticks for inline code: \`variable_name\` or \`function()\`

## Features

✨ **Dark Theme**: GitHub-inspired dark background with syntax colors
🎨 **Color Coding**:
- Keywords in red (`#ff7b72`)
- Strings in blue (`#a5d6ff`)
- Functions in purple (`#d2a8ff`)
- Classes in orange (`#f0883e`)
- Comments in gray (`#8b949e`)
- Numbers in blue (`#79c0ff`)

📋 **Copy Button**: Hover over code blocks to see the copy button
📱 **Responsive**: Works great on mobile devices
🔄 **Smooth Scrolling**: Horizontal scroll for long lines

## Examples

### Python Example

\`\`\`python
class DataAnalyzer:
    def __init__(self, data):
        self.data = data

    def analyze(self):
        """Analyze the data and return insights"""
        results = {
            'mean': self.data.mean(),
            'median': self.data.median(),
            'std': self.data.std()
        }
        return results
\`\`\`

### JavaScript Example

\`\`\`javascript
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
\`\`\`

### Bash Example

\`\`\`bash
#!/bin/bash

# Deploy script
echo "Starting deployment..."

git pull origin main
bundle install
bundle exec jekyll build

echo "Deployment complete!"
\`\`\`

## Customization

### Change Theme Colors

Edit `assets/css/syntax-highlight.css`:

- Background: `.highlight { background: #0d1117; }`
- Keywords: `.highlight .k { color: #ff7b72; }`
- Strings: `.highlight .s { color: #a5d6ff; }`
- Functions: `.highlight .nf { color: #d2a8ff; }`

### Alternative Themes

If you want a different theme:

1. **Light Theme**: Change background to `#ffffff` and adjust colors
2. **Monokai**: Use warmer colors (yellows, oranges, greens)
3. **Dracula**: Purple-heavy color scheme
4. **Nord**: Cool blue/gray palette

## Troubleshooting

### Code not highlighting?

1. Make sure you're using triple backticks (\`\`\`)
2. Specify the language: \`\`\`python not just \`\`\`
3. Restart Jekyll server after config changes
4. Clear browser cache

### Copy button not showing?

1. Check that `code-copy.js` is loaded
2. Open browser console for errors
3. Make sure code block has `.highlight` class

### Colors look wrong?

1. Check that `syntax-highlight.css` is loaded
2. Verify no CSS conflicts in browser inspector
3. Make sure Rouge is configured in `_config.yml`

## Files Added

- `_config.yml` - Rouge configuration
- `assets/css/syntax-highlight.css` - Styling
- `assets/js/code-copy.js` - Copy button functionality
- `_layouts/default.html` - Included CSS and JS

## Need Help?

- [Rouge documentation](https://github.com/rouge-ruby/rouge)
- [Jekyll syntax highlighting](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting)
- [Kramdown syntax](https://kramdown.gettalong.org/syntax.html#code-blocks)
