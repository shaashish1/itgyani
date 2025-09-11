# ITGYANI Deployment Guide

**Complete instructions for deploying ITGYANI React application from GitHub to production server**

---

## 📋 **Overview**

This document provides step-by-step instructions for:
- Pulling code changes from GitHub
- Deploying the React application to production
- Following best practices and rules

---

## 🏗️ **Server Architecture**

### Directory Structure
```
/home/itgyani.com/
├── public_html/          # Production files (LiteSpeed document root)
│   ├── index.html        # React app main file
│   ├── assets/           # CSS, JS, images
│   ├── .htaccess         # SPA routing rules
│   └── favicon.ico       # App favicon
├── itgyani/              # Development/Source folder (Git repository)
│   ├── src/              # React source code
│   ├── dist/             # Build output (temporary)
│   ├── package.json      # Dependencies
│   └── .git/             # Git repository
├── backup/               # Automated backups
├── deploy.sh             # Main deployment script
├── git-deploy.sh         # Git + deploy automation
└── logs/                 # Server logs
```

### How it Works
1. **Development**: Code lives in `/home/itgyani.com/itgyani/` (Git repo)
2. **Build**: `npm run build` creates production files in `/itgyani/dist/`
3. **Deploy**: Production files copied from `/itgyani/dist/` to `/public_html/`
4. **Live**: LiteSpeed serves from `/public_html/` at https://itgyani.com

---

## 🚀 **Deployment Methods**

### Method 1: Automated Git Deployment (Recommended)
```bash
cd /home/itgyani.com
./git-deploy.sh
```

**What this does:**
- Pulls latest changes from GitHub
- Automatically runs build and deployment
- Handles conflicts gracefully
- Creates backups

### Method 2: Manual Git + Deploy
```bash
cd /home/itgyani.com/itgyani
git pull origin main
cd /home/itgyani.com
./deploy.sh
```

### Method 3: Full Manual Process
```bash
# 1. Pull changes
cd /home/itgyani.com/itgyani
git pull origin main

# 2. Install dependencies (if needed)
npm install

# 3. Build the app
npm run build

# 4. Backup current production
timestamp=$(date +"%Y%m%d_%H%M%S")
tar -czf /home/itgyani.com/backup/public_html_backup_$timestamp.tar.gz -C /home/itgyani.com public_html

# 5. Deploy new build
rm -rf /home/itgyani.com/public_html/*
cp -r /home/itgyani.com/itgyani/dist/* /home/itgyani.com/public_html/

# 6. Set permissions
chown -R itgya6323:itgya6323 /home/itgyani.com/public_html
chmod -R 755 /home/itgyani.com/public_html
```

---

## 📝 **Step-by-Step Deployment Instructions**

### Prerequisites Check
```bash
# 1. Verify you're in the correct directory
pwd
# Should show: /home/itgyani.com

# 2. Check Git repository status
cd itgyani && git status
# Should show: "Your branch is up to date with 'origin/main'"

# 3. Verify scripts are executable
ls -la *.sh
# Should show: -rwxr-xr-x for deploy.sh and git-deploy.sh
```

### Standard Deployment Process

#### Step 1: Backup Current State
```bash
cd /home/itgyani.com
timestamp=$(date +"%Y%m%d_%H%M%S")
tar -czf backup/pre_deploy_backup_$timestamp.tar.gz public_html
echo "✅ Backup created: backup/pre_deploy_backup_$timestamp.tar.gz"
```

#### Step 2: Pull Latest Changes
```bash
cd /home/itgyani.com/itgyani
git pull origin main
```

**If conflicts occur:**
```bash
# Check what files have conflicts
git status

# For each conflicted file, either:
# Option A: Keep server version
git checkout --ours <filename>

# Option B: Keep GitHub version  
git checkout --theirs <filename>

# Option C: Manually edit and resolve
nano <filename>

# After resolving all conflicts:
git add .
git commit -m "resolve: merge conflicts resolved"
```

#### Step 3: Deploy Application
```bash
cd /home/itgyani.com
./deploy.sh
```

