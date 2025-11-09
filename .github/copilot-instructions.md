## Quick orientation for AI coding agents

This repository hosts a Vite + React frontend (in `itgyani/`) plus a set of deployment and automation scripts at the repo root that publish the built site to `public_html/`.

Key places to look (use these paths in examples):
- Frontend source & commands: `itgyani/` — see `itgyani/package.json` (scripts: `dev`, `build`, `preview`).
- Deploy scripts: `/home/itgyani.com/deploy.sh` and `itgyani/deploy-static-blogs.sh` — these show the exact deploy flow used in production.
- Live site location: `/home/itgyani.com/public_html/` (deploy copies `itgyani/dist/*` here).
- Backups: `/home/itgyani.com/backup/` (deploy script archives `public_html` before overwrite).

What to do first
- To run locally: cd into `itgyani/`, run `npm install` then `npm run dev` to start the Vite dev server.
- To build for production: `cd itgyani && npm run build` which produces `itgyani/dist/`.

Deployment contract (follow exactly)
- Build: run `npm run build` in `itgyani/`.
- Backup current site: scripts expect a tarball under `/home/itgyani.com/backup/` (see `deploy.sh`).
- Deploy: copy `itgyani/dist/*` into `/home/itgyani.com/public_html/` and ensure `.htaccess` for SPA routing is present (deploy.sh creates one).
- Preserve owner/permissions: `deploy.sh` sets owner `itgya6323:itgya6323` and `chmod -R 755` on `public_html`.

Project-specific conventions and gotchas
- Do not edit files inside `public_html/` by hand. Use the repo build+deploy flow to update the live site.
- Static blog flow: blog content is exported by `export-blogs-to-json.sh` then built and deployed with `itgyani/deploy-static-blogs.sh`.
- Many automation scripts live in repo root (eg. `deploy-unified-services.sh`, `backup_*.sh`). When changing deployment logic, update the relevant root script and test locally first.

Stack & libraries (use these when adding code or suggestions)
- Frontend: Vite + React + TypeScript, Tailwind CSS, shadcn-ui/Radix (see `itgyani/package.json` for dependency list).
- Runtime expectations: built assets are static and served from `public_html/` (Apache/nginx with .htaccess rules for SPA routing).

Examples you can use in suggestions
- Local dev run: `cd itgyani && npm i && npm run dev`
- Build + deploy (as the repo scripts do):
  1. `cd itgyani && npm i && npm run build`
  2. Backup `public_html` → `/home/itgyani.com/backup/` (timestamped tar.gz)
  3. `rm -rf /home/itgyani.com/public_html/* && cp -r itgyani/dist/* /home/itgyani.com/public_html/`

Docs & design conventions
- There is a `CLAUDE.md` at repo root with the `superdesign` workflow and `.superdesign/design_iterations/` rules; follow that folder and naming when generating design artifacts.
- Use existing docs: `DEPLOYMENT_GUIDE.md`, `README_DEPLOYMENT.md`, and other root docs for higher-level operational context before changing infra.

Safety and permissions
- Avoid modifying system-wide automation outside the repo unless explicitly requested. Respect the `deploy.sh` owner/permission pattern.
- If proposing changes to deployment, include a rollback plan (e.g., how to restore the tarball from `/home/itgyani.com/backup/`).

When in doubt
- Run the exact commands from `deploy.sh` in a non-production environment, or propose a script change and include testing instructions: (1) build locally, (2) copy to a temp directory, (3) run the backup step, (4) simulate deploy to `/tmp/public_html_test/`.

If you want me to iterate on this file or include more example snippets (CI config, GH Actions, or tests), tell me which area to expand.
