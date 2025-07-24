Write-Host "Setting up Jekyll development environment..." -ForegroundColor Green

# Check if Chocolatey is installed
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install Ruby
Write-Host "Installing Ruby..." -ForegroundColor Yellow
choco install ruby -y

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Install Jekyll and Bundler
Write-Host "Installing Jekyll and Bundler..." -ForegroundColor Yellow
gem install jekyll bundler

# Install dependencies
Write-Host "Installing project dependencies..." -ForegroundColor Yellow
bundle install

Write-Host "Setup complete! You can now run: bundle exec jekyll serve" -ForegroundColor Green
Read-Host "Press Enter to continue" 