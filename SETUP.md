# 🚀 Setup Guide for Windows

This guide will help you set up your Jekyll development environment on Windows.

## Option 1: Quick Setup (Recommended)

### Step 1: Run the Setup Script
1. Right-click on `setup.ps1` in your project folder
2. Select "Run with PowerShell"
3. If prompted, type "Y" to allow script execution

### Step 2: Start the Development Server
After the setup completes, run:
```powershell
bundle exec jekyll serve
```

### Step 3: View Your Website
Open your browser and go to: `http://localhost:4000`

## Option 2: Manual Setup

### Step 1: Install Chocolatey
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Step 2: Install Ruby
```powershell
choco install ruby -y
```

### Step 3: Install Jekyll and Bundler
```powershell
gem install jekyll bundler
```

### Step 4: Install Project Dependencies
```powershell
bundle install
```

### Step 5: Start the Server
```powershell
bundle exec jekyll serve
```

## Option 3: Using WSL (Windows Subsystem for Linux)

If you prefer a Linux environment:

### Step 1: Open WSL
```powershell
wsl
```

### Step 2: Install Ruby and Dependencies
```bash
sudo apt update
sudo apt install -y ruby-full build-essential
```

### Step 3: Install Jekyll
```bash
gem install jekyll bundler
```

### Step 4: Navigate to Your Project
```bash
cd /mnt/c/Users/dumb_/Documents/GitHub/umberH.github.io
```

### Step 5: Install Dependencies and Start Server
```bash
bundle install
bundle exec jekyll serve --host 0.0.0.0
```

## Troubleshooting

### Common Issues:

1. **"bundle is not recognized"**
   - Make sure Ruby is installed: `ruby --version`
   - Install bundler: `gem install bundler`

2. **Permission Errors**
   - Run PowerShell as Administrator
   - Or use WSL for a Linux environment

3. **Port Already in Use**
   - Use a different port: `bundle exec jekyll serve --port 4001`

4. **SSL Certificate Errors**
   - Add `--incremental` flag: `bundle exec jekyll serve --incremental`

### Useful Commands:

- **Build site**: `bundle exec jekyll build`
- **Serve with drafts**: `bundle exec jekyll serve --drafts`
- **Serve with incremental build**: `bundle exec jekyll serve --incremental`
- **Check Jekyll version**: `jekyll --version`

## Next Steps

After successful setup:

1. **Customize Content**: Edit files in `_data/` folder
2. **Add Images**: Place images in `assets/images/`
3. **Update Projects**: Modify `_data/projects.yml`
4. **Deploy**: Push to GitHub for automatic deployment

## Support

If you encounter issues:
1. Check the [Jekyll documentation](https://jekyllrb.com/docs/)
2. Ensure all dependencies are installed
3. Try using WSL for a more stable environment

---

**Happy coding! 🎉** 