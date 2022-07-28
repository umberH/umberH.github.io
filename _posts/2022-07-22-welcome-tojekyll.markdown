---
layout: post
title:  "Install Jekyll Locally for Window 10"
date:   2022-07-22 09:48:37 +1000
categories: [Tech, Jekyll]
---

I just wanted to start my wesbite on github pages. I tried to find the quick and easy to manage solution. 

**[Jekyll](https://jekyllrb.com/)** is a quick start  choice to build github pages. 

I have divided the installation of jekll into two seperate posts. 
1. [Install Jekyll for Local Machine (Window 10)](./install-jekyll-local-window10.html) Current one you are reading
2. [Install Jekyll for github-pages](./install-jekyll-github-pages.html)

In this post I will provide the details of my journey to install and run jekyll on window 10. 
I will try to summarize the processes and to support the one point solution to all the problems. 



## Step 1: Install Ruby 
I installed Ruby+Devkit 3.1.2-1 (x64) which you can [Download Ruby 3.1.2-1 (x64)](https://rubyinstaller.org/downloads/). Then after you will see the window. 
![Ruby_installer](../../../../../assets/images/jekyll/ruby_installer.png)

{% highlight Terminal %} 
Install MSYS2 and MINGW development toolchain succeeded
  
 1 - MSYS2 base installation
 2 - MSYS2 system update (optional)
 3 - MSYS2 and MINGW development toolchain

Which components shall be installed? If unsure press ENTER [] 
{% endhighlight %}

Select the option 3.

Now you can check the installed version of ruby by entering command in the termninal. 
{% highlight Termninal%}
$ ruby -v
{% endhighlight %}

My version is ruby 3.1.2p20 (2022-04-12 revision 4491bb740a) [x64-mingw-ucrt]

also verify your gem version 

{% highlight Termninal%}
$ gem -v
{% endhighlight %}

My gem version is 3.3.18
## Step 2: Install Jekyll
Jekyll comes in the form of a [ruby Gem](https://guides.rubygems.org/what-is-a-gem/), an easy-to-install software package. 

{% highlight Termninal %}
$ gem install jekyll bundler 
{%endhighlight%}

{% highlight Termninal %}
$ jekyll -v
{%endhighlight%} 

My version is jekyll 4.2.2. 

# Problem 1: SSL certificate error 
This was the first problem I encountered when I tried to install the jekyll. At this point the versions matter alot for the solution. So if you have encountered this problem. Please make sure that you have the exact versions installed. 
because the solution can be varying for different versions.
 When you will try to search the solution for this problem for me was the first answer in this [stackoverflow question](https://stackoverflow.com/questions/65437894/ruby-on-rails-problem-of-verifiying-the-ssl-certificate-while-installing-bundl). 
 open you gem file 
 This is probably not the safe option but I tried couple of solutions 
 1. [Add manual Certificate](https://gist.github.com/fnichol/867550#the-manual-way-boring)
 2. [Add Certificate](https://stackoverflow.com/questions/26261848/cant-install-jekyll-on-windows-certificate-verify-failed)
 
but only changing the source worked for me. 
# Solution
{%highlight Terminal %}
$ gem sources -r https://rubygems.org/
$ gem sources -a http://rubygems.org/
{%endhighlight%}
 
 




## Step 3: Ceate your first static website 
Now its time to head to the directory where you want to create your first website.

{%highlight Terminal%}
$ jekyll new musings_of_a_tenderfoot
$ cd musings_of_a_tenderfoot
{%endhighlight%}

musings_of_a_tenderfoot is the name of the site. This command creates the structure of the website file.

{%highlight Terminal%}
├── 404.html
├── about.markdown
├── _config.yml
├── Gemfile
├── Gemfile.lock
├── index.markdown
├── _posts
│   └── 2020-09-14-welcome-to-jekyll.markdown
└── _site
{%endhighlight%}

Now run the command in the terminal to build the website and execute locally. 

{%highlight Terminal%}
 $ bundle exec jekyll serve
{%endhighlight%}
# Problem 1: Webricks 
 {%highlight Terminal%}
 `require': cannot load such file -- webrick (LoadError)
 {%endhighlight%}
# Solution:
{%highlight Terminal%}
$ bundle add webrick
{%endhighlight%}

if you will again see the SSL error. Please open the Gemfile in the same folder. In the first line you will see the source 
{% highlight Terminal%}
$ source "https://rubygems.org"
{% endhighlight %}

change it to 

{% highlight Terminal%}
$ source "http://rubygems.org"
{% endhighlight %}

then add webrick.

# Helpful Links:
This [post](http://jekyll-windows.juthilo.com/2-jekyll-gem/) is a good starting point to begin the journey. 
This [blog](https://www.section.io/engineering-education/build-a-jekyll-site/) provide a one point to start creating the website posts and to customize the site.

