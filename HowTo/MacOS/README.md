# Oh Shit, GitHub Desktop on macOS!? 🤯

## 🍎[MacOS APP](https://central.github.com/deployments/desktop/desktop/latest/darwin)

Git can be super confusing, especially when you're trying to fix your mistakes on GitHub Desktop. The official documentation can be like trying to find a needle in a haystack, especially when you don't even know what you're looking for! So here's a list of situations I've found myself in and how I managed to get out of them, explained in the simplest way possible.

## Oh shit, I did something terribly wrong. Does GitHub Desktop have a magic undo button? 🤞

### How to fix it:

1. Open **GitHub Desktop** and go to the **Repository** menu.
2. Select **View Stash** to see the list of all your changes.
3. Choose the stash that represents the point before you messed up.
4. Click **Restore** to roll back your repo to that state.

**Pro Tip:** Regularly create stashes, especially before doing risky operations. It's like creating your own checkpoints in a game. 🛑

---

## Oh shit, I committed and immediately realized I need to make one small change! 😬

### How to fix it:

1. Make your small change in the code.
2. In **GitHub Desktop**, add the file to the staging area.
3. Select **Commit** -> **Amend Last Commit** from the menu.
4. Confirm that the changes should be included in the last commit. Done!

**Note:** Do not amend commits that have already been pushed to a shared branch.

---

## Oh shit, I need to change the message on my last commit! 💬

### How to fix it:

1. Go to the **Repository** menu.
2. Click on **Amend Last Commit**.
3. Edit the commit message in the **Commit Summary** and **Description** fields.
4. Click **Commit** to save the new commit message.

No need for fancy terminal commands; GitHub Desktop makes it straightforward!

---

## Oh shit, I accidentally committed something to `main` that should have been on a new branch! 🚫

### How to fix it:

1. In **GitHub Desktop**, go to the **Branch** menu and select **New Branch**.
2. Name your new branch and create it.
3. Go back to the **Repository** menu and select **Undo Last Commit**. This removes the commit from `main`.
4. Switch to the new branch you created. Your changes are there!

**Important:** This works best if you haven't pushed your commit yet. If you have, things get a bit more complex.

---

## Oh shit, I accidentally committed to the wrong branch! 🤦‍♂️

### How to fix it:

1. Go to the **Branch** menu and click **New Branch** to create a new branch from the incorrect branch.
2. Switch back to the incorrect branch.
3. Go to the **Repository** menu and select **Undo Last Commit**.
4. Switch to the correct branch you meant to commit to and use **Merge Branch** from the **Branch** menu to bring in the changes from the temporary branch you created.

Or, if you'd prefer:

1. Use the **Cherry-Pick** feature to move the commit directly to the right branch.
2. Go back to the incorrect branch and undo the commit.

---

## Oh shit, I need to undo a commit from a while ago! ⏪

### How to fix it:

1. Go to the **History** tab in **GitHub Desktop**.
2. Right-click on the commit you want to revert.
3. Choose **Revert This Commit**. This will create a new commit that undoes the changes made by the old commit.

You don't have to find and manually copy-paste old code—GitHub Desktop does it all for you!

---

## Oh shit, I need to undo my changes to a file! ❌

### How to fix it:

1. Right-click the file in the **Changes** tab.
2. Select **Discard Changes** from the menu.

GitHub Desktop will revert the file to its previous state. 🎉

---

## Fuck this noise, I give up. 😩

### How to fix it:

1. Navigate to the folder containing your repository in Finder.
2. Delete the entire folder (you might need to use `sudo` if you're hardcore, but Finder should suffice).
3. Clone the repository again from GitHub using **File** -> **Clone Repository** in **GitHub Desktop**.

If you need a reset button for your entire repo, this is it. Just remember, this deletes all local changes! 

---

*Disclaimer: This guide isn't exhaustive, but it's full of the stuff I've learned the hard way (and sometimes the easy way, thanks to GitHub Desktop). If you're feeling stuck, try these steps, and remember: you're not alone in your frustration!*
