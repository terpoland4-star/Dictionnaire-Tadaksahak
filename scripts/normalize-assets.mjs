#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname, 'apps/web');
const renames = new Map([
  ['data/silesr2017_001.pdf.pdf', 'data/silesr2017_001.pdf'],
  ['data/silewp2002_005.pdf.pdf', 'data/silewp2002_005.pdf'],
  ['data/silewp2003_003.pdf.pdf', 'data/silewp2003_003.pdf'],
  ['data/images/livres/couverture_idaksahak.jpg.jpg', 'data/images/livres/couverture_idaksahak.jpg'],
  ['data/images/livres/zone des idaksahak.jpeg', 'data/images/livres/zone-des-idaksahak.jpeg'],
  ['data/images/livres/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo  C.G..jpeg', 'data/images/livres/jeune-combattant-idaksahak-1994.jpeg'],
]);
for (const [from, to] of renames) {
  const source = path.join(root, from);
  const target = path.join(root, to);
  if (fs.existsSync(source) && !fs.existsSync(target)) fs.renameSync(source, target);
  for (const file of walk(root)) {
    if (!/\.(html|js|json|css|webmanifest)$/.test(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const oldValue = from.replaceAll('\\', '/');
    const newValue = to.replaceAll('\\', '/');
    if (content.includes(oldValue)) fs.writeFileSync(file, content.split(oldValue).join(newValue));
  }
}
// These files existed in two locations; retain the canonical book-gallery copies.
for (const duplicate of [
  'data/images/idaksahak_square.png',
  'data/images/zone des idaksahak.jpeg',
  'data/images/Un jeune combattant Adaksahak, au nord de Ménaka, mars 1994. Photo  C.G..jpeg',
]) {
  const file = path.join(root, duplicate);
  if (fs.existsSync(file)) fs.rmSync(file);
}
// Do not advertise illustrations that are not present in the repository.
const booksFile = path.join(root, 'data/livres.json');
const books = JSON.parse(fs.readFileSync(booksFile, 'utf8'));
for (const book of books) {
  if (!Array.isArray(book.illustrations)) continue;
  book.illustrations = book.illustrations.filter((illustration) => {
    const candidate = path.join(root, illustration.fichier);
    return fs.existsSync(candidate);
  });
}
fs.writeFileSync(booksFile, `${JSON.stringify(books, null, 2)}\n`);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(absolute);
    else yield absolute;
  }
}