**Expected output:**
```
🚀 Starting ITGYANI deployment...
📦 Installing dependencies...
🏗️  Building React app...
✅ Build successful!
💾 Creating backup of current public_html...
🧹 Clearing public_html...
📂 Deploying to public_html...
⚙️  Setting up .htaccess for React SPA...
🔒 Setting permissions...
🎉 Deployment complete! Your app is live at https://itgyani.com
📊 Build summary:
   - Built files: X files
   - Total size: XXX
```

#### Step 4: Verify Deployment
```bash
# Check files were deployed correctly
ls -la /home/itgyani.com/public_html/
# Should show: index.html, assets/, .htaccess, favicon.ico, etc.

# Test the application
curl -I https://itgyani.com
# Should return: HTTP/1.1 200 OK
```

---

## ⚡ **Quick Commands Reference**

### Essential Commands
```bash
# Quick automated deployment
cd /home/itgyani.com && ./git-deploy.sh

# Check Git status
cd /home/itgyani.com/itgyani && git status

# Pull latest changes only
cd /home/itgyani.com/itgyani && git pull origin main

# Build and deploy only (no Git pull)
cd /home/itgyani.com && ./deploy.sh

# View recent commits
cd /home/itgyani.com/itgyani && git log --oneline -5

# Check deployment status
ls -la /home/itgyani.com/public_html/ && du -sh /home/itgyani.com/public_html
```

### Troubleshooting Commands
```bash
# Fix Git ownership issues
cd /home/itgyani.com/itgyani && git config --global --add safe.directory /home/itgyani.com/itgyani

# Reset to last known good state
cd /home/itgyani.com/itgyani && git reset --hard origin/main

# Check Node.js/npm status
node --version && npm --version

# View build errors
cd /home/itgyani.com/itgyani && npm run build

# Check disk space
df -h /home/itgyani.com

# View recent backups
ls -lt /home/itgyani.com/backup/ | head -5
```

---

## 🔒 **Rules and Best Practices**

### 🚨 **CRITICAL RULES**

#### Rule 1: Always Backup Before Deployment
```bash
# ALWAYS run this before any deployment
timestamp=$(date +"%Y%m%d_%H%M%S")
tar -czf /home/itgyani.com/backup/pre_deploy_$timestamp.tar.gz /home/itgyani.com/public_html
```

#### Rule 2: Never Edit Files in public_html Directly
- ❌ **NEVER**: Edit files in `/home/itgyani.com/public_html/`
- ✅ **ALWAYS**: Edit in `/home/itgyani.com/itgyani/src/` and deploy

#### Rule 3: Always Test Locally First
- Make changes in local environment
- Test thoroughly
- Commit to GitHub
- Then deploy to server

#### Rule 4: Use Version Control
```bash
# Before making changes
cd /home/itgyani.com/itgyani
git status  # Ensure clean working tree

# After deployment
git log --oneline -1  # Verify latest commit
```

### 📋 **Deployment Checklist**

**Before Deployment:**
- [ ] Check Git status is clean
- [ ] Verify you have latest changes locally
- [ ] Create backup of current production
- [ ] Check disk space availability

**During Deployment:**
- [ ] Pull latest changes from GitHub
- [ ] Resolve any merge conflicts
- [ ] Run build process successfully
- [ ] Deploy to public_html
- [ ] Set correct permissions

**After Deployment:**
- [ ] Verify application loads at https://itgyani.com
- [ ] Test key functionality (navigation, forms, etc.)
- [ ] Check for console errors in browser
- [ ] Verify AdSense ads are displaying
- [ ] Test mobile responsiveness

### 🔧 **Error Handling**

#### Common Issues and Solutions

**Git Permission Errors:**
```bash
cd /home/itgyani.com/itgyani
git config --global --add safe.directory /home/itgyani.com/itgyani
```

