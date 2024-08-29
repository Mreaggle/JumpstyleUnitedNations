# Oh Shit, GitHub Through Linux!?

## 🐧[Linux App](https://github.com/cli/cli#installation)

New to Linux? Learn [HowToLinux](HowToLinux.md)

Hey Jumpers! You’ve chosen to contribute to GitHub using Linux—nice! You’re rocking a platform that’s just as versatile as your jumpstyle moves. Whether you’re tweaking tutorials or uploading new choreography files, let’s show the world what Jumpstyle is all about. Follow these steps, and you’ll be committing like a pro in no time!

## Oh Shit, What Do I Need?

Before you get started, make sure you’ve got the basics covered:

1. **A Linux Machine**: It doesn’t matter if it’s Ubuntu, Fedora, Arch, or some niche distro that only 12 people in the world use—as long as it’s Linux, we’re good.
2. **Git**: The magical tool that lets you talk to GitHub from your terminal. If it’s not already installed, open your terminal and run:
   ```
   sudo apt-get install git  # For Debian/Ubuntu-based distros
   sudo dnf install git      # For Fedora-based distros
   sudo pacman -S git        # For Arch-based distros
   ```
3. **A GitHub Account**: If you don’t have one yet, what are you waiting for? Head over to [GitHub](https://github.com) and sign up. It’s your pass to the biggest developer dance floor on the internet!

## Oh Shit, Let’s Get Started!

Let’s jump right into it and get you up and running on GitHub using Linux!

### Step 1: Set Up Git

First things first, you need to tell Git who you are. It’s like introducing yourself at a dance battle—make sure everyone knows your name!

- Open your terminal and type:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "you@example.com"
  ```
- Replace `"Your Name"` with your real name and `"you@example.com"` with your GitHub email. This info will show up on all your commits, so don’t use your old Myspace alias.

### Step 2: Create an SSH Key

Oh shit, you’re going to need an SSH key to securely connect with GitHub without entering your password every time. It’s like getting VIP access!

- In your terminal, generate a new SSH key with:
  ```bash
  ssh-keygen -t ed25519 -C "you@example.com"
  ```
- Press **Enter** to save the key in the default location and create a passphrase when prompted. Make it strong but memorable!

- Now, add your SSH key to the SSH agent:
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```
  
- Next, you need to copy your SSH key to GitHub. Run:
  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```
  Copy the output and head over to [GitHub’s SSH settings](https://github.com/settings/keys) to add your new key.

### Step 3: Clone a Repository

Alright, time to get serious. You’re ready to start working with repositories!

- Find the repository you want to clone on GitHub, click the **“Code”** button, and copy the SSH URL.
- In your terminal, navigate to the directory where you want to store the repository (use `cd` to change directories).
- Clone the repository with:
  ```bash
  git clone git@github.com:username/repository.git
  ```
  Replace `username` with the GitHub username and `repository` with the repo name. Boom—you’ve got the repo on your machine!

### Step 4: Make Your Changes

Now it’s time to get creative! Open the repository folder with your favorite text editor (Nano, Vim, Emacs, VS Code, etc.) and start making your changes.

### Step 5: Stage Your Changes

Oh shit, changes made? Let’s get them staged for commit!

- Go back to your terminal and navigate to your repository directory:
  ```bash
  cd /path/to/your/repository
  ```
- Stage the changes with:
  ```bash
  git add .
  ```
  This stages all the modified files. If you only want to stage specific files, list them individually: `git add file1 file2`.

### Step 6: Commit Your Changes

Now, let’s save those changes!

- Commit the changes with a message describing what you did:
  ```bash
  git commit -m "Added new Jumpstyle tutorial on spins"
  ```
  Keep the message short and sweet—just like your best dance moves.

### Step 7: Push Your Changes

You’re almost there! Time to push your changes to GitHub so everyone can see your awesome contributions.

- Push the changes with:
  ```bash
  git push origin main
  ```
  Replace `main` with your branch name if you’re not working on the main branch.

### Step 8: Create a Pull Request

If you’re contributing to a project, you’ll need to create a pull request.

- Go to your repository on GitHub (you can find it under **“Your repositories”**).
- Click on the **“Pull requests”** tab, then **“New pull request”**.
- Review your changes, add a title and description for your pull request, and click **“Create pull request”**.
- That’s it! Now your changes are ready for review.

## Oh Shit, Need Some Help?

GitHub and Git can be a bit tricky at first, just like landing a new Jumpstyle move. If you get stuck, don’t hesitate to reach out to other Jumpers or check out the [GitHub Documentation](https://docs.github.com/en). The community is always here to help!

## Oh Shit, You’re a GitHub Ninja on Linux!

Congrats! You just contributed to GitHub using Linux. Now you’re ready to keep pushing your moves and tutorials to the Jumpstyle community. Keep learning, keep jumping, and keep contributing. We’re all here to see you shine!

*P.S.: Remember, GitHub is just like learning Jumpstyle. You’ll fumble a bit at first, but with practice, you’ll be spinning and kicking like a pro! Keep at it, jumper!* 🎶🐧
