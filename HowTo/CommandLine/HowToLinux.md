# 🚀 Oh Shit, Linux! A Command Line Guide for Jumpers

Welcome to the "Oh Shit, Linux!" guide. This guide is designed for Jumpers who have never touched Linux before but want to get started with the basics. Linux can seem intimidating, but with this guide, you'll be navigating the command line like a pro in no time!

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Commands](#basic-commands)
3. [File Management](#file-management)
4. [Navigating Directories](#navigating-directories)
5. [Editing Files](#editing-files)
6. [Permissions and Ownership](#permissions-and-ownership)
7. [Networking Basics](#networking-basics)
8. [Useful Tips and Tricks](#useful-tips-and-tricks)
9. [Additional Resources](#additional-resources)

---

## Getting Started

### What is Linux?

Linux is an open-source operating system that's popular for its security, flexibility, and powerful command-line interface. Unlike other operating systems, Linux gives you full control over your system, which can be really useful for customizing your environment or working on projects like community websites or music servers.

### How to Access Linux

- **Install Linux on Your Computer:** You can install a Linux distribution like Ubuntu, Fedora, or Debian on your computer. This guide will use Ubuntu for examples, but most commands will work on any Linux distro.
- **Use a Virtual Machine:** If you're not ready to install Linux on your computer, you can use software like VirtualBox to run Linux in a virtual environment.
- **Try the Windows Subsystem for Linux (WSL):** If you're using Windows 10 or later, you can enable WSL to run a Linux distribution alongside your Windows system.

---

## Basic Commands

### 1. Opening the Terminal

The terminal is where you'll type all your commands. Here’s how to open it:

- **Ubuntu:** Press `Ctrl + Alt + T`
- **Fedora:** Search for "Terminal" in the activities overview.
- **WSL on Windows:** Open the start menu, type "WSL" or "Ubuntu", and press Enter.

### 2. Basic Command Syntax

Every Linux command has a structure: 

```
command -option argument
```

- **`command`**: The program or function you want to run.
- **`-option`**: Optional flags that modify the behavior of the command (usually start with a `-`).
- **`argument`**: The target of the command, like a file or directory.

### 3. Common Commands

- **`pwd`**: Prints the current working directory.
  ```sh
  pwd
  ```
- **`ls`**: Lists files and directories in the current directory.
  ```sh
  ls
  ```
- **`cd`**: Changes the current directory.
  ```sh
  cd /path/to/directory
  ```

---

## File Management

### 1. Creating Files

- **`touch`**: Creates an empty file.
  ```sh
  touch filename.txt
  ```

### 2. Viewing Files

- **`cat`**: Displays the contents of a file.
  ```sh
  cat filename.txt
  ```
- **`less`**: Opens a file for reading, one screen at a time.
  ```sh
  less filename.txt
  ```

### 3. Deleting Files

- **`rm`**: Removes a file.
  ```sh
  rm filename.txt
  ```

⚠️ **Warning:** `rm` permanently deletes files. There’s no "Recycle Bin"!

---

## Navigating Directories

### 1. Moving Around

- **`cd`**: Changes the directory.
  ```sh
  cd /path/to/directory
  ```
- **`cd ..`**: Moves up one directory.
  ```sh
  cd ..
  ```

### 2. Useful Directory Commands

- **`mkdir`**: Creates a new directory.
  ```sh
  mkdir new_directory
  ```
- **`rmdir`**: Removes an empty directory.
  ```sh
  rmdir empty_directory
  ```

### 3. Getting Lost? 

- **`pwd`**: Reminds you where you are!
  ```sh
  pwd
  ```

---

## Editing Files

### 1. Simple Editors

- **`nano`**: A beginner-friendly text editor.
  ```sh
  nano filename.txt
  ```
  - **Save and Exit:** Press `Ctrl + O` to save, then `Ctrl + X` to exit.

### 2. Advanced Editors

- **`vim`**: A powerful text editor with a steep learning curve.
  ```sh
  vim filename.txt
  ```
  - **Exit Vim:** Press `Esc`, type `:q!` to quit without saving, or `:wq` to save and quit.

---

## Permissions and Ownership

### 1. Understanding Permissions

- **`ls -l`**: Lists files with detailed information, including permissions.
  ```sh
  ls -l
  ```
  - **Example Output:** `-rw-r--r-- 1 user group size date file`

### 2. Changing Permissions

- **`chmod`**: Changes file permissions.
  ```sh
  chmod 755 filename.txt
  ```
  - **Example:** `755` means the owner can read/write/execute, and others can read/execute.

### 3. Changing Ownership

- **`chown`**: Changes file ownership.
  ```sh
  sudo chown newuser:newgroup filename.txt
  ```

---

## Networking Basics

### 1. Checking Connectivity

- **`ping`**: Checks if a server is reachable.
  ```sh
  ping google.com
  ```

### 2. Displaying IP Configuration

- **`ifconfig`**: Displays network configuration (older method).
  ```sh
  ifconfig
  ```
- **`ip a`**: Displays network configuration (newer method).
  ```sh
  ip a
  ```

### 3. Downloading Files

- **`wget`**: Downloads files from the web.
  ```sh
  wget https://example.com/file.zip
  ```

---

## Useful Tips and Tricks

- **`man`**: Shows the manual for a command. Super helpful when you're stuck!
  ```sh
  man ls
  ```
- **`history`**: Lists all commands you’ve run. Great for finding that one command you forgot.
  ```sh
  history
  ```
- **`alias`**: Creates shortcuts for commands. Save time with your favorite commands!
  ```sh
  alias ll='ls -lah'
  ```

---

## Additional Resources

- **Linux Journey:** A great interactive guide for learning Linux commands. [linuxjourney.com](https://linuxjourney.com/)
- **Ubuntu Community Help Wiki:** Official documentation and community guides. [help.ubuntu.com](https://help.ubuntu.com/)
- **Reddit:** Join communities like r/linux4noobs for tips and help. [reddit.com/r/linux4noobs](https://www.reddit.com/r/linux4noobs/)

---

That’s it! Remember, the Linux command line is powerful, but it’s also very forgiving as long as you don’t use commands like `rm` recklessly. Keep exploring, have fun, and happy jumping!