**Build Failures:**
```bash
# Clear npm cache and reinstall
cd /home/itgyani.com/itgyani
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Permission Issues:**
```bash
# Fix ownership and permissions
chown -R itgya6323:itgya6323 /home/itgyani.com/itgyani
chown -R itgya6323:itgya6323 /home/itgyani.com/public_html
chmod -R 755 /home/itgyani.com/public_html
```

**Site Not Loading:**
```bash
# Check .htaccess exists and is correct
cat /home/itgyani.com/public_html/.htaccess

# Verify index.html exists
ls -la /home/itgyani.com/public_html/index.html

# Check LiteSpeed logs
tail -50 /home/itgyani.com/logs/itgyani.com.error_log
```

---

## 🎯 **Automated Scripts Explanation**

### `/home/itgyani.com/deploy.sh`
**Purpose**: Build and deploy React app to production
**Usage**: `./deploy.sh`
**What it does**:
1. Installs npm dependencies
2. Builds React app (`npm run build`)
3. Creates backup of current public_html
4. Copies new build to public_html
5. Sets up .htaccess for SPA routing
6. Sets correct permissions

### `/home/itgyani.com/git-deploy.sh`
**Purpose**: Pull from GitHub and deploy automatically
**Usage**: `./git-deploy.sh`
**What it does**:
1. Stashes any local changes
2. Pulls latest from GitHub (`git pull origin main`)
3. Runs deployment script
4. Provides comprehensive status reporting

---

## 🔄 **Rollback Procedures**

### Quick Rollback to Previous Version
```bash
# 1. Find the backup you want to restore
ls -lt /home/itgyani.com/backup/

# 2. Restore from backup (replace TIMESTAMP with actual timestamp)
cd /home/itgyani.com
rm -rf public_html/*
tar -xzf backup/public_html_backup_TIMESTAMP.tar.gz
mv public_html.backup/* public_html/
chown -R itgya6323:itgya6323 public_html
chmod -R 755 public_html

# 3. Verify restoration
curl -I https://itgyani.com
```

### Git-based Rollback
```bash
# 1. Go to specific commit
cd /home/itgyani.com/itgyani
git log --oneline -10  # Find the commit hash
git checkout <commit-hash>

# 2. Deploy that version
cd /home/itgyani.com
./deploy.sh

# 3. Return to main branch
cd /home/itgyani.com/itgyani
git checkout main
```

---

## 📊 **Monitoring and Maintenance**

### Regular Maintenance Tasks

**Weekly:**
```bash
# Clean old backups (keep last 10)
cd /home/itgyani.com/backup
ls -t public_html_backup_*.tar.gz | tail -n +11 | xargs rm -f

# Update dependencies
cd /home/itgyani.com/itgyani
npm audit fix
```

**Monthly:**
```bash
# Check disk space
df -h /home/itgyani.com

# Review server logs
tail -100 /home/itgyani.com/logs/itgyani.com.error_log

# Update npm packages
cd /home/itgyani.com/itgyani
npm outdated
npm update
```

### Performance Monitoring
```bash
# Check build size
cd /home/itgyani.com/itgyani
npm run build
du -sh dist/

# Monitor site speed
curl -w "Time: %{time_total}s\n" -o /dev/null -s https://itgyani.com
```

---

## 🎯 **Quick Start for AI Assistant**

When you need to deploy ITGYANI in the future, use this command sequence:

```bash
# Standard deployment
cd /home/itgyani.com && ./git-deploy.sh

# If issues occur, use manual process:
cd /home/itgyani.com/itgyani && git pull origin main
cd /home/itgyani.com && ./deploy.sh

# Verify deployment
curl -I https://itgyani.com && ls -la /home/itgyani.com/public_html/
```

---

## 📞 **Support Information**

- **Repository**: https://github.com/shaashish1/itgyani
- **Live Site**: https://itgyani.com
- **Server Path**: `/home/itgyani.com/`
- **Production Path**: `/home/itgyani.com/public_html/`
- **Backup Location**: `/home/itgyani.com/backup/`

---

**Last Updated**: September 11, 2025  
**Version**: 1.0  
**Tested On**: LiteSpeed Web Server, CyberPanel
