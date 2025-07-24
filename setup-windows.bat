@echo off
echo Setting up Jekyll development environment for Windows...
echo.

echo Step 1: Installing Chocolatey (if not already installed)...
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"

echo.
echo Step 2: Installing Ruby via Chocolatey...
choco install ruby -y

echo.
echo Step 3: Installing Jekyll and Bundler...
gem install jekyll bundler

echo.
echo Step 4: Installing dependencies...
bundle install

echo.
echo Setup complete! You can now run: bundle exec jekyll serve
pause 