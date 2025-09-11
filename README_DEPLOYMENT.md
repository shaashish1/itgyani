# 📋 ITGYANI Documentation Summary

## **Created Documentation Files**

### 1. `/home/itgyani.com/DEPLOYMENT_GUIDE.md`
**Complete comprehensive guide** with:
- Full architecture explanation
- Step-by-step deployment instructions
- Troubleshooting procedures
- Best practices and rules
- Rollback procedures
- Monitoring guidelines

### 2. `/home/itgyani.com/QUICK_REFERENCE.md`
**Fast reference card** with:
- One-command deployment
- Emergency commands
- Quick verification checklist
- Golden rules summary

### 3. `/home/itgyani.com/pre-deploy-check.sh`
**Automated pre-deployment checker** that verifies:
- Git repository status
- Disk space availability
- Script permissions
- Node.js environment
- Current production status
- Backup availability

---

## **🎯 For AI Assistant: Quick Start Commands**

When you need to deploy ITGYANI, run these commands in order:

### Standard Deployment Process:
```bash
# 1. Run pre-deployment check
cd /home/itgyani.com && ./pre-deploy-check.sh

# 2. If all checks pass, deploy automatically
./git-deploy.sh

# 3. Verify deployment
curl -I https://itgyani.com
```

### Manual Deployment (if automated fails):
```bash
cd /home/itgyani.com/itgyani && git pull origin main
cd /home/itgyani.com && ./deploy.sh
```

### Emergency Rollback:
```bash
# List available backups
ls -lt /home/itgyani.com/backup/

# Restore from backup (replace TIMESTAMP)
cd /home/itgyani.com
tar -xzf backup/public_html_backup_TIMESTAMP.tar.gz
chown -R itgya6323:itgya6323 public_html
chmod -R 755 public_html
```

---

## **📜 Key Rules to Remember**

1. **ALWAYS** run `./pre-deploy-check.sh` first
2. **NEVER** edit files in `/public_html/` directly
3. **ALWAYS** use `./git-deploy.sh` for standard deployments
4. **ALWAYS** verify deployment with `curl -I https://itgyani.com`
5. **BACKUP** before any major changes

---

## **🔧 Available Scripts**

- `./deploy.sh` - Build and deploy React app
- `./git-deploy.sh` - Pull from GitHub + deploy
- `./pre-deploy-check.sh` - Verify system before deployment

---

## **📞 Key Information**

- **Repository**: https://github.com/shaashish1/itgyani
- **Live Site**: https://itgyani.com
- **Server Path**: `/home/itgyani.com/`
- **Production**: `/home/itgyani.com/public_html/`
- **Source Code**: `/home/itgyani.com/itgyani/`

---

**Documentation Created**: September 11, 2025  
**Ready for Production Use** ✅
