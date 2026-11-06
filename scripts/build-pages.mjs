import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const pagesDir = join(root, 'src', 'pages');
const partialsDir = join(root, 'src', 'partials');

const pages = [
  {
    file: 'index.html',
    page: 'home',
    canonical: '',
    title: 'Kano State Ministry of Youth and Sports Development | Official Website',
    description:
      'The official website of the Kano State Ministry of Youth and Sports Development. Discover youth programmes, sports development, registration and opportunities across Kano State.'
  },
  {
    file: 'about.html',
    page: 'about',
    canonical: 'about',
    title: 'About Us | Kano State Ministry of Youth and Sports Development',
    description:
      'Learn about the mandate, vision, mission and leadership of the Kano State Ministry of Youth and Sports Development.'
  },
  {
    file: 'register.html',
    page: 'register',
    canonical: 'register',
    title: 'Registration | Kano State Ministry of Youth and Sports Development',
    description:
      'Register as an individual, youth group, association or sports club with the Kano State Ministry of Youth and Sports Development. Registration is free.'
  },
  {
    file: 'programs.html',
    page: 'programs',
    canonical: 'programs',
    title: 'Programs &amp; Opportunities | Kano State Ministry of Youth and Sports Development',
    description:
      'Explore youth and sports programmes, competitions, exchanges and opportunities delivered by the Kano State Ministry of Youth and Sports Development.'
  },
  {
    file: 'sports.html',
    page: 'sports',
    canonical: 'sports',
    title: 'Sports Development | Kano State Ministry of Youth and Sports Development',
    description:
      'Kano State sports development: Kano Pillars, registered football clubs, Kano 5-asides and grassroots pathways for athletes and coaches.'
  },
  {
    file: 'news.html',
    page: 'news',
    canonical: 'news',
    title: 'Newsroom | Kano State Ministry of Youth and Sports Development',
    description:
      'Read the latest news, announcements and stories from the Kano State Ministry of Youth and Sports Development.'
  },
  {
    file: 'contact.html',
    page: 'contact',
    canonical: 'contact',
    title: 'Contact Us | Kano State Ministry of Youth and Sports Development',
    description:
      'Contact the Kano State Ministry of Youth and Sports Development. Send a message, call, email or visit our office in Kano.'
  }
];

function readPartial(name) {
  return readFileSync(join(partialsDir, `${name}.html`), 'utf8');
}

function expandIncludes(source) {
  let output = source;
  for (let pass = 0; pass < 4; pass += 1) {
    const next = output.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => readPartial(name));
    if (next === output) break;
    output = next;
  }
  return output;
}

function applyVariables(source, vars) {
  return source.replace(/\{\{\s*([A-Z0-9_]+)\s*\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : ''
  );
}

const availablePages = new Set(readdirSync(pagesDir));

for (const config of pages) {
  if (!availablePages.has(config.file)) {
    console.warn(`Skipping missing page: ${config.file}`);
    continue;
  }

  const source = readFileSync(join(pagesDir, config.file), 'utf8');
  const withIncludes = expandIncludes(source);
  const rendered = applyVariables(withIncludes, {
    PAGE: config.page,
    TITLE: config.title,
    DESCRIPTION: config.description,
    CANONICAL: config.canonical
  });

  writeFileSync(join(root, config.file), `${rendered.trim()}\n`, 'utf8');
  console.log(`Built ${config.file}`);
}

console.log(`\n${pages.length} pages built.`);
