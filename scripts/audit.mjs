#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectRoot = process.cwd();
const root = path.resolve(projectRoot, 'apps/web');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else files.push(absolute);
  }
}
walk(root);
const byHash = new Map();
for (const file of files) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (!byHash.has(hash)) byHash.set(hash, []);
  byHash.get(hash).push(path.relative(root, file));
}
const duplicates = [...byHash.values()].filter((group) => group.length > 1);
const textFiles = files.filter((file) => /\.(html|js|json|css|webmanifest)$/.test(file));
const missingReferences = [];
const referencePattern = /(?:src|href|fichier|couverture|image|audio|url)\s*[=:]\s*["'`]([^"'`]+)["'`]/g;
for (const file of textFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(referencePattern)) {
    const value = match[1].split(/[?#]/)[0];
    if (/^(https?:|data:|#|mailto:|javascript:)/i.test(value) || value.includes('${')) continue;
    if (!value.includes('/') && !/\.(png|jpe?g|gif|svg|webp|pdf|mp3|wav|json|js|css|html)$/i.test(value)) continue;
    // The browser resolves JS/JSON references against the document root, not the module directory.
    const isDataPath = value.startsWith('data/') || value.startsWith('images/');
    const target = isDataPath || /\.(js|json|css|webmanifest)$/.test(file)
      ? path.resolve(root, value)
      : path.resolve(path.dirname(file), value);
    // Some legacy language strings are virtual routes handled by the SPA.
    if (!fs.existsSync(target) && !(/\.html$/.test(value) && !value.includes('/'))) {
      missingReferences.push(`${path.relative(projectRoot, file)} -> ${value}`);
    }
  }
}
const invalidJson = [];
for (const file of files.filter((file) => file.endsWith('.json'))) {
  try { JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { invalidJson.push(`${path.relative(projectRoot, file)}: ${error.message}`); }
}
console.log(JSON.stringify({
  webRoot: path.relative(projectRoot, root),
  files: files.length,
  duplicateGroups: duplicates,
  missingReferences,
  invalidJson,
}, null, 2));
if (missingReferences.length || invalidJson.length) process.exitCode = 1;
