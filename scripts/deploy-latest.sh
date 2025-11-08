#!/usr/bin/env bash

set -euo pipefail

REPO_DIR="/home/itgyani.com/itgyani"
WEB_ROOT="/home/itgyani.com/public_html"
HTACCESS_SOURCE="${REPO_DIR}/.htaccess"

echo "==> Checking repository state"
cd "${REPO_DIR}"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: Repository has uncommitted changes. Please commit or stash before deploying." >&2
  exit 1
fi

echo "==> Fetching latest from origin/main"
git fetch origin main
git reset --hard origin/main

echo "==> Installing dependencies"
npm ci

echo "==> Building production bundle"
npm run build

echo "==> Syncing dist/ to ${WEB_ROOT}"
rsync -av --delete "${REPO_DIR}/dist/" "${WEB_ROOT}/"

if [[ -f "${HTACCESS_SOURCE}" ]]; then
  echo "==> Restoring .htaccess"
  cp "${HTACCESS_SOURCE}" "${WEB_ROOT}/.htaccess"
fi

echo "✅ Deployment complete"