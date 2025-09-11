# ITGYANI Quick Deployment Reference

## 🚀 **One-Command Deployment**
```bash
cd /home/itgyani.com && ./git-deploy.sh
```

## 🔧 **Manual Deployment Steps**
```bash
# 1. Pull latest code
cd /home/itgyani.com/itgyani && git pull origin main

# 2. Deploy to production
cd /home/itgyani.com && ./deploy.sh

# 3. Verify deployment
curl -I https://itgyani.com
```

## 🆘 **Emergency Commands**
```bash
# Fix Git permissions
cd /home/itgyani.com/itgyani && git config --global --add safe.directory /home/itgyani.com/itgyani

# Reset to last good state
cd /home/itgyani.com/itgyani && git reset --hard origin/main

# Quick backup
tar -czf /home/itgyani.com/backup/emergency_backup_$(date +%Y%m%d_%H%M%S).tar.gz /home/itgyani.com/public_html

# Rollback from backup (replace TIMESTAMP)
cd /home/itgyani.com && rm -rf public_html/* && tar -xzf backup/public_html_backup_TIMESTAMP.tar.gz
```

## 📋 **Verification Checklist**
- [ ] `git status` shows clean working tree
- [ ] `curl -I https://itgyani.com` returns 200 OK
- [ ] `ls /home/itgyani.com/public_html/` shows React app files
- [ ] Website loads properly in browser

## 🔒 **Golden Rules**
1. **ALWAYS backup before deployment**
2. **NEVER edit files in public_html directly**
3. **ALWAYS test after deployment**
4. **Use git-deploy.sh for standard deployments**
