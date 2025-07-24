# Blog Images Folder Structure

This folder contains all images used in blog posts. Here's how to organize your blog images:

## 📁 Folder Structure

```
assets/images/blog/
├── featured/          # Featured post images (1200x630px recommended)
├── thumbnails/        # Post thumbnail images (400x250px recommended)
└── README.md         # This file
```

## 🖼️ Image Guidelines

### Featured Images (`featured/`)
- **Size**: 1200x630px (16:9 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **Use**: Main blog post header images
- **Naming**: `post-slug-featured.jpg`

### Thumbnail Images (`thumbnails/`)
- **Size**: 400x250px (16:10 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **Use**: Blog listing page thumbnails
- **Naming**: `post-slug-thumb.jpg`

## 📝 How to Use in Blog Posts

### In Front Matter
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15
image: /assets/images/blog/featured/your-post-featured.jpg
thumbnail: /assets/images/blog/thumbnails/your-post-thumb.jpg
---
```

### In Content
```markdown
![Alt text](/assets/images/blog/featured/your-post-featured.jpg)
```

## 🎨 Image Optimization Tips

1. **Compress images** before uploading (use tools like TinyPNG)
2. **Use descriptive filenames** (e.g., `machine-learning-algorithm.jpg`)
3. **Keep file sizes under 500KB** for better loading speed
4. **Use WebP format** when possible for better compression
5. **Include alt text** for accessibility

## 📱 Responsive Images

The blog automatically handles responsive images. Just use the standard markdown image syntax:

```markdown
![Description of image](/assets/images/blog/featured/image-name.jpg)
```

## 🔗 Example Usage

For a post about "Machine Learning Basics":
- Featured image: `/assets/images/blog/featured/machine-learning-basics-featured.jpg`
- Thumbnail: `/assets/images/blog/thumbnails/machine-learning-basics-thumb.jpg` 