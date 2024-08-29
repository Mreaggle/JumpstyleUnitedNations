markdown
# Oh Shit, Git!?!

Git is hard: screwing up is easy, and figuring out how to fix your mistakes is almost impossible. Git documentation has this chicken-and-egg problem where you can't search for how to get yourself out of a mess unless you already know the name of the thing you need to know about in order to fix your problem.

So here are some bad situations I've gotten myself into and how I eventually got myself out of them in plain English.

## Oh shit, I did something terribly wrong, please tell me git has a magic time machine!?!

```bash
git reflog
```

You will see a list of everything you've done in git, across all branches! Each one has an index `HEAD@{index}`. Find the one before you broke everything.

```bash
git reset HEAD@{index}
```

Magic time machine! You can use this to get back stuff you accidentally deleted, remove stuff you tried that broke the repo, recover after a bad merge, or just go back to a time when things actually worked. I use `reflog` A LOT.

Mega hat tip to the many, many, many, many, many people who suggested adding it!

---

## Oh shit, I committed and immediately realized I need to make one small change!

Make your change.

```bash
git add . # or add individual files
git commit --amend --no-edit
```

Now your last commit contains that change!  
**WARNING:** never amend public commits.

This usually happens to me if I commit, then run tests/linters... and FML, I didn't put a space after an equals sign. You could also make the change as a new commit and then do `rebase -i` in order to squash them both together, but this is about a million times faster.

**Warning:** You should never amend commits that have been pushed up to a public/shared branch! Only amend commits that exist in your local copy or you're gonna have a bad time.

---

## Oh shit, I need to change the message on my last commit!

```bash
git commit --amend
```

Follow prompts to change the commit message.  
Stupid commit message formatting requirements.

---

## Oh shit, I accidentally committed something to master that should have been on a brand new branch!

Create a new branch from the current state of master.

```bash
git branch some-new-branch-name
```

Remove the last commit from the master branch.

```bash
git reset HEAD~ --hard
git checkout some-new-branch-name
```

Your commit lives in this branch now :)

Note: This doesn't work if you've already pushed the commit to a public/shared branch, and if you tried other things first, you might need to `git reset HEAD@{number-of-commits-back}` instead of `HEAD~`. Infinite sadness. Also, many, many, many people suggested an awesome way to make this shorter that I didn't know myself. Thank you all!

---

## Oh shit, I accidentally committed to the wrong branch!

Undo the last commit, but leave the changes available.

```bash
git reset HEAD~ --soft
git stash
```

Move to the correct branch.

```bash
git checkout name-of-the-correct-branch
git stash pop
git add . # or add individual files
git commit -m "your message here"
```

Now your changes are on the correct branch.

A lot of people have suggested using `cherry-pick` for this situation too, so take your pick on whatever one makes the most sense to you!

```bash
git checkout name-of-the-correct-branch
git cherry-pick master
git checkout master
git reset HEAD~ --hard
```

---

## Oh shit, I tried to run a diff but nothing happened?!

If you know that you made changes to files, but `diff` is empty, you probably add-ed your files to staging and you need to use a special flag.

```bash
git diff --staged
```

File under ¯\\_(ツ)_/¯ (yes, I know this is a feature, not a bug, but it's baffling and non-obvious the first time it happens to you!)

---

## Oh shit, I need to undo a commit from like 5 commits ago!

Find the commit you need to undo.

```bash
git log
```

Use the arrow keys to scroll up and down in history.  
Once you've found your commit, save the hash.

```bash
git revert [saved hash]
```

Git will create a new commit that undoes that commit.  
Follow prompts to edit the commit message or just save and commit.

Turns out you don't have to track down and copy-paste the old file contents into the existing file in order to undo changes! If you committed a bug, you can undo the commit all in one go with `revert`.

You can also revert a single file instead of a full commit! But of course, in true git fashion, it's a completely different set of commands...

---

## Oh shit, I need to undo my changes to a file!

Find a hash for a commit before the file was changed.

```bash
git log
```

Use the arrow keys to scroll up and down in history.  
Once you've found your commit, save the hash.

```bash
git checkout [saved hash] -- path/to/file
```

The old version of the file will be in your index.

```bash
git commit -m "Wow, you don't have to copy-paste to undo"
```

When I finally figured this out, it was HUGE. HUGE. H-U-G-E. But seriously though, on what planet does `checkout --` make sense as the best way to undo a file? :shakes-fist-at-linus-torvalds:

---

## Fuck this noise, I give up.

```bash
cd ..
sudo rm -r fucking-git-repo-dir
git clone https://some.github.url/fucking-git-repo-dir.git
cd fucking-git-repo-dir
```

Thanks to Eric V. for this one. All complaints about the use of `sudo` in this joke can be directed to him.

For real though, if your branch is sooo borked that you need to reset the state of your repo to be the same as the remote repo in a "git-approved" way, try this, but beware these are destructive and unrecoverable actions!

```bash
git fetch origin
git checkout master
git reset --hard origin/master
git clean -d --force
```

Repeat `checkout/reset/clean` for each borked branch.

---

*Disclaimer: This guide is not intended to be an exhaustive reference. And yes, there are other ways to do these same things with more theoretical purity or whatever, but I've come to these steps through trial and error and lots of swearing and table flipping, and I had this crazy idea to share them with a healthy dose of levity and profanity. Take it or leave it as you will!*

Many thanks to everyone who has volunteered to translate the site into new languages, you rock!

Michael Botha (af) · Khaja Md Sher E Alam (bn) · Eduard Tomek (cs) · Moritz Stückler (de) · Franco Fantini (es) · Hamid Moheb (fa) · Senja Jarva (fi) · Michel (fr) · Alex Tzimas (gr) · Elad Leev (he) · Aryan Sarkar (hi) · Ricky Gultom (id) · fedemcmac (it) · Meiko Hori (ja) · Zhunisali Shanabek (kk) · Gyeongjae Choi (ko) · Rahul Dahal (ne) · Martijn ten Heuvel (nl) · Łukasz Wójcik (pl) · Davi Alexandre (ptBR) · Catalina Focsa (ro) · Daniil Golubev (ru) · Nemanja Vasić (sr) · Björn Söderqvist (sv) · Kitt Tientanopajai (th) · Taha Paksu (tr) · Andriy Sultanov (ua) · Tao Jiayuan (zh) .

With additional help from Allie Jones · Artem Vorotnikov · David Fyffe · Frank Taillandier · Iain Murray · Lucas Larson · Myrzabek Azil

If you'd like to help add a translation into your language, submit a PR on GitHub.

[Original Source: OhShitGit](https://ohshitgit.com/)
